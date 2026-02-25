// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const readingModules = [
//   {
//     id: "moduleA",
//     title: "Reading Practice – Module A (2026 Format)",
//     sections: [
//       {
//         id: "sec1",
//         type: "completeWords",
//         passage: "The octopus is a f_scinat_ng creature found in the o_ean. It has eight a_ms and can c_ange color to b_end in with its surrou_dings. Intelligent and m_sterious, it uses ink to esc_pe from pr_dators.",
//         blanks: [
//           { id: 1, answer: "a" },
//           { id: 2, answer: "i" },
//           { id: 3, answer: "c" },
//           { id: 4, answer: "r" },
//           { id: 5, answer: "h" },
//           { id: 6, answer: "l" },
//           { id: 7, answer: "n" },
//           { id: 8, answer: "y" },
//           { id: 9, answer: "a" },
//           { id: 10, answer: "e" }
//         ]
//       },
//       {
//         id: "sec2",
//         type: "dailyLife",
//         passage: "Notice to All Residents:\n\nThe community pool will be closed for maintenance next Tuesday, July 15th, from 8:00 AM to 5:00 PM. We apologize for the inconvenience. Chemicals will be treated, so please keep pets away from the pool area.\n\nThank you,\nManagement",
//         questions: [
//           {
//             id: 1,
//             question: "When will the pool be closed?",
//             options: ["Monday all day", "Tuesday from 8 AM to 5 PM", "Wednesday afternoon", "The whole week"],
//             correct: 1
//           },
//           {
//             id: 2,
//             question: "Why is the pool closing?",
//             options: ["For a pool party", "Due to bad weather", "For maintenance", "Not mentioned"],
//             correct: 2
//           }
//         ]
//       },
//       {
//         id: "sec3",
//         type: "academic",
//         passage: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by-product. It is critical for life on Earth as it produces the oxygen we breathe and the food base for all ecosystems.",
//         questions: [
//           {
//             id: 1,
//             question: "What is a by-product of photosynthesis?",
//             options: ["Carbon dioxide", "Water", "Oxygen", "Sunlight"],
//             correct: 2
//           },
//           {
//             id: 2,
//             question: "What pigment is involved in photosynthesis?",
//             options: ["Melanin", "Chlorophyll", "Hemoglobin", "Carotene"],
//             correct: 1
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: "moduleB",
//     title: "Reading Practice – Module B (2026 Format)",
//     sections: [
//       {
//         id: "sec1",
//         type: "completeWords",
//         passage: "Global w_rming is a s_rious enviro_mental iss_e. It c_uses r_sing s_a levels and ext_eme w_ather ev_nts. Reduc_ng c_rbon emissi_ns is key to solv_ng this pr_blem.",
//         blanks: [
//           { id: 1, answer: "a" },
//           { id: 2, answer: "e" },
//           { id: 3, answer: "n" },
//           { id: 4, answer: "u" },
//           { id: 5, answer: "a" },
//           { id: 6, answer: "i" },
//           { id: 7, answer: "e" },
//           { id: 8, answer: "r" },
//           { id: 9, answer: "e" },
//           { id: 10, answer: "e" }
//         ]
//       },
//       {
//         id: "sec2",
//         type: "dailyLife",
//         passage: "Email Subject: Meeting Reschedule\n\nHi Team,\n\nThe project review meeting scheduled for Monday at 10 AM is moved to Wednesday at 2 PM in Conference Room B. Please bring your updated reports.\n\nBest,\nSarah",
//         questions: [
//           {
//             id: 1,
//             question: "What is the new time for the meeting?",
//             options: ["Monday 10 AM", "Wednesday 10 AM", "Wednesday 2 PM", "Friday 2 PM"],
//             correct: 2
//           },
//           {
//             id: 2,
//             question: "Where will the meeting be held?",
//             options: ["Conference Room A", "Conference Room B", "Online", "Sarah's Office"],
//             correct: 1
//           }
//         ]
//       },
//       {
//         id: "sec3",
//         type: "academic",
//         passage: "The Industrial Revolution was a period of major industrialization that took place during the late 1700s and early 1800s. It began in Great Britain and quickly spread throughout the world. This time period saw the mechanization of agriculture and textile manufacturing and a revolution in power, including steam ships and railroads, that effected social, cultural and economic conditions.",
//         questions: [
//           {
//             id: 1,
//             question: "Where did the Industrial Revolution begin?",
//             options: ["United States", "France", "Great Britain", "Germany"],
//             correct: 2
//           },
//           {
//             id: 2,
//             question: "Which of the following was NOT mentioned as being mechanized?",
//             options: ["Agriculture", "Textile manufacturing", "Computer programming", "Transportation"],
//             correct: 2
//           }
//         ]
//       }
//     ]
//   }
// ];

