import React, { useState } from "react";
import getApiBaseUrl from "../utils/api";

const TEST_NAME = "Social Quotient Test";

const QUESTIONS = [
  "I maintain comfortable eye contact when speaking with people.",
  "I listen intently when in conversation with others.",
  "I can express my thoughts without difficulty.",
  "I can initiate conversations with new acquaintances.",
  "I can compromise with others.",
  "I avoid interrupting others when they are speaking.",
  "I pick up details about a person through their body language.",
  "I make an effort to make new friends.",
  "I rarely monopolize conversations.",
  "I tune out feedback that I don’t want to hear.",
  "I try to listen to critical feedback.",
  "I am genuinely interested in other people’s lives.",
  "I apologize with ease when I make a mistake.",
  "I know when a person is anxious.",
  "People say that I am inappropriate in social situations.",
  "I have empathy for others.",
  "I try to call out bullies.",
  "I praise the efforts of others.",
  "I can adapt my style of communication to connect with a conversation partner.",
  "I am uncomfortable in social situations."
];

const OPTIONS = [
  { label: "Strongly Disagree", value: 0 },
  { label: "Disagree", value: 1 },
  { label: "Neutral", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly Agree", value: 4 }
];

const REVERSE_INDEXES = [9, 14, 19];

export default function SqTest() {
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [resultData, setResultData] = useState(null);

  const API_URL = getApiBaseUrl();

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const calculateScore = async () => {
    let total = 0;

    answers.forEach((value, index) => {
      if (value === null) return;

      if (REVERSE_INDEXES.includes(index)) {
        total += 4 - value;
      } else {
        total += value;
      }
    });

    const level =
      total >= 65
        ? "Very High Social Intelligence"
        : total >= 50
        ? "High / Healthy Social Skills"
        : total >= 35
        ? "Moderate Social Skills"
        : "Needs Social Skill Development";

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/tests/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          testName: TEST_NAME,
          result: {
            score: total,
            level: level
          }
        })
      });

      const savedData = await response.json();
      setResultData(savedData.result);

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      console.error("Error saving SQ result:", error);
    }
  };

  const resetTest = () => {
    setAnswers(Array(20).fill(null));
    setResultData(null);
  };

  /* ================= RESULT SCREEN ================= */

  if (resultData) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>{TEST_NAME}</h1>

        <div style={styles.resultCard}>
          <h2>Your Social Intelligence Result</h2>

          <div style={styles.scoreText}>
            Score: {resultData.score} / 80
          </div>

          <div style={styles.levelText}>
            {resultData.level}
          </div>

          <div style={styles.savedMessage}>
            ✅ Result saved to your profile!
          </div>

          <button style={styles.button} onClick={resetTest}>
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  /* ================= QUESTION SCREEN ================= */

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{TEST_NAME}</h1>

      {/* ✅ DESCRIPTION CARD SECTION */}
      <div style={styles.descriptionCard}>
        <p>
          This test measures your Social Quotient (SQ) — your ability to
          understand and interact effectively with others.
        </p>
        <p>
          Read each statement carefully and choose the option that best reflects
          your usual behavior. There are no right or wrong answers.
        </p>
      </div>

      {QUESTIONS.map((question, index) => (
        <div key={index} style={styles.questionCard}>
          <p>{index + 1}. {question}</p>

          {OPTIONS.map((option) => (
            <label key={option.value} style={styles.optionLabel}>
              <input
                type="radio"
                name={`q${index}`}
                value={option.value}
                onChange={() => handleChange(index, option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      ))}

      <button style={styles.button} onClick={calculateScore}>
        Submit
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "800px",
    margin: "120px auto 60px",
    padding: "0 20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    color: "#19fd91",
    marginBottom: "20px",
  },

  /* ✅ NEW DESCRIPTION CARD STYLE */
  descriptionCard: {
    background: "#111",
    border: "1px solid #19fd91",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    color: "#ccc",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },

  questionCard: {
    background: "#111",
    border: "1px solid #19fd91",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    textAlign: "left",
  },
  optionLabel: {
    display: "block",
    marginTop: "8px",
    cursor: "pointer",
  },
  button: {
    padding: "12px 25px",
    background: "#19fd91",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "20px",
  },
  resultCard: {
    background: "#111",
    border: "1px solid #19fd91",
    borderRadius: "12px",
    padding: "30px",
    marginTop: "20px",
  },
  scoreText: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#19fd91",
    marginTop: "10px"
  },
  levelText: {
    fontSize: "1.1rem",
    marginTop: "10px"
  },
  savedMessage: {
    marginTop: "15px",
    color: "#19fd91"
  }
};