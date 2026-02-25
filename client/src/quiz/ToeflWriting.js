import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api"; 

// Sample module data – expand as needed
const writingModules = [
  {
    id: "moduleA",
    title: "Writing Practice – Module A",
    sections: [
      // 10 distinct sentence completion tasks
      {
        type: "completeSentence",
        question: "What was the highlight of your trip?",
        template: "The ______ fantastic.",
        words: ["were", "the", "was", "old", "city", "showed", "us", "around", "who", "tour", "guides"],
        answer: "old city the tour guides showed us around",
      },
      {
        type: "completeSentence",
        question: "Why did she decide to study abroad?",
        template: "She wanted to ______ new cultures.",
        words: ["experience", "learn", "about", "different", "people", "and", "traditions"],
        answer: "experience different cultures and learn about new people",
      },
      {
        type: "completeSentence",
        question: "How does regular exercise benefit health?",
        template: "It improves ______ and reduces stress.",
        words: ["cardiovascular", "fitness", "mental", "wellbeing", "physical", "strength"],
        answer: "cardiovascular fitness and mental wellbeing",
      },
      {
        type: "completeSentence",
        question: "What are the effects of climate change?",
        template: "Rising temperatures lead to ______ events.",
        words: ["extreme", "weather", "more", "frequent", "such", "as", "storms", "droughts"],
        answer: "more frequent extreme weather events such as storms and droughts",
      },
      {
        type: "completeSentence",
        question: "Why is recycling important?",
        template: "It helps reduce ______ and conserve resources.",
        words: ["waste", "pollution", "natural", "protects", "environment", "the"],
        answer: "waste and pollution and protects the natural environment",
      },
      {
        type: "completeSentence",
        question: "What did the professor emphasize?",
        template: "He stressed the importance of ______.",
        words: ["meeting", "deadlines", "submitting", "work", "on", "time", "always"],
        answer: "meeting deadlines and always submitting work on time",
      },
      {
        type: "completeSentence",
        question: "How can companies improve customer service?",
        template: "They should train employees to be ______.",
        words: ["more", "responsive", "helpful", "and", "friendly", "customers", "towards"],
        answer: "more responsive and helpful and friendly towards customers",
      },
      {
        type: "completeSentence",
        question: "What is the function of a cell membrane?",
        template: "It controls what enters and ______ the cell.",
        words: ["leaves", "protects", "the", "from", "outside", "harmful", "substances"],
        answer: "leaves the cell and protects it from harmful outside substances",
      },
      {
        type: "completeSentence",
        question: "Why do people prefer online shopping?",
        template: "It offers convenience and a wider ______.",
        words: ["range", "of", "products", "competitive", "prices", "often", "with"],
        answer: "range of products often with competitive prices",
      },
      {
        type: "completeSentence",
        question: "What did the report conclude?",
        template: "The findings suggest that further ______.",
        words: ["research", "is", "needed", "to", "confirm", "these", "results"],
        answer: "research is needed to confirm these results",
      },
      // 2 email tasks
      {
        type: "email",
        prompt: "Write an email to your professor requesting a meeting to discuss your research project. Mention your available times and ask for feedback.",
      },
      {
        type: "email",
        prompt: "Write an email to a colleague to reschedule a team meeting. Apologize and propose two alternative times.",
      },
      // 2 discussion tasks
      {
        type: "discussion",
        prompt: "Your class is discussing the impact of social media on mental health. Post a message sharing your opinion and respond to a classmate's point.",
      },
      {
        type: "discussion",
        prompt: "In a course discussion about renewable energy, post your opinion on whether solar power should be mandatory for new buildings.",
      },
    ],
  },
  {
    id: "moduleB",
    title: "Writing Practice – Module B",
    sections: [
      // 10 distinct sentence completion tasks for Module B
      {
        type: "completeSentence",
        question: "What are the benefits of learning a second language?",
        template: "It enhances cognitive abilities and ______.",
        words: ["improves", "communication", "skills", "cultural", "understanding", "broadens"],
        answer: "improves communication skills and broadens cultural understanding",
      },
      {
        type: "completeSentence",
        question: "How does technology affect education?",
        template: "It provides access to information and ______.",
        words: ["makes", "learning", "more", "interactive", "engaging", "and"],
        answer: "makes learning more interactive and engaging",
      },
      {
        type: "completeSentence",
        question: "Why is teamwork important in the workplace?",
        template: "It fosters collaboration and ______.",
        words: ["increases", "productivity", "creativity", "enhances", "problem", "solving"],
        answer: "increases productivity and enhances problem solving",
      },
      {
        type: "completeSentence",
        question: "What causes air pollution?",
        template: "Vehicle emissions and industrial ______.",
        words: ["activities", "are", "major", "contributors", "to", "air", "pollution"],
        answer: "activities are major contributors to air pollution",
      },
      {
        type: "completeSentence",
        question: "How can we reduce food waste?",
        template: "By planning meals and ______ properly.",
        words: ["storing", "food", "composting", "leftovers", "using", "creative", "recipes"],
        answer: "storing food properly and using leftovers in creative recipes",
      },
      {
        type: "completeSentence",
        question: "What did the survey reveal?",
        template: "Most respondents preferred ______ over in‑person meetings.",
        words: ["online", "video", "calls", "to", "save", "time", "and", "money"],
        answer: "online video calls to save time and money",
      },
      {
        type: "completeSentence",
        question: "Why do some companies fail?",
        template: "They often ignore customer feedback and ______.",
        words: ["fail", "to", "adapt", "market", "changes", "to", "quickly"],
        answer: "fail to adapt to market changes quickly",
      },
      {
        type: "completeSentence",
        question: "What is the role of a manager?",
        template: "To guide the team and ensure ______.",
        words: ["goals", "are", "met", "efficiently", "and", "effectively"],
        answer: "goals are met efficiently and effectively",
      },
      {
        type: "completeSentence",
        question: "How does music affect mood?",
        template: "It can uplift spirits or help people ______.",
        words: ["relax", "after", "a", "long", "day", "concentrate", "while", "studying"],
        answer: "relax after a long day or concentrate while studying",
      },
      {
        type: "completeSentence",
        question: "What are the characteristics of a good leader?",
        template: "They are communicative, empathetic, and ______.",
        words: ["able", "to", "inspire", "others", "make", "decisions", "confidently"],
        answer: "able to inspire others and make decisions confidently",
      },
      // 2 email tasks
      {
        type: "email",
        prompt: "Write an email to a client apologizing for a delayed shipment and explaining the new delivery date.",
      },
      {
        type: "email",
        prompt: "Write an email to your study group suggesting a time and place for the next meeting.",
      },
      // 2 discussion tasks
      {
        type: "discussion",
        prompt: "Discuss the pros and cons of remote work. Share your opinion and reply to another student's post.",
      },
      {
        type: "discussion",
        prompt: "Should college education be free? Post your thoughts and respond to a classmate.",
      },
    ],
  },
];

