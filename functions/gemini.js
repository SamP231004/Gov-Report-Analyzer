const axios = require("axios");

const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ✅ Gemini call
const callGemini = async (prompt) => {
    const res = await axios.post(
        `${API_URL}?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

// ✅ CLEAN JSON (handles ```json issue)
const cleanJSON = (text) => {
    try {
        if (!text) return null;

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (err) {
        console.error("JSON PARSE ERROR:", err);
        return null;
    }
};

// ✅ CHUNKING FUNCTION
const chunkText = (text, size = 3000) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
};

exports.analyzeFile = async (text) => {
    const chunks = chunkText(text);

    // ✅ PARALLEL CALLS
    const summaries = await Promise.all(
        chunks.map(async (chunk) => {
            const prompt = `
                Summarize the following text in 1 concise sentence.

                Return ONLY valid JSON.
                DO NOT use markdown.
                DO NOT wrap in backticks.

                Format:
                {"summary": "..."}

                Text:
                ${chunk}
            `;

            const response = await callGemini(prompt);

            const parsed = cleanJSON(response);

            return parsed?.summary || response;
        })
    );

    // 🔥 FINAL MERGE
    const finalPrompt = `
        Combine the following summaries into exactly 2 sentences.

        Return ONLY valid JSON.
        DO NOT use markdown.
        DO NOT wrap in backticks.

        Format:
        {"summary": "..."}

        Summaries:
        ${summaries.join("\n")}
    `;

    const finalResponse = await callGemini(finalPrompt);

    const parsedFinal = cleanJSON(finalResponse);

    return parsedFinal?.summary || finalResponse;
};