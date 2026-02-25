import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IqResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    const getInterpretation = (score) => {
        if (score >= 90) return "Very Superior";
        if (score >= 80) return "Superior";
        if (score >= 70) return "High Average";
        if (score >= 60) return "Average";
        if (score >= 40) return "Low Average";
        return "Below Average";
    };

    useEffect(() => {
        if (location.state) {
            setResult(location.state);
        } else {
            // Redirect if no state (e.g., direct access)
            navigate("/tests");
        }
    }, [location, navigate]);

    // Theme colors matching BigFivePage/App.css
    const theme = {
        bgMain: "var(--bg-main, #0a140f)",
        bgCard: "var(--bg-card, #111c17)",
        accent: "var(--accent, #19fd91)",
        textMain: "var(--text-main, #ffffff)",
        textMuted: "var(--text-muted, #b4bebd)",
        border: "var(--border, #233127)",
    };

    if (!result) return null;

    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: theme.bgMain,
            padding: "3.5rem 1rem",
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{
                background: theme.bgCard,
                padding: "3rem 2.5rem",
                width: "95%",
                maxWidth: "600px",
                borderRadius: "20px",
                boxShadow: "0 6px 40px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                border: `1px solid ${theme.border}`
            }}>

                <h1 style={{
                    color: theme.textMain,
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    margin: 0
                }}>
                    IQ Test
                </h1>

                <div style={{
                    color: theme.textMuted,
                    fontSize: "1rem",
                    marginBottom: "1rem"
                }}>
                    {formattedDate}
                </div>

                <div style={{
                    width: "100%",
                    height: "1px",
                    background: theme.border,
                    marginBottom: "1rem"
                }}></div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <span style={{
                        color: theme.textMuted,
                        fontSize: "1.2rem",
                        fontWeight: "500"
                    }}>
                        IQ Score
                    </span>
                    <span style={{
                        color: theme.textMain, // White score to match screenshot style usually, or accent?
                        fontSize: "4rem",
                        fontWeight: "800",
                        lineHeight: "1"
                    }}>
                        {result.score}
                    </span>
                    <span style={{
                        color: theme.accent,
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginTop: "0.5rem"
                    }}>
                        {getInterpretation(result.score)}
                    </span>
                </div>

                <div style={{
                    marginTop: "2rem",
                    fontSize: "0.95rem",
                    color: theme.accent,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    ✅ Result saved to your profile!
                </div>

                <button
                    onClick={() => navigate("/profile")}
                    style={{
                        backgroundColor: "transparent",
                        color: theme.textMuted,
                        border: `1px solid ${theme.textMuted}`,
                        padding: "0.8rem 2.5rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "12px",
                        cursor: "pointer",
                        marginTop: "1.5rem",
                        transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.borderColor = theme.accent;
                        e.target.style.color = theme.accent;
                    }}
                    onMouseOut={(e) => {
                        e.target.style.borderColor = theme.textMuted;
                        e.target.style.color = theme.textMuted;
                    }}
                >
                    Go To Profile
                </button>

            </div>
        </div>
    );
}

export default IqResultPage;
