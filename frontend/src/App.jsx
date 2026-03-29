import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryCard from "./components/SummaryCard";
import Loader from "./components/Loader";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function App() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="container">

            {/* 🔥 Header */}
            <div className="header">
                <h1 className="title">
                    Gov Report <span className="highlight">Analyzer</span>
                </h1>
                <p className="subtitle">
                    AI-powered document summarization using Gemini
                </p>
            </div>

            {/* 📦 Upload */}
            <div className="section">
                <FileUpload setSummary={setSummary} setLoading={setLoading} />
            </div>

            {/* ⏳ Loader */}
            {loading && (
                <div className="section">
                    <Loader />
                </div>
            )}

            {/* 📄 Summary */}
            {summary && (
                <div className="section">
                    <SummaryCard summary={summary} />
                </div>
            )}

            {/* 🔗 Footer */}
            <div className="footer">
                <a href="https://samp231004.github.io/Portfolio/" target="_blank">
                    <FaGlobe />
                </a>
                <a href="https://github.com/SamP231004" target="_blank">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/samp231004/" target="_blank">
                    <FaLinkedin />
                </a>
            </div>

        </div>
    );
}