function ToeflWriting() {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(writingModules[0].id);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // store all text inputs

  // For Drag and Drop: Store keys like `${moduleId}-${sectionIndex}-bench` (array)
  // and `${moduleId}-${sectionIndex}-sentence` (array)
  // Initialize ONLY on mount or when section changes if needed.

  const currentModule = writingModules.find((m) => m.id === selectedModule);
  const currentSection = currentModule.sections[currentSectionIndex];
  const totalSections = currentModule.sections.length;

  const API_URL = getApiBaseUrl();

  // Find module indices
  const moduleIndex = writingModules.findIndex(m => m.id === selectedModule);
  const isLastModule = moduleIndex === writingModules.length - 1;
  const isLastSection = currentSectionIndex === totalSections - 1;

  // Show Finish button only on last section of last module
  const showFinish = isLastModule && isLastSection;

  // --- Drag and Drop Initialization ---
  useEffect(() => {
    if (currentSection.type === "completeSentence") {
      const benchKey = `${selectedModule}-${currentSectionIndex}-bench`;
      const sentenceKey = `${selectedModule}-${currentSectionIndex}-sentence`;

      // If we haven't initialized this section's words yet, do it now.
      if (!userAnswers[benchKey] && !userAnswers[sentenceKey]) {
        // Shuffle words for the bench
        const shuffled = [...currentSection.words].sort(() => Math.random() - 0.5);

        setUserAnswers((prev) => ({
          ...prev,
          [benchKey]: shuffled,
          [sentenceKey]: [],
        }));
      }
    }
  }, [selectedModule, currentSectionIndex, currentSection, userAnswers]);


  const handleModuleChange = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentSectionIndex(0);
  };

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      // Move to next section within same module
      setCurrentSectionIndex(prev => prev + 1);
    } else if (!isLastModule) {
      // Move to next module's first section
      const nextModule = writingModules[moduleIndex + 1];
      setSelectedModule(nextModule.id);
      setCurrentSectionIndex(0);
    }
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      // Move to previous section within same module
      setCurrentSectionIndex(prev => prev - 1);
    } else if (moduleIndex > 0) {
      // Move to previous module's last section
      const prevModule = writingModules[moduleIndex - 1];
      setSelectedModule(prevModule.id);
      setCurrentSectionIndex(prevModule.sections.length - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleInputChange = (moduleId, sectionIndex, field, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [`${moduleId}-${sectionIndex}-${field}`]: value,
    }));
  };

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, word, source, index) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ word, source, index }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    const { word, source, index } = JSON.parse(data);

    if (source === target) return; // Dropping in same zone (reordering could be added here later)

    const benchKey = `${selectedModule}-${currentSectionIndex}-bench`;
    const sentenceKey = `${selectedModule}-${currentSectionIndex}-sentence`;

    const sourceKey = source === "bench" ? benchKey : sentenceKey;
    const targetKey = target === "bench" ? benchKey : sentenceKey;

    const sourceList = [...(userAnswers[sourceKey] || [])];
    const targetList = [...(userAnswers[targetKey] || [])];

    // Remove from source
    sourceList.splice(index, 1);
    // Add to target
    targetList.push(word);

    setUserAnswers((prev) => ({
      ...prev,
      [sourceKey]: sourceList,
      [targetKey]: targetList,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Click-to-move fallback/alternative
  const handleWordClick = (word, source, index) => {
    const benchKey = `${selectedModule}-${currentSectionIndex}-bench`;
    const sentenceKey = `${selectedModule}-${currentSectionIndex}-sentence`;

    const sourceKey = source === "bench" ? benchKey : sentenceKey;
    const targetKey = source === "bench" ? sentenceKey : benchKey; // Swap target

    const sourceList = [...(userAnswers[sourceKey] || [])];
    const targetList = [...(userAnswers[targetKey] || [])];

    // Remove from source
    sourceList.splice(index, 1);
    // Add to target
    targetList.push(word);

    setUserAnswers((prev) => ({
      ...prev,
      [sourceKey]: sourceList,
      [targetKey]: targetList,
    }));
  };


  // save result to backend
  const saveTestResult = async (scoredResult) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${API_URL}/tests/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          testName: "TOEFL Writing",
          result: scoredResult
        })
      });
      console.log("✅ TOEFL score saved!");
    } catch (err) {
      console.error("❌ Failed to save TOEFL score:", err);
    }
  };


  // Calculate total score across both modules
  const calculateTotalScore = () => {
    let correctCount = 0;
    let total = 0;

    writingModules.forEach((module) => {
      module.sections.forEach((section, sIdx) => {
        total++;

        if (section.type === "completeSentence") {
          const sentenceKey = `${module.id}-${sIdx}-sentence`;
          const constructedSentence = (userAnswers[sentenceKey] || []).join(" ");

          // Compare normalized strings
          const normalizedUser = constructedSentence.trim().toLowerCase().replace(/\s+/g, " ");
          const normalizedExpected = section.answer.trim().toLowerCase().replace(/\s+/g, " ");

          if (normalizedUser === normalizedExpected) {
            correctCount++;
          }
        } else {
          // For email/discussion, any non-empty response counts as correct
          const userAnswer = userAnswers[`${module.id}-${sIdx}-response`] || "";
          if (userAnswer.trim() !== "") {
            correctCount++;
          }
        }
      });
    });

    // Save Score
    const resultPayload = {
      score: correctCount,
      total: total,
      percentage: Math.round((correctCount / total) * 100) + "%"
    };
    saveTestResult(resultPayload);

    // Navigate to results page with score data
    navigate('/quiz/toefl/result', { state: { correctCount, total, testType: "Writing" } });
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 20px 40px", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "#19fd91", textAlign: "center", marginBottom: "2rem" }}>TOEFL Writing</h1>

      {/* Module selector */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        {writingModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => handleModuleChange(mod.id)}
            style={{
              padding: "0.5rem 1.5rem",
              background: selectedModule === mod.id ? "#19fd91" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {/* Current module & section info */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #233127", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>
            {currentModule.title}
          </h2>
          <span style={{ color: "#19fd91", fontWeight: "600" }}>
            Section {currentSectionIndex + 1} of {totalSections}
          </span>
        </div>

        {/* Main content card */}
        <div
          style={{
            background: "#111c17",
            border: "1px solid #233127",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
        >
          <h3 style={{ color: "#19fd91", marginBottom: "1.5rem", fontSize: "1.3rem" }}>
            {currentSection.type === "completeSentence"
              ? "Complete the Sentence"
              : currentSection.type === "email"
                ? "Write an Email"
                : "Academic Discussion"}
          </h3>

          {/* Two-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "start"
            }}
          >
            {/* Left column: prompt / instructions */}
            <div
              style={{
                background: "#0a140f",
                padding: "1.5rem",
                borderRadius: "12px",
                lineHeight: "1.8",
                fontSize: "1.05rem",
                border: "1px solid #233127",
                color: "#e0e0e0",
                maxHeight: "60vh",
                overflowY: "auto"
              }}
            >
              {currentSection.type === "completeSentence" ? (
                <>
                  <p><strong>{currentSection.question}</strong></p>
                  <p><strong>Template:</strong> {currentSection.template}</p>
                  <p style={{ marginTop: "1rem", color: "#b4bebd" }}>
                    *Drag words from the bank to the sentence box below to form a complete sentence.*
                  </p>
                </>
              ) : (
                <p style={{ whiteSpace: "pre-wrap" }}>{currentSection.prompt}</p>
              )}
            </div>

            {/* Right column: input area or Drag-and-Drop */}
            <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "10px" }}>
              {currentSection.type === "completeSentence" && (
                <div>
                  {/* Sentence Drop Zone */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#fff" }}>
                      Your Sentence:
                    </label>
                    <div
                      onDrop={(e) => handleDrop(e, "sentence")}
                      onDragOver={handleDragOver}
                      style={{
                        minHeight: "60px",
                        background: "#222",
                        border: "2px dashed #444",
                        borderRadius: "8px",
                        padding: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        alignItems: "center"
                      }}
                    >
                      {(userAnswers[`${selectedModule}-${currentSectionIndex}-sentence`] || []).length === 0 && (
                        <span style={{ color: "#555", fontStyle: "italic", marginLeft: "10px" }}>
                          Drop words here...
                        </span>
                      )}
                      {(userAnswers[`${selectedModule}-${currentSectionIndex}-sentence`] || []).map((word, idx) => (
                        <div
                          key={`${word}-${idx}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, word, "sentence", idx)}
                          onClick={() => handleWordClick(word, "sentence", idx)}
                          style={{
                            background: "#19fd91",
                            color: "#000",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            cursor: "grab",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            userSelect: "none"
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Word Bank */}
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#b4bebd" }}>
                      Word Bank:
                    </label>
                    <div
                      onDrop={(e) => handleDrop(e, "bench")}
                      onDragOver={handleDragOver}
                      style={{
                        minHeight: "100px",
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        padding: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        alignItems: "flex-start"
                      }}
                    >
                      {(userAnswers[`${selectedModule}-${currentSectionIndex}-bench`] || []).map((word, idx) => (
                        <div
                          key={`${word}-${idx}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, word, "bench", idx)}
                          onClick={() => handleWordClick(word, "bench", idx)}
                          style={{
                            background: "#333",
                            color: "#e0e0e0",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            cursor: "grab",
                            border: "1px solid #555",
                            fontSize: "0.9rem",
                            userSelect: "none"
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(currentSection.type === "email" || currentSection.type === "discussion") && (
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#fff" }}>
                    Your response:
                  </label>
                  <textarea
                    rows="10"
                    value={userAnswers[`${selectedModule}-${currentSectionIndex}-response`] || ""}
                    onChange={(e) => handleInputChange(selectedModule, currentSectionIndex, "response", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "#222",
                      border: "1px solid #444",
                      color: "#fff",
                      borderRadius: "6px",
                      fontFamily: "inherit",
                      marginBottom: "1rem",
                    }}
                    placeholder="Write your answer here..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>
          <button
            onClick={handlePrev}
            disabled={moduleIndex === 0 && currentSectionIndex === 0}
            style={{
              padding: "0.8rem 2rem",
              background: moduleIndex === 0 && currentSectionIndex === 0 ? "#1a1a1a" : "#333",
              color: moduleIndex === 0 && currentSectionIndex === 0 ? "#555" : "#fff",
              border: "none",
              borderRadius: "50px",
              cursor: moduleIndex === 0 && currentSectionIndex === 0 ? "not-allowed" : "pointer",
              fontWeight: "600"
            }}
          >
            Previous
          </button>

          {!showFinish ? (
            <button
              onClick={handleNext}
              style={{
                padding: "0.8rem 2rem",
                background: "#19fd91",
                color: "#000",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              Next Section
            </button>
          ) : (
            <button
              onClick={calculateTotalScore}
              style={{
                padding: "0.8rem 2rem",
                background: "#19fd91",
                color: "#000",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Finish & Check Score
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            onClick={() => navigate("/tests")}
            style={{
              background: "transparent",
              color: "#b4bebd",
              border: "1px solid #444",
              padding: "0.5rem 1.5rem",
              fontSize: "0.9rem",
              borderRadius: "30px",
              cursor: "pointer",
            }}
          >
            Exit Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToeflWriting;