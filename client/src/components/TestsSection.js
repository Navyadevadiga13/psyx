import React, { useRef, useEffect } from "react";
import {
  FaBrain, FaHandshake, FaBriefcase, FaLanguage, FaArrowRight,
  FaChartPie, FaPuzzlePiece, FaListOl, FaShapes,
  FaHeadphones, FaBookOpen, FaPenFancy, FaHandsHelping,
  FaMicrophone, FaHeadSideVirus, FaHeart,
  FaUniversity, FaUserFriends, FaPalette,FaUserCog
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TestsSection({ isLoggedIn }) {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  const handleStart = (route) => {
    if (isLoggedIn) navigate(route);
    else navigate("/login");
  };

  const ASSESSMENTS = [
    {
      id: "human-quotients",
      title: "Human Quotients",
      subtitle: "Measure your cognitive & emotional capacity",
      icon: <FaHandsHelping />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Intellectual Quotient (IQ)", icon: <FaBrain />, action: () => handleStart("/tests/career/iqtest") },
        { label: "Emotional Intelligence (EQ)", icon: <FaHeart />, action: () => handleStart("/tests/personality/eqtest") },
        { label: "Social Quotient (SQ)", icon: <FaHandshake />, action: () => handleStart("/tests/personality/sqtest") },
        { label: "Physical Quotient (PQ)", icon: <FaUserCog />, action: () => handleStart("/tests/personality/pqtest") },
      ]
    },
    {
      id: "personality",
      title: "Personality",
      subtitle: "Understand your true self",
      icon: <FaBrain />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Left Brain & Right Brain", icon: <FaHeadSideVirus />, action: () => handleStart("/tests/personality/leftright") },
        { label: "Big Five", icon: <FaChartPie />, action: () => handleStart("/tests/personality/bigfive") },
        { label: "MBTI Analysis", icon: <FaPuzzlePiece />, action: () => handleStart("/tests/personality/mbti") },
        { label: "16PF Questionnaire", icon: <FaListOl />, action: () => handleStart("/tests/personality/16pf") },
        { label: "Dr. Phil's Test", icon: <FaBrain />, action: () => handleStart("/tests/personality/drphils") },
        { label: "Perception Test", icon: <FaUserFriends />, action: () => handleStart("/tests/personality/perception") },
        { label: "Diagram Analysis", icon: <FaPalette />, action: () => handleStart("/tests/personality/diagramanalysis") },
        { label: "Psychology of Geometry", icon: <FaShapes />, action: () => handleStart("/tests/personality/geometry") }
      ]
    },
    {
      id: "career",
      title: "Career Core",
      subtitle: "Find your professional path",
      icon: <FaBriefcase />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Career Anchor", icon: <FaBriefcase />, action: () => handleStart("/tests/career/career-anchor") },
        { label: "RIASEC (Holland Code)", icon: <FaChartPie />, action: () => handleStart("/tests/career/riasec") }
      ]
    },
    {
      id: "ielts",
      title: "IELTS Mock",
      subtitle: "Master the English language",
      icon: <FaLanguage />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Listening", icon: <FaHeadphones />, action: () => handleStart("/quiz/listening/intro") },
        { label: "Reading", icon: <FaBookOpen />, action: () => handleStart("/quiz/reading/intro") },
        { label: "Writing", icon: <FaPenFancy />, action: () => handleStart("/quiz/writing/intro") },
        { label: "Speaking", icon: <FaMicrophone />, action: () => handleStart("/quiz/speaking/intro") }
      ]
    },
    {
      id: "toefl",
      title: "TOEFL Mock",
      subtitle: "iBT Practice Test",
      icon: <FaUniversity />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Listening", icon: <FaHeadphones />, action: () => handleStart("/quiz/toefl/listening") },
        { label: "Reading", icon: <FaBookOpen />, action: () => handleStart("/quiz/toefl/reading/instruction") },
        { label: "Writing", icon: <FaPenFancy />, action: () => handleStart("/quiz/toefl/writing/instruction") },
        { label: "Speaking", icon: <FaMicrophone />, action: () => handleStart("/quiz/toefl/speaking") }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("card-visible");
      });
    }, { threshold: 0.1 });

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        body { margin: 0; }

        .tests-container {
          padding: 40px 60px;
          min-height: 100vh;
          background: #0a140f;
        }

        .tests-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .tests-main-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #19fd91;
          margin-bottom: 10px;
        }

        .tests-subtitle {
          color: #b4bebd;
        }

        .assessments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 35px;
        }

        .assessment-interactive-card {
          background: #111c17;
          border-radius: 18px;
          padding: 30px;
          border: 1px solid #233127;
          transition: all 0.3s ease;
          position: relative;
        }

        .assessment-interactive-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(25,253,145,0.15);
        }

        .card-header-interactive {
          text-align: center;
          margin-bottom: 20px;
        }

        .icon-wrapper-large {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .interactive-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 15px;
        }

        .interactive-btn {
          background: #1a2a20;
          border: 1px solid #233127;
          padding: 10px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          cursor: pointer;
          transition: 0.2s;
        }

        .interactive-btn:hover {
          background: #19fd91;
          color: black;
        }

        .btn-icon { margin-right: 10px; }
      `}</style>

      <div className="tests-container">
        <div className="tests-header">
          <h1 className="tests-main-title">Choose Your Assessment</h1>
          <p className="tests-subtitle">Select a specific module to begin your analysis.</p>
        </div>

        <div className="assessments-grid">
          {ASSESSMENTS.map((assessment, index) => (
            <div
              key={assessment.id}
              ref={el => cardsRef.current[index] = el}
              className="assessment-interactive-card"
            >
              <div className="card-header-interactive">
                <div className="icon-wrapper-large">{assessment.icon}</div>
                <h2>{assessment.title}</h2>
                <p>{assessment.subtitle}</p>
              </div>

              <div className="interactive-buttons-grid">
                {assessment.buttons.map((btn, idx) => (
                  <button key={idx} className="interactive-btn" onClick={btn.action}>
                    <span>{btn.icon} {btn.label}</span>
                    <FaArrowRight />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TestsSection;