// function ToeflReading() {
//   const navigate = useNavigate();
//   const [selectedModule, setSelectedModule] = useState(readingModules[0].id);
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

//   // State keys now include moduleId to keep answers separate
//   const [blankAnswers, setBlankAnswers] = useState({});
//   const [mcAnswers, setMcAnswers] = useState({});

//   const currentModule = readingModules.find((m) => m.id === selectedModule);
//   const currentSection = currentModule.sections[currentSectionIndex];
//   const totalSections = currentModule.sections.length;

//   const handleModuleChange = (moduleId) => {
//     setSelectedModule(moduleId);
//     setCurrentSectionIndex(0); // Reset to first question when module changes
//   };

//   const handleNext = () => {
//     if (currentSectionIndex < totalSections - 1) {
//       setCurrentSectionIndex(prev => prev + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const handlePrev = () => {
//     if (currentSectionIndex > 0) {
//       setCurrentSectionIndex(prev => prev - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const handleBlankChange = (moduleId, sectionIndex, blankId, value) => {
//     setBlankAnswers((prev) => ({
//       ...prev,
//       [`${moduleId}-${sectionIndex}-${blankId}`]: value,
//     }));
//   };

//   const handleMcChange = (moduleId, sectionIndex, qId, value) => {
//     setMcAnswers((prev) => ({
//       ...prev,
//       [`${moduleId}-${sectionIndex}-${qId}`]: value,
//     }));
//   };

//   // Calculate total score across both modules
//   const calculateTotalScore = () => {
//     let correctCount = 0;
//     let total = 0;

//     readingModules.forEach((module) => {
//       module.sections.forEach((section, sIdx) => {
//         if (section.type === "completeWords") {
//           section.blanks.forEach((blank) => {
//             total++;
//             const userAnswer = blankAnswers[`${module.id}-${sIdx}-${blank.id}`] || "";
//             if (userAnswer.trim().toLowerCase() === blank.answer.toLowerCase()) {
//               correctCount++;
//             }
//           });
//         } else {
//           section.questions.forEach((q) => {
//             total++;
//             const userAnswer = mcAnswers[`${module.id}-${sIdx}-${q.id}`];
//             if (parseInt(userAnswer) === q.correct) {
//               correctCount++;
//             }
//           });
//         }
//       });
//     });

//     alert(`You got ${correctCount} out of ${total} correct overall.`);
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "120px 20px 40px", minHeight: "100vh" }}>
//       <h1 style={{ color: "#19fd91", textAlign: "center", marginBottom: "2rem" }}>TOEFL Reading (2026 Format)</h1>

//       {/* Module selector */}
//       <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
//         {readingModules.map((mod) => (
//           <button
//             key={mod.id}
//             onClick={() => handleModuleChange(mod.id)}
//             style={{
//               padding: "0.5rem 1.5rem",
//               background: selectedModule === mod.id ? "#19fd91" : "#1a2a20",
//               color: selectedModule === mod.id ? "#000" : "#fff",
//               border: "1px solid #19fd91",
//               borderRadius: "30px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             {mod.title}
//           </button>
//         ))}
//       </div>

//       {/* Current module & Section */}
//       <div>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #233127", paddingBottom: "1rem", marginBottom: "2rem" }}>
//           <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>
//             {currentModule.title}
//           </h2>
//           <span style={{ color: "#19fd91", fontWeight: "600" }}>
//             Section {currentSectionIndex + 1} of {totalSections}
//           </span>
//         </div>

