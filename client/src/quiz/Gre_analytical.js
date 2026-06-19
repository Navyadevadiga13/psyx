
// src/quiz/Gre_analytical.js

import React, { useState, useEffect } from "react";
import getApiBaseUrl from "../utils/api";
import { FaClock } from "react-icons/fa";

function Gre_analytical() {
const [isSubmitted, setIsSubmitted] = useState(false);
  const API_URL = getApiBaseUrl();
  const totalTime = 30 * 60;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [essay, setEssay] = useState("");
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const wordCount =
    essay.trim() === "" ? 0 : essay.trim().split(/\s+/).length;

  /* ==============================
     GRE ESSAY SCORING LOGIC
  ============================== */

  const calculateScore = (essayText) => {

    const words = essayText.trim().split(/\s+/).length;
    const sentences = essayText.split(/[.!?]/).length;
    const paragraphs = essayText.split(/\n+/).length;

    let score = 0;

    if (words < 150) score = 1;
    else if (words < 200) score = 2.5;
    else if (words < 250) score = 3.5;
    else if (words <= 320) score = 4;
    else if (words <= 400) score = 4.5;

    // penalty if essay exceeds recommended length
    else if (words <= 450) score = 4;
    else if (words <= 500) score = 3.5;
    else score = 3;

    if (sentences > 12) score += 0.25;
    if (paragraphs >= 3) score += 0.25;

    if (score > 6) score = 6;

    return Number(score.toFixed(1));
  };

  /* ==============================
     TIMER
  ============================== */

 useEffect(() => {

  if (showResult) return; // ✅ stop timer after submit

  const timer = setInterval(() => {

    setTimeLeft(prev => {

      if (prev <= 1) {
        clearInterval(timer);
        finishEssay();
        return 0;
      }

      return prev - 1;

    });

  }, 1000);

  return () => clearInterval(timer);

}, [showResult]); // ✅ dependency added

  /* ==============================
     SAVE ESSAY
  ============================== */

const finishEssay = async () => {

  if (isSubmitted) return; // ✅ prevent multiple calls
  setIsSubmitted(true);

  const calculatedScore = calculateScore(essay);
  setScore(calculatedScore);

  try {

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/tests/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        testName: "GRE Analytical Writing",
        result: {
          wordCount: wordCount,
          essay: essay,
          score: calculatedScore
        }
      })
    });

  } catch (err) {
    console.error("Error saving essay:", err);
  }

  setShowResult(true);
};

  /* ==============================
     RESULT SCREEN
  ============================== */

  if (showResult) {

    return (

      <div style={{
        maxWidth: "800px",
        margin: "120px auto 60px",
        padding: "0 20px",
        textAlign: "center"
      }}>

        <h1 style={{
          fontSize: "32px",
          color: "#19fd91",
          marginBottom: "20px"
        }}>
          GRE Analytical Writing Test
        </h1>

        <div style={{
          background: "#111",
          border: "1px solid #19fd91",
          borderRadius: "12px",
          padding: "30px",
          marginTop: "20px"
        }}>

          <h2>Your Essay Submitted</h2>

          <div style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#19fd91",
            marginTop: "10px"
          }}>
            Word Count: {wordCount}
          </div>

          <div style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#19fd91",
            marginTop: "10px"
          }}>
            GRE Score: {score} / 6
          </div>

          <div style={{ marginTop: "15px", color: "#19fd91" }}>
            ✅ Complete result stored in profile
          </div>

          <button
            style={{
              padding: "12px 25px",
              background: "#19fd91",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "20px"
            }}
            onClick={() => window.location.href = "/profile"}
          >
            Go to Profile
          </button>

        </div>

      </div>

    );

  }

  /* ==============================
     TEST SCREEN
  ============================== */

  return (

    <div style={{
      minHeight: "100vh",
      background: "#111",
      display: "flex",
      justifyContent: "center",
      paddingTop: "140px",
      paddingLeft: "15px",
      paddingRight: "15px"
    }}>

      <div style={{ width: "100%", maxWidth: "900px", color: "white" }}>

        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          GRE Analytical Writing — Issue Task
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          <FaClock /> {minutes}:{seconds < 10 ? "0" : ""}{seconds}
        </p>

        <div style={{
          height: "8px",
          background: "#333",
          borderRadius: "6px",
          marginBottom: "25px"
        }}>
          <div style={{
            width: `${progress}%`,
            background: "#19fd91",
            height: "100%",
            borderRadius: "6px"
          }}></div>
        </div>

        <div style={{
          background: "#111",
          border: "1px solid #19fd91",
          borderRadius: "12px",
          padding: "30px",
          color: "#ccc"
        }}>

          <h3 style={{ color: "#19fd91" }}>Directions</h3>

          <p>
            Write an essay explaining whether you agree or disagree with the statement below.
            Support your opinion with reasons and examples.
          </p>

          <p>
            Recommended length: <b>250–400 words</b>.
          </p>

          <h3 style={{ marginTop: "25px", color: "#19fd91" }}>Issue Topic</h3>

          <blockquote style={{
            fontStyle: "italic",
            fontSize: "18px",
            marginTop: "10px",
            color: "#fff"
          }}>
            "Societies that prioritize economic growth above all other goals
            inevitably weaken their cultural values and social well-being."
          </blockquote>

          <h3 style={{ marginTop: "25px", color: "#19fd91" }}>Your Response</h3>

          <textarea
            style={{
              width: "100%",
              height: "220px",
              marginTop: "15px",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #19fd91",
              background: "#000",
              color: "#fff",
              resize: "none"
            }}
            placeholder="Start writing your essay here..."
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
          />

          <div style={{
            marginTop: "10px",
            fontWeight: "bold",
            color: "#19fd91"
          }}>
            Words: {wordCount}
          </div>

          {wordCount > 400 && (
            <p style={{ color: "#ff4d4d" }}>
              Essay exceeds the GRE recommended limit of 400 words.
            </p>
          )}

          {wordCount > 0 && wordCount < 150 && (
            <p style={{ color: "#ff4d4d" }}>
              Essay is too short. Minimum 150 words required.
            </p>
          )}

          <div style={{ textAlign: "center" }}>

            <button
              onClick={finishEssay}
disabled={wordCount < 150 || wordCount > 400 || isSubmitted}
              style={{
                background:
                  wordCount >= 150 && wordCount <= 400 ? "#19fd91" : "#555",
                color:
                  wordCount >= 150 && wordCount <= 400 ? "#000" : "#aaa",
                border: "none",
                padding: "12px 32px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor:
                  wordCount >= 150 && wordCount <= 400
                    ? "pointer"
                    : "not-allowed",
                marginTop: "20px",
                marginBottom: "40px",
                fontSize: "16px"
              }}
            >
              Submit Essay
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Gre_analytical;

