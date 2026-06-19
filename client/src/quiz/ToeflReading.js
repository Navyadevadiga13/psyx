import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api";

// --- PBT READING DATA (5 passages, 5 questions each = 25 questions) ---
const readingModules = [
  {
    id: "pbtReading",
    title: "TOEFL Reading Test",
    sections: [
      // Passage 1: Photosynthesis (5 questions)
      {
        id: "passage1",
        type: "academic",
        title: "Photosynthesis",
        passage: `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by‑product. It is critical for life on Earth because it produces the oxygen we breathe and forms the base of most food chains. The process occurs in the chloroplasts, specifically in structures called thylakoids. The light energy is used to split water molecules, releasing oxygen. The hydrogen from water then combines with carbon dioxide to form glucose.`,
        questions: [
          {
            id: 1,
            question: "What is the main topic of the passage?",
            options: [
              "Plant reproduction",
              "Photosynthesis",
              "Cellular respiration",
              "Plant genetics"
            ],
            correct: 1
          },
          {
            id: 2,
            question: "According to the passage, where does photosynthesis occur within a plant cell?",
            options: [
              "In the nucleus",
              "In the mitochondria",
              "In the chloroplasts",
              "In the cell wall"
            ],
            correct: 2
          },
          {
            id: 3,
            question: "What is released as a by‑product of photosynthesis?",
            options: [
              "Carbon dioxide",
              "Glucose",
              "Oxygen",
              "Hydrogen"
            ],
            correct: 2
          },
          {
            id: 4,
            question: "The word 'synthesize' in line 1 is closest in meaning to...",
            options: [
              "separate",
              "create",
              "destroy",
              "analyze"
            ],
            correct: 1
          },
          {
            id: 5,
            question: "Why is photosynthesis described as 'critical for life on Earth'?",
            options: [
              "It produces carbon dioxide for plants.",
              "It creates food and oxygen for other organisms.",
              "It regulates global temperatures.",
              "It prevents soil erosion."
            ],
            correct: 1
          }
        ]
      },
      // Passage 2: The Industrial Revolution (5 questions)
      {
        id: "passage2",
        type: "academic",
        title: "The Industrial Revolution",
        passage: `The Industrial Revolution was a period of major industrialization that took place during the late 1700s and early 1800s. It began in Great Britain and quickly spread throughout the world. This time period saw the mechanization of agriculture and textile manufacturing, and a revolution in power, including steam ships and railroads, that affected social, cultural and economic conditions. Factories emerged, leading to urbanization as people moved to cities for work. Working conditions were often harsh, prompting the rise of labor movements.`,
        questions: [
          {
            id: 6,
            question: "Where did the Industrial Revolution begin?",
            options: [
              "United States",
              "France",
              "Great Britain",
              "Germany"
            ],
            correct: 2
          },
          {
            id: 7,
            question: "Which of the following was NOT mentioned as being mechanized?",
            options: [
              "Agriculture",
              "Textile manufacturing",
              "Computer programming",
              "Transportation"
            ],
            correct: 2
          },
          {
            id: 8,
            question: "The word 'urbanization' in line 5 is closest in meaning to...",
            options: [
              "movement to rural areas",
              "growth of cities",
              "population decline",
              "industrial decline"
            ],
            correct: 1
          },
          {
            id: 9,
            question: "According to the passage, what contributed to the rise of labor movements?",
            options: [
              "Improved working conditions",
              "Harsh working conditions",
              "Government regulations",
              "Technological advances"
            ],
            correct: 1
          },
          {
            id: 10,
            question: "What is the main idea of the passage?",
            options: [
              "The Industrial Revolution had only positive effects.",
              "The Industrial Revolution brought major changes to society and the economy.",
              "The Industrial Revolution began in the United States.",
              "The Industrial Revolution ended in the 1700s."
            ],
            correct: 1
          }
        ]
      },
      // Passage 3: The Solar System (5 questions)
      {
        id: "passage3",
        type: "academic",
        title: "The Solar System",
        passage: `The Solar System consists of the Sun and the objects that orbit it, including eight planets, their moons, and various smaller bodies like asteroids and comets. The four inner planets—Mercury, Venus, Earth, and Mars—are rocky and relatively small. The outer planets—Jupiter, Saturn, Uranus, and Neptune—are gas giants, much larger and composed mainly of hydrogen and helium. The Sun contains 99.8% of the Solar System's mass, exerting gravitational pull that keeps everything in orbit.`,
        questions: [
          {
            id: 11,
            question: "What percentage of the Solar System's mass is contained in the Sun?",
            options: [
              "90%",
              "95%",
              "99.8%",
              "100%"
            ],
            correct: 2
          },
          {
            id: 12,
            question: "Which planets are described as 'gas giants'?",
            options: [
              "Mercury, Venus, Earth, Mars",
              "Jupiter, Saturn, Uranus, Neptune",
              "Mars, Jupiter, Saturn, Uranus",
              "Earth, Mars, Jupiter, Saturn"
            ],
            correct: 1
          },
          {
            id: 13,
            question: "The word 'exerting' in line 5 is closest in meaning to...",
            options: [
              "releasing",
              "applying",
              "reducing",
              "avoiding"
            ],
            correct: 1
          },
          {
            id: 14,
            question: "What keeps the planets in orbit around the Sun?",
            options: [
              "Solar wind",
              "Magnetic fields",
              "Gravitational pull",
              "Atmospheric pressure"
            ],
            correct: 2
          },
          {
            id: 15,
            question: "According to the passage, which planets are rocky and small?",
            options: [
              "The outer planets",
              "The inner planets",
              "All planets",
              "Only Earth and Mars"
            ],
            correct: 1
          }
        ]
      },
      // Passage 4: The Great Wall of China (5 questions)
      {
        id: "passage4",
        type: "academic",
        title: "The Great Wall of China",
        passage: `The Great Wall of China is a series of fortifications built across the northern borders of China to protect against invasions. Construction began as early as the 7th century BC, but the most famous sections were built during the Ming Dynasty (1368–1644). The wall stretches over 13,000 miles, though not continuously. It was built using various materials, including earth, wood, and stone. Thousands of workers, including soldiers and peasants, labored on its construction.`,
        questions: [
          {
            id: 16,
            question: "What was the primary purpose of the Great Wall?",
            options: [
              "Trade route",
              "Defense against invasions",
              "Religious pilgrimage",
              "Agricultural boundary"
            ],
            correct: 1
          },
          {
            id: 17,
            question: "During which dynasty were the most famous sections built?",
            options: [
              "Qin Dynasty",
              "Ming Dynasty",
              "Tang Dynasty",
              "Song Dynasty"
            ],
            correct: 1
          },
          {
            id: 18,
            question: "The word 'fortifications' in line 1 is closest in meaning to...",
            options: [
              "palaces",
              "defensive structures",
              "temples",
              "bridges"
            ],
            correct: 1
          },
          {
            id: 19,
            question: "Approximately how long is the Great Wall?",
            options: [
              "5,000 miles",
              "10,000 miles",
              "13,000 miles",
              "20,000 miles"
            ],
            correct: 2
          },
          {
            id: 20,
            question: "Who built the Great Wall?",
            options: [
              "Only soldiers",
              "Only peasants",
              "Soldiers, peasants, and others",
              "Foreign laborers"
            ],
            correct: 2
          }
        ]
      },
      // Passage 5: The Amazon Rainforest (5 questions)
      {
        id: "passage5",
        type: "academic",
        title: "The Amazon Rainforest",
        passage: `The Amazon Rainforest is the largest tropical rainforest in the world, covering much of northwestern Brazil and extending into Colombia, Peru, and other South American countries. It is home to an immense biodiversity, including millions of species of insects, plants, birds, and mammals. The rainforest plays a critical role in regulating the global climate by absorbing carbon dioxide and producing oxygen. However, deforestation for agriculture and logging poses a serious threat to this ecosystem.`,
        questions: [
          {
            id: 21,
            question: "Where is the Amazon Rainforest primarily located?",
            options: [
              "Africa",
              "Southeast Asia",
              "South America",
              "Central America"
            ],
            correct: 2
          },
          {
            id: 22,
            question: "What is the main threat to the Amazon Rainforest mentioned in the passage?",
            options: [
              "Climate change",
              "Deforestation",
              "Urbanization",
              "Pollution"
            ],
            correct: 1
          },
          {
            id: 23,
            question: "The word 'immense' in line 3 is closest in meaning to...",
            options: [
              "small",
              "limited",
              "huge",
              "unknown"
            ],
            correct: 2
          },
          {
            id: 24,
            question: "According to the passage, what role does the Amazon play in the global climate?",
            options: [
              "It releases carbon dioxide.",
              "It absorbs carbon dioxide and produces oxygen.",
              "It increases global temperatures.",
              "It has no effect on climate."
            ],
            correct: 1
          },
          {
            id: 25,
            question: "What is the main idea of the passage?",
            options: [
              "The Amazon has many species of insects.",
              "The Amazon is important for biodiversity and climate, but is threatened.",
              "The Amazon is located only in Brazil.",
              "The Amazon produces most of the world's oxygen."
            ],
            correct: 1
          }
        ]
      }
    ]
  }
];

