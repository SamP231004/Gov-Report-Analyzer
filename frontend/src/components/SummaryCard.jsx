import React from "react";

export default function SummaryCard({ summary }) {
    return (
        <div className="card summary">
            <h3>Summary</h3>
            <p>{summary}</p>
        </div>
    );
}