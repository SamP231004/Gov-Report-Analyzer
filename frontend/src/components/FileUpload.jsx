import React from "react";
import axios from "axios";

export default function FileUpload({ setSummary, setLoading }) {

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (
            file.type !== "application/pdf" &&
            !file.type.startsWith("image/")
        ) {
            alert("Only PDF or Image allowed");
            return;
        }

        try {
            setLoading(true);

            // ⚠️ IMPORTANT: send as binary (not formData)
            const res = await axios.post(
                import.meta.env.VITE_API_URL,
                file,
                {
                    headers: {
                        "Content-Type": file.type || "application/pdf"
                    }
                }
            );

            setSummary(res.data.summary);

        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Error processing file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}