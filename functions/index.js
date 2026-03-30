require("dotenv").config();

const functions = require("firebase-functions");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const { analyzeFile } = require("./gemini");
const { extractText } = require("./fileParser");

const app = express();

app.use(cors());

// 🚀 Using rawBody (Firebase-safe)
app.post("/analyze", async (req, res) => {
    const startTime = Date.now();

    try {
        if (!req.rawBody) {
            return res.status(400).send("No file received");
        }

        const fileBuffer = req.rawBody;

        // ✅ FILE SIZE LIMIT (5MB)
        if (fileBuffer.length > 5 * 1024 * 1024) {
            return res.status(400).send("File too large (max 5MB)");
        }

        let mimetype = req.headers["content-type"];

        if (!mimetype || mimetype === "application/octet-stream") {
            mimetype = "application/pdf";
        }

        if (
            mimetype !== "application/pdf" &&
            !mimetype.startsWith("image/")
        ) {
            return res.status(400).send("Invalid file type");
        }

        const file = {
            buffer: fileBuffer,
            mimetype,
        };

        // 📄 Extract text
        const text = await extractText(file);

        if (!text || text.length < 20) {
            return res.status(400).send("Invalid or empty document");
        }

        // 🤖 Gemini (optimized now)
        const summary = await analyzeFile(text);

        const endTime = Date.now();

        res.json({
            summary,
            responseTime: `${endTime - startTime} ms`,
        });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Error processing file");
    }
});

exports.api = functions.https.onRequest(app);