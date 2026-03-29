const axios = require("axios");

exports.analyzeFile = async (text) => {
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: `Summarize this in exactly 2 concise sentences:\n${text}`,
                        },
                    ],
                },
            ],
        }
    );

    return (
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No summary generated"
    );
};