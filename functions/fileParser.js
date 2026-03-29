const pdfParse = require("pdf-parse");

exports.extractText = async (file) => {
    try {
        if (file.mimetype === "application/pdf") {
            const data = await pdfParse(file.buffer);

            console.log("PDF text sample:", data.text?.slice(0, 100));

            return data.text;
        }

        // 🖼️ fallback for images
        return "";

    } catch (err) {
        console.error("TEXT EXTRACTION ERROR:", err);
        return "";
    }
};