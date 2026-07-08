// export default IqQuizPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import iqQuestions from "../data/iqQuestions";
import getApiBaseUrl from "../utils/api";

function IqQuizPage() {
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
    const [submitted, setSubmitted] = useState(false);

    const API_URL = getApiBaseUrl();
    // ✅ TIMER
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // ✅ AUTO SUBMIT
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
        }
    }, [timeLeft]);

    // ⏱ FORMAT TIME
    const formatTime = (seconds) => {
        if (seconds <= 0) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // 🟢 SELECT OPTION
    const handleOptionSelect = (option) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: option,
        }));
    };

    // ➡ NEXT
    const handleNext = () => {
        if (currentQuestionIndex < iqQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    // ⬅ PREVIOUS
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    // 💾 SAVE RESULT
const saveTestResult = async (rawScore, total) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  // ✅ CALCULATE IQ
  const iq = Math.round(((rawScore - 30) / 5) * 15 + 100);

  try {
    const res = await fetch(`${API_URL}/tests/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        testName: "IQ Test",
        result: {
          score: rawScore,
          total: total,
          iq: iq   // ✅ THIS IS THE KEY
        },
      }),
    });

    const data = await res.json();
    console.log("SAVE RESPONSE:", data);

  } catch (err) {
    console.error("Failed to save IQ result", err);
  }
};

    // ✅ SUBMIT
    const handleSubmit = () => {
        if (submitted) return;
        setSubmitted(true);

        let correctCount = 0;

        iqQuestions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctCount++;
            }
        });
saveTestResult(correctCount, iqQuestions.length);

      const wrongCount = iqQuestions.length - correctCount;

navigate("/quiz/iq-result", {
    state: {
        score: correctCount,
        total: iqQuestions.length,
        correct: correctCount,
        wrong: iqQuestions.length - correctCount,
        userAnswers: answers,           // ✅ ADD THIS
        questions: iqQuestions         // ✅ ADD THIS
    },
});
    };

    const currentQuestion = iqQuestions[currentQuestionIndex];
    const progressPercentage =
        ((currentQuestionIndex + 1) / iqQuestions.length) * 100;

    const theme = {
        bgMain: "#0a140f",
        bgCard: "#111c17",
        accent: "#28a745",
        textMain: "#ffffff",
        textMuted: "#b4bebd",
        border: "#233127",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme.bgMain,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
                color: theme.textMain,
            }}
        >
            {/* 🔝 TOP BAR (NO TIMER NOW) */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1000px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                }}
            >
                <div style={{ fontWeight: "600", color: theme.textMuted }}>
                    Question {currentQuestionIndex + 1} of {iqQuestions.length}
                </div>

                {/* 📊 PROGRESS */}
                <div
                    style={{
                        flex: 1,
                        height: "10px",
                        background: "#233127",
                        borderRadius: "5px",
                        margin: "0 2rem",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${progressPercentage}%`,
                            height: "100%",
                            background: theme.accent,
                        }}
                    ></div>
                </div>
            </div>

            {/* 📦 QUESTION CARD */}
            <div
                style={{
                    background: theme.bgCard,
                    width: "100%",
                    maxWidth: "1000px",
                    borderRadius: "20px",
                    padding: "3rem",
                    border: `1px solid ${theme.border}`,
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
                    {currentQuestionIndex + 1}. {currentQuestion.question}
                </h2>

                {/* IMAGE */}
                {currentQuestion.image && (
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <img
                            src={currentQuestion.image}
                            alt="Question"
                            style={{
                                maxWidth: "500px",
                                width: "100%",
                                borderRadius: "12px",
                            }}
                        />
                    </div>
                )}

                {/* OPTIONS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected =
                            answers[currentQuestionIndex] === option;

                        return (
                            <div
                                key={idx}
                                onClick={() => handleOptionSelect(option)}
                                style={{
                                    border: `2px solid ${isSelected ? theme.accent : theme.border}`,
                                    borderRadius: "10px",
                                    padding: "1rem",
                                    cursor: "pointer",
                                    background: isSelected ? theme.accent : "transparent",
                                    color: isSelected ? "#fff" : theme.textMain,
                                }}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>

                {/* BUTTONS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    }}
                >
               {currentQuestionIndex > 0 && (
    <button onClick={handlePrevious} style={{backgroundColor:"#28a745",color:"#fff",border:"none",padding:"0.8rem 1.8rem",borderRadius:"8px",fontWeight:"600",cursor:"pointer"}}>Back</button>
)}
                  <button
    onClick={handleNext}
    style={{
        backgroundColor: "#28a745",   // ✅ green
        color: "#fff",
        border: "none",
        padding: "0.8rem 1.8rem",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
    }}
>
    {currentQuestionIndex === iqQuestions.length - 1
        ? "Submit"
        : "Next"}
</button>
                </div>
            </div>

            {/* ⏳ TIMER BELOW CARD */}
            <div
                style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "#fff",
                        background: "#000",
                        padding: "10px 20px",
                        borderRadius: "25px",
                        border: "2px solid #28a745",
                    }}
                >
                    <FaClock />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>
    );
}

export default IqQuizPage;