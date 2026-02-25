

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiSave, FiVolume2, FiClock, FiAlertTriangle, FiPlay } from "react-icons/fi";
import getApiBaseUrl from "../utils/api"; 


// ==========================================
// 1. DATA: LISTENING
// ==========================================
const IELTS_DATA_LISTENING = {
  title: "IELTS Fever Listening Practice Test 1",
  audioSrc: "/audio/test1.mp3",
  sections: [
    {
      id: "s1",
      title: "  Section 1: Revision Note",
      // PDF Source: Page 1 [cite: 6, 7]
      questions: [
        { id: "q1", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Problem with: the brochure sample. Company name: ______ Hotel Chains", type: "fill_blank", answer: "central" },
        { id: "q2", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Letters of the ______ should be bigger.", type: "fill_blank", answer: "address" },
        { id: "q3", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "The information of the ______ should be removed.", type: "fill_blank", answer: "pool" },
        { id: "q4", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Change the description under the top photo to ______.", type: "fill_blank", answer: "reception" },
        { id: "q5", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Use the picture with the ______ of the hotel.", type: "fill_blank", answer: "view" },
        { id: "q6", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "The ______ should be in red print.", type: "fill_blank", answer: "price" },
        { id: "q7", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Translate into ______.", type: "fill_blank", answer: "spanish" },
        { id: "q8", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Deadline: by the end of ______.", type: "fill_blank", answer: "july" },
        { id: "q9", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Address: No. 9 Green Drive, ______ , NY21300.", type: "fill_blank", answer: "cliffside" },
        { id: "q10", instruction: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.", text: "Telephone number: ______.", type: "fill_blank", answer: "9038664428" }
      ]
    },
    {
      id: "s2",
      title: "  Section 2: Park Tour Guide",
      // PDF Source: Page 2 & 3 [cite: 37, 70]
      questions: [
        { id: "q11", instruction: "Choose the correct letter, A, B or C.", text: "The most famous view in this park is:", type: "mcq", options: ["A. the largest waterfall worldwide", "B. the longest river in the world", "C. the biggest sub-tropical rainforest"], answer: "C" },
        { id: "q12", instruction: "Choose the correct letter, A, B or C.", text: "According to the tour guide, what is best to do on top of the mountain?", type: "mcq", options: ["A. having a picnic", "B. taking photos", "C. strolling about"], answer: "B" },
        { id: "q13", instruction: "Choose the correct letter, A, B or C.", text: "What did the tour guide recommend for experienced walkers?", type: "mcq", options: ["A. the mountain trail", "B. the busk track", "C. the Creek circuit"], answer: "C" },
        { id: "q14", instruction: "Choose the correct letter, A, B or C.", text: "What is mentioned about the transport in the park?", type: "mcq", options: ["A. Bicycles can be hired", "B. Trams are available", "C. It is included in the bill"], answer: "A" },
        { id: "q15", instruction: "Choose the correct letter, A, B or C.", text: "Which activity is provided for adults all year round?", type: "mcq", options: ["A. abseiling", "B. bungee jumping", "C. paragliding"], answer: "A" },
        { id: "q16", instruction: "Choose the correct letter, A, B or C.", text: "What should the visitors do before they go to the restaurant?", type: "mcq", options: ["A. make bookings", "B. inquire about availability", "C. collect the meal ticket at reception"], answer: "C" },

        // MAP LABELLING Q17-Q20 [cite: 70]
        {
          id: "q17",
          instruction: "Label the plan below. Write the correct letter, A-I, next to Questions 17-20.",
          text: "Location 17 (Campsite) is:",
          type: "mcq",
          options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          answer: "G",
          img: "/images/campsite_map.png" // 🖼️ Map Image
        },
        { id: "q18", instruction: "Label the plan below. Write the correct letter, A-I, next to Questions 17-20.", text: "Location 18 (Business Centre) is:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"], answer: "H" },
        { id: "q19", instruction: "Label the plan below. Write the correct letter, A-I, next to Questions 17-20.", text: "Location 19 (Museum) is:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"], answer: "I" },
        { id: "q20", instruction: "Label the plan below. Write the correct letter, A-I, next to Questions 17-20.", text: "Location 20 (Cafe) is:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"], answer: "F" }
      ]
    },
    {
      id: "s3",
      title: "  Section 3: Nursing Program Discussion",
      // PDF Source: Page 4 & 5 [cite: 91, 117]
      questions: [
        { id: "q21", instruction: "Choose the correct letter, A, B or C.", text: "How old are the students of the nursing program?", type: "mcq", options: ["A. Teenagers", "B. In their twenties", "C. Different age groups"], answer: "C" },
        { id: "q22", instruction: "Choose the correct letter, A, B or C.", text: "What do the speakers say about the group project?", type: "mcq", options: ["A. Improves relationships", "B. Develops problem solving", "C. Provides supportive environment"], answer: "B" },
        { id: "q23", instruction: "Choose the correct letter, A, B or C.", text: "Which part of the program surprised Paul?", type: "mcq", options: ["A. Number of essays", "B. Lot of practice work", "C. Internship provided"], answer: "A" },
        { id: "q24", instruction: "Choose the correct letter, A, B or C.", text: "What do they feel about learning law?", type: "mcq", options: ["A. Essential training", "B. Too theoretical", "C. Takes up too much time"], answer: "A" },

        // MATCHING Q25-Q30 [cite: 117]
        {
          id: "q25",
          instruction: "What are the suggestions offered by the speakers? Choose SIX answers from the box and write the correct letter, A-H, next to Questions 25-30.",
          text: "Essays:",
          type: "mcq",
          options: ["A", "B", "C", "D", "E", "F", "G", "H"],
          answer: "E",
          img: "/images/options_box.png" // 🖼️ NEW: Options Box Image
        },
        { id: "q26", instruction: "Choose SIX answers from the box and write the correct letter, A-H.", text: "Lectures:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H"], answer: "G" },
        { id: "q27", instruction: "Choose SIX answers from the box and write the correct letter, A-H.", text: "Research:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H"], answer: "F" },
        { id: "q28", instruction: "Choose SIX answers from the box and write the correct letter, A-H.", text: "Online forum:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H"], answer: "D" },
        { id: "q29", instruction: "Choose SIX answers from the box and write the correct letter, A-H.", text: "Placement tests:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H"], answer: "B" },
        { id: "q30", instruction: "Choose SIX answers from the box and write the correct letter, A-H.", text: "Freshmen:", type: "mcq", options: ["A", "B", "C", "D", "E", "F", "G", "H"], answer: "C" }
      ]
    },
    {
      id: "s4",
      title: "  Section 4: Penguins in Africa",
      // PDF Source: Page 6 [cite: 141]
      questions: [
        { id: "q31", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "The ______ of their body remains constant.", type: "fill_blank", answer: "temperature" },
        { id: "q32", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "They restrict their ______ on land from dusk till dawn.", type: "fill_blank", answer: "movement" },
        { id: "q33", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "They cannot fly because they have heavy ______.", type: "fill_blank", answer: "bones" },
        { id: "q34", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "They nest under the tree ______.", type: "fill_blank", answer: "roots" },
        { id: "q35", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "They eat tree ______.", type: "fill_blank", answer: "leaves" },
        { id: "q36", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "Predators include seals, seagulls, and ______.", type: "fill_blank", answer: "sharks" },
        { id: "q37", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "Seagulls eat the penguin ______.", type: "fill_blank", answer: "eggs" },
        { id: "q38", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "They lose ______ in winter.", type: "fill_blank", answer: "feathers" },
        { id: "q39", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "Fighting for nesting ______ and food.", type: "fill_blank", answer: "space" },
        { id: "q40", instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.", text: "Increase the ______ of their genes.", type: "fill_blank", answer: "diversity" }
      ]
    }
  ]
};

// ==========================================
// 2. COMPONENT LOGIC
// ==========================================
export default function IeltsListening() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // STATE: EXAM FLOW
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState("");

  // 30 MINUTE TIMER
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const audioRef = useRef(null);
  const API_URL = getApiBaseUrl(); 
;

  // Timer Logic
  useEffect(() => {
    let timer;
    if (hasStarted && !showResult) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            calculateScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasStarted, showResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startTest = () => {
    setAudioError(""); // Clear previous errors
    if (audioRef.current) {
      // Try to play. If it fails (file missing), show error.
      audioRef.current.play()
        .then(() => {
          setHasStarted(true);
        })
        .catch(err => {
          console.error("Audio Playback Error:", err);
          setAudioError("Error: Audio file not found. Check client/public/audio/test1.mp3");
        });
    }
  };

  const handleInput = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const saveTestResult = async (finalScore, totalQuestions, fullBreakdown) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${API_URL}/tests/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify({
          testName: IELTS_DATA_LISTENING.title,
          result: {
            score: finalScore,
            total: totalQuestions,
            percentage: Math.round((finalScore / totalQuestions) * 100) + "%",
            breakdown: fullBreakdown
          }
        })
      });
      console.log("✅ IELTS Listening Saved!");
    } catch (err) {
      console.error("❌ Save failed:", err);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    let totalQuestions = 0;
    const breakdown = {};

    IELTS_DATA_LISTENING.sections.forEach(section => {
      section.questions.forEach(item => {
        totalQuestions++;
        const userAns = (answers[item.id] || "").trim().toLowerCase();
        const correctAns = (item.answer || "").trim().toLowerCase();
        let isCorrect = false;

        if (item.type === "mcq") {
          if (userAns.charAt(0) === correctAns.charAt(0)) isCorrect = true;
        } else {
          if (userAns === correctAns) isCorrect = true;
        }

        if (isCorrect) newScore++;
        breakdown[item.id] = { user: answers[item.id], correct: item.answer, isCorrect };
      });
    });

    setScore(newScore);
    setShowResult(true);
    window.scrollTo(0, 0);
    saveTestResult(newScore, totalQuestions, breakdown);
  };

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

        .glass-card {
          background: rgba(17, 28, 23, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(25, 253, 145, 0.1);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }

        .glass-header {
           background: rgba(13, 22, 18, 0.8);
           backdrop-filter: blur(10px);
           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
           position: sticky;
           top: 0;
           z-index: 20;
           padding: 1rem 0;
           margin-bottom: 2rem;
        }

        .question-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .question-card:hover {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(25, 253, 145, 0.1);
        }

        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 8px;
          padding: 0.8rem;
          width: 100%;
          outline: none;
          transition: all 0.2s;
        }

        .input-field:focus {
          border-color: #19fd91;
          box-shadow: 0 0 0 2px rgba(25, 253, 145, 0.1);
        }

        .primary-btn {
          background: #19fd91;
          color: black;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(25, 253, 145, 0.2);
        }

        .option-label {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.2s;
        }

        .option-label:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .option-label.selected {
            background: rgba(25, 253, 145, 0.1);
            border-color: #19fd91;
        }

        .info-pill {
            background: rgba(255, 255, 255, 0.05);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
       
        /* ADDED: Space between instruction and question text */
        .question-instruction {
          display: block;
          margin-bottom: 12px;
        }
       
        .question-text {
          display: block;
          margin-top: 8px;
        }
      `}</style>

      {/* AUDIO ELEMENT: Always rendered */}
      <audio
        ref={audioRef}
        src={IELTS_DATA_LISTENING.audioSrc}
        onError={(e) => {
          console.error("Audio Load Error:", e);
          setAudioError("Error: Audio file could not be loaded.");
        }}
        style={{ display: 'none' }}
      />

      {/* HEADER */}
      <div className="w-full max-w-[1000px] mx-auto flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <span className="text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => navigate("/tests/ielts")}>IELTS Suite</span>
          <span className="text-gray-600">/</span>
          <span className="text-[#19fd91]">Listening</span>
        </h1>

        <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-xl border border-white/5 ${timeLeft < 300 ? "bg-red-500/20 text-red-400 animate-pulse border-red-500/30" : "bg-white/5 text-gray-300"}`}>
          <FiClock /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* --- START OVERLAY --- */}
      {!hasStarted && !showResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full text-center border-emerald-500/30 shadow-[0_0_50px_rgba(25,253,145,0.15)] transform transition-all hover:scale-105">
            <FiVolume2 className="text-6xl text-[#19fd91] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(25,253,145,0.5)]" />
            <h2 className="text-3xl font-bold text-white mb-2">Listening Test Ready</h2>
            <p className="text-gray-400 mb-8">Ensure your audio is working properly.</p>

            {audioError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm font-bold flex items-center justify-center gap-2">
                <FiAlertTriangle /> {audioError}
              </div>
            )}

            <div className="text-left bg-black/20 p-6 rounded-xl mb-8 space-y-3 border border-white/5">
              <p className="flex items-center gap-2 text-orange-400 font-bold mb-4"><FiAlertTriangle /> Exam Conditions</p>
              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Audio plays once ONLY</p>
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> No pause/replay allowed</p>
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Auto-submit at 30:00</p>
              </div>
            </div>

            <button
              onClick={startTest}
              className="primary-btn w-full flex items-center justify-center gap-3 text-lg"
            >
              <FiPlay fill="currentColor" /> Start Audio & Test
            </button>
          </div>
        </div>
      )}

      {/* AUDIO STATUS BAR */}
      {hasStarted && !showResult && (
        <div className="glass-card w-full max-w-[1000px] mx-auto p-4 mb-8 flex items-center justify-between sticky top-[20px] z-30 shadow-xl border-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full relative shadow-[0_0_10px_red]"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Recording in Progress</h3>
              <p className="text-xs text-gray-400">Audio playback controls are disabled.</p>
            </div>
          </div>
          <div className="text-xs text-[#19fd91] font-mono border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/5">
            ● Live
          </div>
        </div>
      )}

      {/* RESULT CARD */}
      {showResult && (
        <div className="glass-card w-full max-w-[1000px] mx-auto text-center mb-12 border-emerald-500/30">
          <h2 className="text-4xl font-bold text-white mb-4">Test Complete</h2>
          <div className="text-6xl font-bold text-[#19fd91] mb-2">{score} <span className="text-2xl text-gray-400">/ 40</span></div>
          <p className="text-gray-400 mb-8">Here is your performance breakdown</p>

          <div className="flex justify-center gap-4">
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold transition-all border border-white/10">Retake Test</button>
            <button onClick={() => navigate("/tests/ielts")} className="primary-btn">Back to Menu</button>
          </div>
        </div>
      )}

      {/* QUESTIONS CONTAINER */}
      <div className={`w-full max-w-[1000px] mx-auto space-y-8 ${!hasStarted && !showResult ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {IELTS_DATA_LISTENING.sections.map((section, idx) => (
          <div key={section.id} className="glass-card">
            <h2 className="text-xl font-bold mb-6 text-[#19fd91] border-b border-white/5 pb-4 flex items-center gap-3">
              <span className="bg-emerald-500/10 px-3 py-1 rounded-lg text-sm">Part {idx + 1}</span>
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.questions.map(item => {
                const userAns = (answers[item.id] || "").trim().toLowerCase();
                const correctAns = (item.answer || "").trim().toLowerCase();
                let isCorrect = false;
                if (showResult) {
                  if (item.type === "mcq") { if (userAns.charAt(0) === correctAns.charAt(0)) isCorrect = true; }
                  else { if (userAns === correctAns) isCorrect = true; }
                }

                return (
                  <div key={item.id} className="question-card">

                    {/* ✅ RENDER IMAGE (Map or Options Box) */}
                    {item.img && (
                      <div className="mb-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={item.img}
                          alt="Question Diagram"
                          className="w-full h-auto object-contain max-h-[400px] bg-black/40"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-[#19fd91] border border-white/10">{item.id.replace('q', '')}</span>
                        <div>
                          {/* MODIFIED: Separate instruction and question text with space */}
                          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-3 question-instruction">
                            {item.instruction}
                          </span>
                          <span className="text-gray-100 text-lg leading-relaxed question-text">
                            {item.text}
                          </span>
                        </div>
                      </div>
                      {showResult && (isCorrect
                        ? <div className="bg-green-500/20 text-green-400 p-2 rounded-full"><FiCheckCircle size={24} /></div>
                        : <div className="bg-red-500/20 text-red-400 p-2 rounded-full"><FiXCircle size={24} /></div>
                      )}
                    </div>

                    {/* INPUTS */}
                    <div className="pl-12">
                      {item.type === "fill_blank" && (
                        <input
                          type="text"
                          className="input-field max-w-md font-mono text-lg"
                          placeholder="Type your answer..."
                          value={answers[item.id] || ""}
                          onChange={(e) => handleInput(item.id, e.target.value)}
                          disabled={showResult}
                        />
                      )}

                      {item.type === "mcq" && (
                        <div className="space-y-3 mt-4">
                          {item.options.map(opt => {
                            const letter = opt.charAt(0);
                            const isSelected = (answers[item.id] === letter);
                            let labelClass = "option-label";

                            if (showResult) {
                              if (letter === correctAns.charAt(0)) labelClass += " border-green-500 bg-green-500/10";
                              else if (isSelected) labelClass += " border-red-500 bg-red-500/10";
                            } else if (isSelected) {
                              labelClass += " selected";
                            }

                            return (
                              <div
                                key={opt}
                                onClick={() => !showResult && handleInput(item.id, letter)}
                                className={labelClass}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#19fd91]' : 'border-gray-500'}`}>
                                  {isSelected && <div className="w-3 h-3 rounded-full bg-[#19fd91]"></div>}
                                </div>
                                <span className={isSelected || showResult ? "text-white font-medium" : "text-gray-300"}>{opt}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {showResult && !isCorrect && (
                        <div className="mt-4 text-sm text-red-300 bg-red-500/10 p-3 rounded-lg border border-red-500/20 inline-block font-mono">
                          Correct Answer: <strong className="text-white">{item.answer}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* SUBMIT BUTTON */}
        {!showResult && (
          <div className="flex justify-end pt-8 pb-20">
            <button
              onClick={calculateScore}
              className="primary-btn text-xl px-12 py-4 flex items-center gap-3 shadow-[0_0_30px_rgba(25,253,145,0.3)] hover:shadow-[0_0_50px_rgba(25,253,145,0.5)]"
            >
              Submit Listening Test <FiSave />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}