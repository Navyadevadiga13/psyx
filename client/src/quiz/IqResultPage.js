// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function IqResultPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [result, setResult] = useState(null);

//     const getInterpretation = (score) => {
//         if (score >= 90) return "Very Superior";
//         if (score >= 80) return "Superior";
//         if (score >= 70) return "High Average";
//         if (score >= 60) return "Average";
//         if (score >= 40) return "Low Average";
//         return "Below Average";
//     };

//     useEffect(() => {
//         if (location.state) {
//             setResult(location.state);
//         } else {
//             // Redirect if no state (e.g., direct access)
//             navigate("/tests");
//         }
//     }, [location, navigate]);

//     // Theme colors matching BigFivePage/App.css
//     const theme = {
//         bgMain: "var(--bg-main, #0a140f)",
//         bgCard: "var(--bg-card, #111c17)",
//         accent: "var(--accent, #19fd91)",
//         textMain: "var(--text-main, #ffffff)",
//         textMuted: "var(--text-muted, #b4bebd)",
//         border: "var(--border, #233127)",
//     };

//     if (!result) return null;

//     const formattedDate = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });

//     return (
//         <div style={{
//             minHeight: "80vh",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             background: theme.bgMain,
//             padding: "3.5rem 1rem",
//             fontFamily: "'Inter', sans-serif",
//         }}>
//             <div style={{
//                 background: theme.bgCard,
//                 padding: "3rem 2.5rem",
//                 width: "95%",
//                 maxWidth: "600px",
//                 borderRadius: "20px",
//                 boxShadow: "0 6px 40px rgba(0,0,0,0.12)",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: "1.5rem",
//                 border: `1px solid ${theme.border}`
//             }}>

//                 <h1 style={{
//                     color: theme.textMain,
//                     fontSize: "1.8rem",
//                     fontWeight: "700",
//                     margin: 0
//                 }}>
//                     IQ Test
//                 </h1>

//                 <div style={{
//                     color: theme.textMuted,
//                     fontSize: "1rem",
//                     marginBottom: "1rem"
//                 }}>
//                     {formattedDate}
//                 </div>

//                 <div style={{
//                     width: "100%",
//                     height: "1px",
//                     background: theme.border,
//                     marginBottom: "1rem"
//                 }}></div>

//                 <div style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "0.5rem"
//                 }}>
//                     <span style={{
//                         color: theme.textMuted,
//                         fontSize: "1.2rem",
//                         fontWeight: "500"
//                     }}>
//                         IQ Score
//                     </span>
//                     <span style={{
//                         color: theme.textMain, // White score to match screenshot style usually, or accent?
//                         fontSize: "4rem",
//                         fontWeight: "800",
//                         lineHeight: "1"
//                     }}>
//                         {result.score}
//                     </span>
//                     <span style={{
//                         color: theme.accent,
//                         fontSize: "1.5rem",
//                         fontWeight: "600",
//                         marginTop: "0.5rem"
//                     }}>
//                         {getInterpretation(result.score)}
//                     </span>
//                 </div>

//                 <div style={{
//                     marginTop: "2rem",
//                     fontSize: "0.95rem",
//                     color: theme.accent,
//                     textAlign: "center",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem"
//                 }}>
//                     ✅ Result saved to your profile!
//                 </div>

//                 <button
//                     onClick={() => navigate("/profile")}
//                     style={{
//                         backgroundColor: "transparent",
//                         color: theme.textMuted,
//                         border: `1px solid ${theme.textMuted}`,
//                         padding: "0.8rem 2.5rem",
//                         fontSize: "1rem",
//                         fontWeight: "600",
//                         borderRadius: "12px",
//                         cursor: "pointer",
//                         marginTop: "1.5rem",
//                         transition: "all 0.2s ease"
//                     }}
//                     onMouseOver={(e) => {
//                         e.target.style.borderColor = theme.accent;
//                         e.target.style.color = theme.accent;
//                     }}
//                     onMouseOut={(e) => {
//                         e.target.style.borderColor = theme.textMuted;
//                         e.target.style.color = theme.textMuted;
//                     }}
//                 >
//                     Go To Profile
//                 </button>

//             </div>
//         </div>
//     );
// }

// export default IqResultPage;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IqResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    // Fixed parameters for a 50‑question test
    const TOTAL_QUESTIONS = 50;
    const MEAN_RAW = 30;      // average raw score
    const RAW_SD = 5;         // raw score standard deviation
    const IQ_MEAN = 100;
    const IQ_SD = 15;

    // Calculate IQ from raw score, cap at 200 (though formula won't exceed 200 for raw 50)
    const calculateIQ = (rawScore) => {
        const safeRaw = Math.min(Math.max(rawScore, 0), TOTAL_QUESTIONS);
        let iq = Math.round(((safeRaw - MEAN_RAW) / RAW_SD) * IQ_SD + IQ_MEAN);
        return Math.min(iq, 200); // absolute max
    };

    // Classification based on your provided ranges
    const getClassification = (iq) => {
        if (iq >= 180) return "Profoundly gifted";
        if (iq >= 160) return "Exceptionally gifted";
        if (iq >= 145) return "Highly gifted";
        if (iq >= 130) return "Moderately gifted";
        if (iq >= 115) return "Above average or bright";
        if (iq >= 85) return "Average intelligence";
        if (iq >= 70) return "Borderline mental disability";
        if (iq >= 55) return "Mild mental disability";
        if (iq >= 40) return "Moderate mental disability";
        if (iq >= 25) return "Severe mental disability";
        return "Profound mental disability";
    };

    const getClassificationColor = (classification) => {
        if (classification.includes("gifted")) return "#19fd91";
        if (classification.includes("Average")) return "#ffffff";
        if (classification.includes("Above average")) return "#a0e0a0";
        if (classification.includes("disability")) return "#ff9999";
        return "#b4bebd";
    };

    useEffect(() => {
        if (location.state) {
            setResult(location.state);
        } else {
            navigate("/tests");
        }
    }, [location, navigate]);

    const theme = {
        bgMain: "var(--bg-main, #0a140f)",
        bgCard: "var(--bg-card, #111c17)",
        accent: "var(--accent, #19fd91)",
        textMain: "var(--text-main, #ffffff)",
        textMuted: "var(--text-muted, #b4bebd)",
        border: "var(--border, #233127)",
    };

    if (!result) return null;

    // Assume result.score is the raw score (number correct out of 50)
    const rawScore = result.score;
    const iqScore = calculateIQ(rawScore);
    const classification = getClassification(iqScore);
    const classificationColor = getClassificationColor(classification);

    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
       <div style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",   // 👈 change here
    background: theme.bgMain,
    paddingTop: "120px",            // 👈 add this
    paddingBottom: "3rem",
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
                    IQ Test Result
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
                        color: theme.textMain,
                        fontSize: "4rem",
                        fontWeight: "800",
                        lineHeight: "1"
                    }}>
                        {iqScore}
                    </span>
                    <span style={{
                        color: classificationColor,
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginTop: "0.5rem",
                        textAlign: "center"
                    }}>
                        {classification}
                    </span>
                </div>
                <div style={{
                    marginTop: "1rem",
                    fontSize: "1rem",
                    color: theme.textMuted,
                    textAlign: "center",
                }}>
                    Raw Score: {rawScore} / {TOTAL_QUESTIONS}
                </div>
                <div style={{
                    marginTop: "1rem",
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