//         <div
//           style={{
//             background: "#111c17",
//             border: "1px solid #233127",
//             borderRadius: "20px",
//             padding: "2rem",
//             marginBottom: "2rem",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//           }}
//         >
//           <h3 style={{ color: "#19fd91", marginBottom: "1.5rem", fontSize: "1.3rem" }}>
//             {currentSection.type === "completeWords"
//               ? "Complete the Words"
//               : currentSection.type === "dailyLife"
//                 ? "Read in Daily Life"
//                 : "Academic Reading"}
//           </h3>

//           {/* Passage */}
//           <div
//             style={{
//               background: "#0a140f",
//               padding: "1.5rem",
//               borderRadius: "12px",
//               marginBottom: "2rem",
//               lineHeight: "1.8",
//               fontSize: "1.05rem",
//               border: "1px solid #233127",
//               color: "#e0e0e0"
//             }}
//           >
//             <p>{currentSection.passage}</p>
//           </div>

//           {/* Questions */}
//           {currentSection.type === "completeWords" && (
//             <div>
//               <p style={{ fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>
//                 Fill in the missing words:
//               </p>
//               <div style={{ display: "grid", gap: "1rem" }}>
//                 {currentSection.blanks.map((blank) => (
//                   <div key={blank.id} style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
//                     <label style={{ color: "#b4bebd", minWidth: "80px" }}>
//                       Word {blank.id}:
//                     </label>
//                     <input
//                       type="text"
//                       value={blankAnswers[`${currentModule.id}-${currentSectionIndex}-${blank.id}`] || ""}
//                       onChange={(e) =>
//                         handleBlankChange(currentModule.id, currentSectionIndex, blank.id, e.target.value)
//                       }
//                       style={{
//                         flex: 1,
//                         padding: "0.8rem",
//                         background: "#1a2a20",
//                         border: "1px solid #233127",
//                         color: "#fff",
//                         borderRadius: "8px",
//                         outline: "none"
//                       }}
//                       placeholder="Type answer here..."
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {(currentSection.type === "dailyLife" || currentSection.type === "academic") && (
//             <div>
//               {currentSection.questions.map((q) => (
//                 <div key={q.id} style={{ marginBottom: "2rem" }}>
//                   <p style={{ fontWeight: "bold", marginBottom: "1rem", color: "#fff", fontSize: "1.1rem" }}>
//                     {q.id}. {q.question}
//                   </p>
//                   <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
//                     {q.options.map((opt, optIdx) => (
//                       <label
//                         key={optIdx}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "10px",
//                           cursor: "pointer",
//                           padding: "1rem",
//                           borderRadius: "10px",
//                           background: mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "rgba(25, 253, 145, 0.1)" : "rgba(255,255,255,0.03)",
//                           border: mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "1px solid #19fd91" : "1px solid transparent",
//                           transition: "all 0.2s"
//                         }}
//                       >
//                         <input
//                           type="radio"
//                           name={`q-${currentModule.id}-${currentSectionIndex}-${q.id}`}
//                           value={optIdx}
//                           checked={mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString()}
//                           onChange={(e) =>
//                             handleMcChange(currentModule.id, currentSectionIndex, q.id, e.target.value)
//                           }
//                           style={{ accentColor: "#19fd91" }}
//                         />
//                         <span style={{ color: "#e0e0e0" }}>{opt}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Navigation Controls */}
//         <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>

//           <button
//             onClick={handlePrev}
//             disabled={currentSectionIndex === 0}
//             style={{
//               padding: "0.8rem 2rem",
//               background: currentSectionIndex === 0 ? "#1a1a1a" : "#333",
//               color: currentSectionIndex === 0 ? "#555" : "#fff",
//               border: "none",
//               borderRadius: "50px",
//               cursor: currentSectionIndex === 0 ? "not-allowed" : "pointer",
//               fontWeight: "600"
//             }}
//           >
//             Previous
//           </button>

//           {currentSectionIndex < totalSections - 1 ? (
//             <button
//               onClick={handleNext}
//               style={{
//                 padding: "0.8rem 2rem",
//                 background: "#19fd91",
//                 color: "#000",
//                 border: "none",
//                 borderRadius: "50px",
//                 cursor: "pointer",
//                 fontWeight: "600",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem"
//               }}
//             >
//               Next Section
//             </button>
//           ) : (
//             <button
//               onClick={calculateTotalScore}
//               style={{
//                 padding: "0.8rem 2rem",
//                 background: "#19fd91",
//                 color: "#000",
//                 border: "none",
//                 borderRadius: "50px",
//                 cursor: "pointer",
//                 fontWeight: "600"
//               }}
//             >
//               Finish & Check Score
//             </button>
//           )}

//         </div>

//         <div style={{ textAlign: "center", marginTop: "3rem" }}>
//           <button
//             onClick={() => navigate("/tests")}
//             style={{
//               background: "transparent",
//               color: "#b4bebd",
//               border: "1px solid #444",
//               padding: "0.5rem 1.5rem",
//               fontSize: "0.9rem",
//               borderRadius: "30px",
//               cursor: "pointer",
//             }}
//           >
//             Exit Test
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ToeflReading;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api"; 


const readingModules = [
  {
    id: "moduleA",
    title: "Reading Practice – Module A",
    sections: [
      {
        id: "sec1",
        type: "completeWords",
        passage:
          "The octopus is a [blank1] creature found in the [blank2]. It has eight [blank3] and can [blank4] color to [blank5] in with its surroundings. Intelligent and [blank6], it uses ink to [blank7] from [blank8]. It is also known for its remarkable [blank9] and [blank10].",
        blanks: [
          { id: 1, answer: "fascinating" },
          { id: 2, answer: "ocean" },
          { id: 3, answer: "arms" },
          { id: 4, answer: "change" },
          { id: 5, answer: "blend" },
          { id: 6, answer: "mysterious" },
          { id: 7, answer: "escape" },
          { id: 8, answer: "predators" },
          { id: 9, answer: "intelligence" },
          { id: 10, answer: "adaptability" }
        ]
      },
      {
        id: "sec2",
        type: "dailyLife",
        passage: "Notice to All Residents:\n\nThe community pool will be closed for maintenance next Tuesday, July 15th, from 8:00 AM to 5:00 PM. We apologize for the inconvenience. Chemicals will be treated, so please keep pets away from the pool area.\n\nThank you,\nManagement",
        questions: [
          {
            id: 1,
            question: "When will the pool be closed?",
            options: ["Monday all day", "Tuesday from 8 AM to 5 PM", "Wednesday afternoon", "The whole week"],
            correct: 1
          },
          {
            id: 2,
            question: "Why is the pool closing?",
            options: ["For a pool party", "Due to bad weather", "For maintenance", "Not mentioned"],
            correct: 2
          },
          {
            id: 3,
            question: "What should be kept away from the pool area?",
            options: ["Children", "Pets", "Chemicals", "Furniture"],
            correct: 1
          },
          {
            id: 4,
            question: "Who issued this notice?",
            options: ["The lifeguard", "The residents", "Management", "The city"],
            correct: 2
          },
          {
            id: 5,
            question: "What will be treated with chemicals?",
            options: ["The pool", "The pets", "The notice", "The residents"],
            correct: 0
          }
        ]
      },
      {
        id: "sec3",
        type: "academic",
        passage: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by-product. It is critical for life on Earth as it produces the oxygen we breathe and the food base for all ecosystems.",
        questions: [
          {
            id: 1,
            question: "What is a by-product of photosynthesis?",
            options: ["Carbon dioxide", "Water", "Oxygen", "Sunlight"],
            correct: 2
          },
          {
            id: 2,
            question: "What pigment is involved in photosynthesis?",
            options: ["Melanin", "Chlorophyll", "Hemoglobin", "Carotene"],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: "moduleB",
    title: "Reading Practice – Module B ",
    sections: [
      {
        id: "sec1",
        type: "completeWords",
        passage:
          "Global [blank1] is a [blank2] environmental [blank3]. It [blank4] rising sea levels and extreme [blank5] events. Reducing [blank6] emissions is key to solving this [blank7]. Many [blank8] are working together to find [blank9] and create a [blank10] future.",
        blanks: [
          { id: 1, answer: "warming" },
          { id: 2, answer: "serious" },
          { id: 3, answer: "issue" },
          { id: 4, answer: "causes" },
          { id: 5, answer: "weather" },
          { id: 6, answer: "carbon" },
          { id: 7, answer: "problem" },
          { id: 8, answer: "countries" },
          { id: 9, answer: "solutions" },
          { id: 10, answer: "sustainable" }
        ]
      },
      {
        id: "sec2",
        type: "dailyLife",
        passage: "Email Subject: Meeting Reschedule\n\nHi Team,\n\nThe project review meeting scheduled for Monday at 10 AM is moved to Wednesday at 2 PM in Conference Room B. Please bring your updated reports.\n\nBest,\nSarah",
        questions: [
          {
            id: 1,
            question: "What is the new time for the meeting?",
            options: ["Monday 10 AM", "Wednesday 10 AM", "Wednesday 2 PM", "Friday 2 PM"],
            correct: 2
          },
          {
            id: 2,
            question: "Where will the meeting be held?",
            options: ["Conference Room A", "Conference Room B", "Online", "Sarah's Office"],
            correct: 1
          },
          {
            id: 3,
            question: "What was the original day and time of the meeting?",
            options: ["Monday at 10 AM", "Wednesday at 2 PM", "Friday at 3 PM", "Tuesday at 11 AM"],
            correct: 0
          },
          {
            id: 4,
            question: "What should team members bring to the meeting?",
            options: ["Laptops", "Updated reports", "Coffee", "Nothing"],
            correct: 1
          },
          {
            id: 5,
            question: "Who is the sender of the email?",
            options: ["The manager", "Sarah", "The team lead", "HR"],
            correct: 1
          }
        ]
      },
      {
        id: "sec3",
        type: "academic",
        passage: "The Industrial Revolution was a period of major industrialization that took place during the late 1700s and early 1800s. It began in Great Britain and quickly spread throughout the world. This time period saw the mechanization of agriculture and textile manufacturing and a revolution in power, including steam ships and railroads, that effected social, cultural and economic conditions.",
        questions: [
          {
            id: 1,
            question: "Where did the Industrial Revolution begin?",
            options: ["United States", "France", "Great Britain", "Germany"],
            correct: 2
          },
          {
            id: 2,
            question: "Which of the following was NOT mentioned as being mechanized?",
            options: ["Agriculture", "Textile manufacturing", "Computer programming", "Transportation"],
            correct: 2
          }
        ]
      }
    ]
  }
];

// Helper to render passage with inline inputs for [blankX] placeholders
const renderPassageWithInputs = (passage, blanks, moduleId, sectionIndex, blankAnswers, handleBlankChange) => {
  const parts = passage.split(/(\[blank\d+\])/g);
  return parts.map((part, idx) => {
    const match = part.match(/\[blank(\d+)\]/);
    if (match) {
      const blankId = parseInt(match[1], 10);
      const blank = blanks.find(b => b.id === blankId);
      if (!blank) return part;
      return (
        <input
          key={idx}
          type="text"
          value={blankAnswers[`${moduleId}-${sectionIndex}-${blankId}`] || ""}
          onChange={(e) => handleBlankChange(moduleId, sectionIndex, blankId, e.target.value)}
          style={{
            display: "inline-block",
            width: "120px",
            margin: "0 4px",
            padding: "4px 8px",
            background: "#1a2a20",
            border: "1px solid #233127",
            color: "#fff",
            borderRadius: "4px",
            outline: "none",
            fontSize: "1rem"
          }}
          placeholder="type word"
        />
      );
    }
    return <span key={idx}>{part}</span>;
  });
};

function ToeflReading() {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(readingModules[0].id);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [blankAnswers, setBlankAnswers] = useState({});
  const [mcAnswers, setMcAnswers] = useState({});

  const currentModule = readingModules.find((m) => m.id === selectedModule);
  const currentSection = currentModule.sections[currentSectionIndex];
  const totalSections = currentModule.sections.length;

  // Find module indices for navigation
  const moduleIndex = readingModules.findIndex(m => m.id === selectedModule);
  const isLastModule = moduleIndex === readingModules.length - 1;
  const isLastSection = currentSectionIndex === totalSections - 1;
  const showFinish = isLastModule && isLastSection;

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
      const nextModule = readingModules[moduleIndex + 1];
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
      const prevModule = readingModules[moduleIndex - 1];
      setSelectedModule(prevModule.id);
      setCurrentSectionIndex(prevModule.sections.length - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleBlankChange = (moduleId, sectionIndex, blankId, value) => {
    setBlankAnswers((prev) => ({
      ...prev,
      [`${moduleId}-${sectionIndex}-${blankId}`]: value,
    }));
  };

  const handleMcChange = (moduleId, sectionIndex, qId, value) => {
    setMcAnswers((prev) => ({
      ...prev,
      [`${moduleId}-${sectionIndex}-${qId}`]: value,
    }));
  };


  const calculateTotalScore = () => {
    let correctCount = 0;
    let total = 0;

    readingModules.forEach((module) => {
      module.sections.forEach((section, sIdx) => {
        if (section.type === "completeWords") {
          section.blanks.forEach((blank) => {
            total++;
            const userAnswer = blankAnswers[`${module.id}-${sIdx}-${blank.id}`] || "";
            if (userAnswer.trim().toLowerCase() === blank.answer.toLowerCase()) {
              correctCount++;
            }
          });
        } else {
          section.questions.forEach((q) => {
            total++;
            const userAnswer = mcAnswers[`${module.id}-${sIdx}-${q.id}`];
            if (parseInt(userAnswer) === q.correct) {
              correctCount++;
            }
          });
        }
      });
    });

    // Save Result
    const API_URL = getApiBaseUrl();
    const resultPayload = {
      score: correctCount,
      total: total,
      percentage: Math.round((correctCount / total) * 100) + "%"
    };

    const saveTestResult = async () => {
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
            testName: "TOEFL Reading",
            result: resultPayload
          })
        });
        console.log("✅ TOEFL Reading score saved!");
      } catch (err) {
        console.error("❌ Failed to save TOEFL Reading score:", err);
      }
    };
    saveTestResult();

    navigate('/quiz/toefl/result', { state: { correctCount, total, testType: "Reading" } });
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 20px 40px", minHeight: "100vh" }}>
      <h1 style={{ color: "#19fd91", textAlign: "center", marginBottom: "2rem" }}>TOEFL Reading</h1>

      {/* Module selector */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        {readingModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => handleModuleChange(mod.id)}
            style={{
              padding: "0.5rem 1.5rem",
              background: selectedModule === mod.id ? "#19fd91" : "#1a2a20",
              color: selectedModule === mod.id ? "#000" : "#fff",
              border: "1px solid #19fd91",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {/* Current module & Section */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #233127", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>
            {currentModule.title}
          </h2>
          <span style={{ color: "#19fd91", fontWeight: "600" }}>
            Section {currentSectionIndex + 1} of {totalSections}
          </span>
        </div>

        {/* Two-column layout */}
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
            {currentSection.type === "completeWords"
              ? "Complete the Words"
              : currentSection.type === "dailyLife"
                ? "Read in Daily Life"
                : "Academic Reading"}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "start"
            }}
          >
            {/* Passage column */}
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
              {currentSection.type === "completeWords" ? (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {renderPassageWithInputs(
                    currentSection.passage,
                    currentSection.blanks,
                    currentModule.id,
                    currentSectionIndex,
                    blankAnswers,
                    handleBlankChange
                  )}
                </div>
              ) : (
                <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{currentSection.passage}</p>
              )}
            </div>

            {/* Questions column */}
            <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "10px" }}>
              {currentSection.type !== "completeWords" && (
                <div>
                  {currentSection.questions.map((q) => (
                    <div key={q.id} style={{ marginBottom: "2rem" }}>
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
                              padding: "1rem",
                              borderRadius: "10px",
                              background: mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "rgba(25, 253, 145, 0.1)" : "rgba(255,255,255,0.03)",
                              border: mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString() ? "1px solid #19fd91" : "1px solid transparent",
                              transition: "all 0.2s"
                            }}
                          >
                            <input
                              type="radio"
                              name={`q-${currentModule.id}-${currentSectionIndex}-${q.id}`}
                              value={optIdx}
                              checked={mcAnswers[`${currentModule.id}-${currentSectionIndex}-${q.id}`] === optIdx.toString()}
                              onChange={(e) =>
                                handleMcChange(currentModule.id, currentSectionIndex, q.id, e.target.value)
                              }
                              style={{ accentColor: "#19fd91" }}
                            />
                            <span style={{ color: "#e0e0e0" }}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
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

export default ToeflReading;