function ToeflReading() {
  const navigate = useNavigate();
  // Since we only have one module now, we can simplify but keep modular structure
  const [selectedModule] = useState(readingModules[0].id);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [mcAnswers, setMcAnswers] = useState({});

  const currentModule = readingModules.find((m) => m.id === selectedModule);
  const currentSection = currentModule.sections[currentSectionIndex];
  const totalSections = currentModule.sections.length;
  const isLastSection = currentSectionIndex === totalSections - 1;

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleMcChange = (sectionIndex, qId, value) => {
    setMcAnswers((prev) => ({
      ...prev,
      [`${sectionIndex}-${qId}`]: value,
    }));
  };
function convertToToeflScore(correct) {

  if (correct >= 25) return 30;
  if (correct >= 23) return 29;
  if (correct >= 21) return 28;
  if (correct >= 19) return 26;
  if (correct >= 17) return 24;
  if (correct >= 15) return 22;
  if (correct >= 13) return 20;
  if (correct >= 10) return 17;
  if (correct >= 7) return 14;

  return 10;
}
const calculateTotalScore = async () => {

  let correctCount = 0;
  let total = 0;

  currentModule.sections.forEach((section, sIdx) => {
    section.questions.forEach((q) => {
      total++;
const userAnswer = mcAnswers[`${sIdx}-${q.id}`];


      if (parseInt(userAnswer) === q.correct) {
        correctCount++;
      }
    });
  });

  const percentage = Math.round((correctCount / total) * 100);
const toeflScore = convertToToeflScore(correctCount);
  const API_URL = getApiBaseUrl();
  const token = localStorage.getItem("token");

  try {

    const response = await fetch(`${API_URL}/tests/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        testName: "TOEFL Reading Test",
       result: {
  rawScore: correctCount,
  total: total,
  percentage: percentage,
  toeflScore: toeflScore
}
      })
    });

    const savedData = await response.json();

    if (!response.ok) {
      console.error("❌ Failed to save:", savedData);
      alert("Failed to save result.");
      return;
    }

    console.log("✅ TOEFL result saved:", savedData);

    navigate('/quiz/toefl/result', {
state: { correctCount, total, toeflScore, testType: "Reading (PBT)" }
    });

  } catch (error) {
    console.error("Error saving TOEFL result:", error);
  }

};

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 20px 40px", minHeight: "100vh", background: "#0a140f", color: "#fff" }}>
      <h1 style={{ color: "#19fd91", textAlign: "center", marginBottom: "2rem" }}>TOEFL Reading (PBT Format)</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #233127", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
          Passage {currentSectionIndex + 1} of {totalSections}: {currentSection.title}
        </h2>
        <span style={{ color: "#19fd91", fontWeight: "600" }}>
          Questions {currentSection.questions[0].id}–{currentSection.questions[currentSection.questions.length-1].id}
        </span>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Left: Passage */}
        <div style={{ background: "#111c17", border: "1px solid #233127", borderRadius: "20px", padding: "2rem", height: "70vh", overflowY: "auto" }}>
          <div style={{ lineHeight: "1.8", fontSize: "1rem", color: "#e0e0e0", whiteSpace: "pre-wrap" }}>
            {currentSection.passage}
          </div>
        </div>

        {/* Right: Questions */}
        <div style={{ background: "#111c17", border: "1px solid #233127", borderRadius: "20px", padding: "2rem", height: "70vh", overflowY: "auto" }}>
          <h3 style={{ color: "#19fd91", marginBottom: "1.5rem" }}>Questions</h3>
          {currentSection.questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "2.5rem", borderBottom: "1px solid #233127", paddingBottom: "1.5rem" }}>
              <p style={{ fontWeight: "bold", marginBottom: "1rem", color: "#fff", fontSize: "1.1rem" }}>
                {q.id}. {q.question}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.8rem 1rem",
                      borderRadius: "10px",
                      background: mcAnswers[`${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "rgba(25, 253, 145, 0.1)" : "rgba(255,255,255,0.03)",
                      border: mcAnswers[`${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "1px solid #19fd91" : "1px solid transparent",
                      transition: "all 0.2s"
                    }}
                  >
                    <input
                      type="radio"
                      name={`q-${currentSectionIndex}-${q.id}`}
                      value={optIdx}
                      checked={mcAnswers[`${currentSectionIndex}-${q.id}`] === optIdx.toString()}
                      onChange={(e) => handleMcChange(currentSectionIndex, q.id, e.target.value)}
                      style={{ accentColor: "#19fd91", width: "18px", height: "18px" }}
                    />
                    <span style={{ color: "#e0e0e0" }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>
        <button
          onClick={handlePrev}
          disabled={currentSectionIndex === 0}
          style={{
            padding: "0.8rem 2rem",
            background: currentSectionIndex === 0 ? "#1a1a1a" : "#333",
            color: currentSectionIndex === 0 ? "#555" : "#fff",
            border: "none",
            borderRadius: "50px",
            cursor: currentSectionIndex === 0 ? "not-allowed" : "pointer",
            fontWeight: "600"
          }}
        >
          Previous Passage
        </button>

        {!isLastSection ? (
          <button
            onClick={handleNext}
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
            Next Passage
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
  );
}

export default ToeflReading;
