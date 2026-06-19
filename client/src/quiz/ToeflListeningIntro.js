import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaHeadphones } from "react-icons/fa";

function ToeflListeningIntro() {
  const navigate = useNavigate();
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const handleStartTest = () => {
    navigate("/quiz/toefl/listening");
  };

  return (
    <>
      <style>{`
        .listening-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a140f 0%, #111c17 100%);
          padding: 2rem;
          padding-top: 100px;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(17, 28, 23, 0.7);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(25, 253, 145, 0.1);
          backdrop-filter: blur(10px);
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #19fd91;
          text-align: center;
        }

        .subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #19fd91;
          margin: 2rem 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .conditions-box {
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(25,253,145,0.2);
        }

        .conditions-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .condition-item {
          color: rgba(255,255,255,0.9);
          padding: 0.8rem 0;
          font-size: 1.05rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: flex-start;
        }

        .condition-item:last-child {
          border-bottom: none;
        }

        .condition-item::before {
          content: "•";
          color: #19fd91;
          font-size: 1.5rem;
          margin-right: 1rem;
          font-weight: bold;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .start-button {
          background: #19fd91;
          color: black;
          border: none;
          padding: 1.2rem 3rem;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .exit-button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1.2rem 3rem;
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          border-radius: 12px;
          cursor: pointer;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(25,253,145,0.3),
            transparent
          );
          margin-top: 2rem;
        }
      `}</style>

      <div className="listening-container">
        <div className="content-wrapper">

          <h1 className="main-title">
            TOEFL Listening Test
          </h1>

          <p className="subtitle">
            This section measures your ability to understand spoken English in academic environments.
          </p>

          <h2 className="section-title">
            <FaHeadphones size={20} /> Test Instructions
          </h2>

          <div className="conditions-box">
            <ul className="conditions-list">

              <li className="condition-item">
                The test contains 25 listening questions.
              </li>

              <li className="condition-item">
                The listening test is divided into 3 parts:
                <br />
                Part A – Short Conversations
                <br />
                Part B – Longer Conversations
                <br />
                Part C – Lectures and Talks
              </li>

              <li className="condition-item">
                Click the "Play Audio Question" button to hear the conversation or lecture.
              </li>

              <li className="condition-item">
                Each audio will play only once, so listen carefully.
              </li>

              <li className="condition-item">
                After listening, select the best answer from the four options provided.
              </li>

              <li className="condition-item">
                You must answer each question before moving to the next one.
              </li>

              <li className="condition-item">
                You cannot return to previous questions.
              </li>

              <li className="condition-item">
                You have 35 minutes to complete the test.
              </li>

            </ul>
          </div>

          <div className="button-group">
            <button className="start-button" onClick={handleStartTest}>
              <FaPlay size={16} /> Start Test
            </button>

            <button
              className="exit-button"
              onClick={() => navigate("/tests")}
            >
              Exit Module
            </button>
          </div>

          <div className="divider-line"></div>

        </div>
      </div>
    </>
  );
}

export default ToeflListeningIntro;