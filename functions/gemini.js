const axios = require("axios");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

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

    // ✅ PARALLEL CALLS HERE
    const summaries = await Promise.all(
        chunks.map(async (chunk) => {
            const prompt = `
            Summarize the following text in 1 concise sentence.

            Respond ONLY in JSON:
            {
            "summary": "..."
            }

            Text:
            ${chunk}
        `;

            const response = await callGemini(prompt);

            try {
                return JSON.parse(response).summary;
            } catch {
                return response;
            }
        })
    );

    // 🔥 Final merge
    const finalPrompt = `
        Combine the following summaries into exactly 2 sentences.

        Respond ONLY in JSON:
        {
        "summary": "..."
        }

        Summaries:
        ${summaries.join("\n")}
    `;

    const finalResponse = await callGemini(finalPrompt);

    try {
        return JSON.parse(finalResponse).summary;
    } catch {
        return finalResponse;
    }
};