const pdfParse = require("pdf-parse");

exports.extractText = async (file) => {
    try {
        if (file.mimetype === "application/pdf") {
            const data = await pdfParse(file.buffer);

            const text = data.text?.trim();

            console.log("PDF text sample:", text?.slice(0, 100));

            return text || "";
        }

        // TODO: add OCR later if needed
        return "";

    } catch (err) {
        console.error("TEXT EXTRACTION ERROR:", err);
        return "";
    }
};