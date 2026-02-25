import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPenFancy, FaClock, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const ToeflWritingInstructions = () => {
    const navigate = useNavigate();

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
                        <FaPenFancy />
                    </div>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
                        Writing Section
                    </h1>
                    <p style={{ color: "#b4bebd", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                        In the Writing section, you will write responses to demonstrate your ability to write in English in an academic setting.
                    </p>
                </div>

                {/* Info Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                    <div style={{ background: "#111c17", padding: "1.5rem", borderRadius: "16px", border: "1px solid #233127" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "#19fd91" }}>
                            <FaClock size={24} />
                            <h3 style={{ margin: 0, color: "#fff" }}>Time Limit</h3>
                        </div>
                        <p style={{ color: "#b4bebd", margin: 0 }}>You should aim to complete this section within <strong>30 minutes</strong>.</p>
                    </div>

                    <div style={{ background: "#111c17", padding: "1.5rem", borderRadius: "16px", border: "1px solid #233127" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "#19fd91" }}>
                            <FaCheckCircle size={24} />
                            <h3 style={{ margin: 0, color: "#fff" }}>Format</h3>
                        </div>
                        <p style={{ color: "#b4bebd", margin: 0 }}>2 writing tasks: Integrated and Academic Discussion.</p>
                    </div>
                </div>

                {/* Task Table */}
                <div style={{ background: "#111c17", borderRadius: "20px", border: "1px solid #233127", overflow: "hidden", marginBottom: "3rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", color: "#b4bebd" }}>
                        <thead>
                            <tr style={{ background: "rgba(25, 253, 145, 0.1)" }}>
                                <th style={{ padding: "1.2rem", textAlign: "left", color: "#19fd91", borderBottom: "1px solid #233127" }}>Type of Task</th>
                                <th style={{ padding: "1.2rem", textAlign: "left", color: "#19fd91", borderBottom: "1px solid #233127" }}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: "1.2rem", borderBottom: "1px solid #233127", fontWeight: "600", color: "#fff" }}>Writing for an Academic Discussion</td>
                                <td style={{ padding: "1.2rem", borderBottom: "1px solid #233127" }}>State and support an opinion in an online classroom discussion.</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "1.2rem", borderBottom: "1px solid #233127", fontWeight: "600", color: "#fff" }}>Integrated Writing Task</td>
                                <td style={{ padding: "1.2rem", borderBottom: "1px solid #233127" }}>Read a passage, listen to a lecture, and write a response based on what you read and heard.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Start Button */}
                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/quiz/toefl/writing")}
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
                        Start Writing Check <FaArrowRight />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ToeflWritingInstructions;
