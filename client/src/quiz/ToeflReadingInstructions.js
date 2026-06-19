import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaClock, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const ToeflReadingInstructions = () => {
    const navigate = useNavigate();
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0a140f",
                color: "#ffffff",
                padding: "100px 20px 40px",
                fontFamily: "'Inter', sans-serif",
            }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            background: "rgba(25, 253, 145, 0.1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1.5rem",
                            border: "1px solid rgba(25, 253, 145, 0.2)",
                            color: "#19fd91",
                            fontSize: "2.5rem",
                        }}
                    >
                        <FaBookOpen />
                    </div>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
                        Reading Section 
                    </h1>
                    <p style={{ color: "#b4bebd", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                        In this section, you will read academic passages and answer multiple‑choice questions.
                    </p>
                </div>

                {/* Info Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                    <div style={{ background: "#111c17", padding: "1.5rem", borderRadius: "16px", border: "1px solid #233127" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "#19fd91" }}>
                            <FaClock size={24} />
                            <h3 style={{ margin: 0, color: "#fff" }}>Time Limit</h3>
                        </div>
                        <p style={{ color: "#b4bebd", margin: 0 }}>
                            You have <strong>40 minutes</strong> to complete all <strong>25 questions</strong>.
                        </p>
                    </div>

                    <div style={{ background: "#111c17", padding: "1.5rem", borderRadius: "16px", border: "1px solid #233127" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "#19fd91" }}>
                            <FaCheckCircle size={24} />
                            <h3 style={{ margin: 0, color: "#fff" }}>Format</h3>
                        </div>
                        <p style={{ color: "#b4bebd", margin: 0 }}>
                            <strong>5 academic passages</strong> · <strong>5 questions each</strong> · all multiple choice.
                        </p>
                    </div>
                </div>

                {/* What to Expect */}
                <div style={{ background: "#111c17", borderRadius: "20px", border: "1px solid #233127", padding: "2rem", marginBottom: "3rem" }}>
                    <h3 style={{ color: "#19fd91", marginBottom: "1.5rem" }}>About the PBT Reading Section</h3>
                    <ul style={{ color: "#b4bebd", lineHeight: "1.8", paddingLeft: "1.2rem", margin: 0 }}>
                        <li>All passages are academic in nature – topics may include science, history, social studies, and the arts.</li>
                        <li>Each passage is followed by five multiple‑choice questions. You may answer them in any order within that passage.</li>
                        <li>All information needed to answer the questions is contained in the passage – no outside knowledge is required.</li>
                        <li>There is no penalty for guessing, so it is to your advantage to answer every question.</li>
                        <li>You can move between passages using the Previous and Next buttons before finishing the test.</li>
                    </ul>
                </div>

                {/* Start Button */}
                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/quiz/toefl/reading")}
                        style={{
                            background: "#19fd91",
                            color: "#000",
                            border: "none",
                            padding: "1rem 3rem",
                            fontSize: "1.2rem",
                            fontWeight: "700",
                            borderRadius: "50px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "transform 0.2s",
                            boxShadow: "0 4px 15px rgba(25, 253, 145, 0.3)"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Start Reading Test <FaArrowRight />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ToeflReadingInstructions;
