import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiClock, FiCheckCircle } from "react-icons/fi";
import getApiBaseUrl from "../utils/api"; 

const IELTS_DATA_WRITING = {
  title: "Academic Writing Practice Test 1",
  tasks: [
    {
      id: "task1",
      title: "Task 1: Report (20 min)",
      prompt: "The diagram below shows how bricks are manufactured for the building industry. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "/bricks.png",
      minWords: 150
    },
    {
      id: "task2",
      title: "Task 2: Essay (40 min)",
      prompt: "Compared to the past, more people are now trying to learn a foreign language to increase their chances of landing a better job in their native country or having better opportunities to work abroad. To what extent do you agree with this point of view? Give specific reasons and examples to support your opinion.",
      minWords: 250
    }
  ]
};

export default function IeltsWriting() {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState(0);
  const [responses, setResponses] = useState({ task1: "", task2: "" });
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);

  const API_URL =  getApiBaseUrl(); 
;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTask = IELTS_DATA_WRITING.tasks[activeTask];
  const wordCount = responses[currentTask.id]?.trim().split(/\s+/).filter(w => w.length > 0).length || 0;

  const handleSubmit = async () => {
    setSubmitted(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch(`${API_URL}/tests/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": token },
          body: JSON.stringify({
            testName: "IELTS Academic Writing",
            result: {
              score: "Submitted",
              total: 2,
              breakdown: {
                task1: responses.task1,
                task2: responses.task2,
                wordCountTask1: responses.task1.split(" ").length,
                wordCountTask2: responses.task2.split(" ").length
              }
            }
          })
        });
        console.log("✅ Writing Test Saved!");
      } catch (err) {
        console.error("❌ Save failed", err);
      }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 text-white font-display">
        <div className="text-center p-10 bg-white/5 rounded-2xl border border-primary/30 max-w-lg">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-white mb-2">Writing Test Submitted</h2>
          <p className="text-gray-400 mb-6">Your essays have been saved to your profile for review.</p>
          <button onClick={() => navigate("/tests/ielts")} className="bg-[#19fd91] text-black px-6 py-2 rounded-lg font-bold">Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ielts-container">
      <style jsx>{`
        .ielts-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a140f 0%, #111c17 100%);
          padding: 2rem;
          padding-top: 100px;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* MAIN TWO-COLUMN LAYOUT */
        .main-container {
          display: grid;
          grid-template-columns: ${currentTask.image ? '1fr 1fr' : '1fr'};
          gap: 2rem;
          height: calc(100vh - 180px);
          max-width: 1500px;
          margin: 0 auto;
        }

        /* FIRST COLUMN: IMAGE ONLY */
        .first-column {
          display: flex;
          flex-direction: column;
        }

        .image-container {
          background: rgba(17, 28, 23, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(25, 253, 145, 0.1);
          border-radius: 20px;
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }

        .image-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 1rem;
          overflow: hidden;
        }

        .image-content img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        /* SECOND COLUMN: PROMPT AND RESPONSE */
        .second-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .prompt-container {
          background: rgba(17, 28, 23, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(25, 253, 145, 0.1);
          border-radius: 20px;
          padding: 2rem;
          flex: 0 0 auto;
          min-height: 200px;
          max-height: 40%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }

        .response-container {
          background: rgba(17, 28, 23, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(25, 253, 145, 0.1);
          border-radius: 20px;
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }

        .editor-area {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          padding: 1.5rem;
          width: 100%;
          flex: 1;
          resize: none;
          font-family: 'Courier New', Courier, monospace;
          font-size: 1.1rem;
          line-height: 1.6;
          outline: none;
          transition: border-color 0.2s;
        }

        .editor-area:focus {
          border-color: #19fd91;
          box-shadow: 0 0 0 2px rgba(25, 253, 145, 0.1);
        }

        .tab-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: gray;
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: rgba(25, 253, 145, 0.1);
          border-color: #19fd91;
          color: #19fd91;
        }

        .tab-btn:hover:not(.active) {
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .primary-btn {
          background: #19fd91;
          color: black;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          padding: 0.8rem 2rem;
          cursor: pointer;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(25, 253, 145, 0.2);
        }

        .word-count {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: monospace;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .min-words-badge {
          background: rgba(25, 253, 145, 0.1);
          color: #19fd91;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .prompt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .response-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
      `}</style>

      {/* HEADER */}
      <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#19fd91]">IELTS Academic Writing</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTask(0)}
              className={`tab-btn ${activeTask === 0 ? "active" : ""}`}
            >
              Task 1
            </button>
            <button
              onClick={() => setActiveTask(1)}
              className={`tab-btn ${activeTask === 1 ? "active" : ""}`}
            >
              Task 2
            </button>
          </div>
        </div>

        <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-xl border border-white/5 ${timeLeft < 300 ? "bg-red-500/20 text-red-400 animate-pulse border-red-500/30" : "bg-white/5 text-gray-300"}`}>
          <FiClock /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* CONFIRMATION OVERLAY */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-black/90 border border-emerald-500/30 rounded-2xl p-8 max-w-lg w-full text-center">
            <FiCheckCircle className="text-6xl text-[#19fd91] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-white mb-2">Writing Submitted</h2>
            <p className="text-gray-400 mb-8">Your essays have been recorded successfully.</p>
            <button onClick={() => navigate("/tests/ielts")} className="primary-btn w-full justify-center">Back to Dashboard</button>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="main-container">
        {/* FIRST COLUMN: IMAGE ONLY */}
        {currentTask.image && (
          <div className="first-column">
            <div className="image-container">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#19fd91]">Visual Information</h3>
                <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">Task 1 Diagram</span>
              </div>
              <div className="image-content">
                <img src={currentTask.image} alt="Task Visual" />
              </div>
            </div>
          </div>
        )}

        {/* SECOND COLUMN: PROMPT ABOVE, RESPONSE BELOW */}
        <div className="second-column">
          {/* PROMPT SECTION */}
          <div className="prompt-container">
            <div className="prompt-header">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{currentTask.title}</h2>
                <p className="text-gray-400">Writing Prompt</p>
              </div>
              <div className="min-words-badge">
                Min. {currentTask.minWords} words
              </div>
            </div>
            <div className="text-gray-200 leading-relaxed whitespace-pre-line text-lg overflow-y-auto">
              {currentTask.prompt}
            </div>
          </div>

          {/* RESPONSE SECTION */}
          <div className="response-container">
            <div className="response-header">
              <div>
                <span className="text-gray-400 font-bold text-sm tracking-wide">YOUR RESPONSE</span>
                <div className="text-sm text-gray-500 mt-1">{currentTask.title}</div>
              </div>
              <span className={`word-count ${wordCount < currentTask.minWords ? "text-orange-400 border-orange-400/30" : "text-emerald-400 border-emerald-400/30"}`}>
                Words: {wordCount}
              </span>
            </div>

            <textarea
              className="editor-area"
              placeholder={`Type your ${activeTask === 0 ? 'report' : 'essay'} here...`}
              value={responses[currentTask.id] || ""}
              onChange={(e) => setResponses({ ...responses, [currentTask.id]: e.target.value })}
              spellCheck={false}
            />

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {wordCount < currentTask.minWords ? (
                  <span className="text-orange-400">⚠️ Need {currentTask.minWords - wordCount} more words</span>
                ) : (
                  <span className="text-emerald-400">✓ Word count requirement met</span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="primary-btn shadow-lg shadow-emerald-500/20"
              >
                Submit Writing Test <FiSave />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}