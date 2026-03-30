import React from "react";
import axios from "axios";

export default function FileUpload({
    setSummary,
    setLoading,
    setError,
    setResponseTime
}) {

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ❌ Reset states
        setError("");
        setSummary("");
        setResponseTime("");

        // ✅ File type validation
        if (
            file.type !== "application/pdf" &&
            !file.type.startsWith("image/")
        ) {
            setError("Only PDF or Image files are allowed");
            return;
        }

        // ✅ File size validation (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File must be under 5MB");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                import.meta.env.VITE_API_URL,
                file,
                {
                    headers: {
                        "Content-Type": file.type || "application/pdf",
                    },
                }
            );

            // ✅ Set summary
            setSummary(res.data.summary);

            // ⚡ Capture response time (from backend)
            if (res.data.responseTime) {
                setResponseTime(res.data.responseTime);
            }

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Error processing file. Please try again."
            );

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