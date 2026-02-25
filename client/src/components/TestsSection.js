import React, { useRef, useEffect } from "react";
import { FaBrain,FaHandshake, FaBriefcase, FaLanguage, FaArrowRight, FaChartPie, FaPuzzlePiece, FaListOl, FaShapes,FaHeadphones, FaBookOpen, FaPenFancy,FaHandsHelping, FaMicrophone, FaHeadSideVirus, FaHeart, FaUniversity,FaUserFriends,FaPalette } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TestsSection({ isLoggedIn }) {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  const handleStart = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  const ASSESSMENTS = [
    {
      id: "personality",
      title: "Personality",
      subtitle: "Understand your true self",
      icon: <FaBrain />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
                { label: "IQ Test", icon: <FaBrain />, action: () => handleStart("/tests/career/iqtest") },
        { label: "Left Brain and Right Brain Assessment", icon: <FaHeadSideVirus />, action: () => handleStart("/tests/personality/leftright") },
        { label: "Big Five", icon: <FaChartPie />, action: () => handleStart("/tests/personality/bigfive") },
        { label: "MBTI Analysis", icon: <FaPuzzlePiece />, action: () => handleStart("/tests/personality/mbti") },
        { label: "16PF Questionnaire", icon: <FaListOl />, action: () => handleStart("/tests/personality/16pf") },
        { label: "Emotional Intelligence (EQ)", icon: <FaHeart />, action: () => handleStart("/tests/personality/eqtest") },
        { label: "Dr.Phil's", icon: <FaBrain />, action: () => handleStart("/tests/personality/drphils") },
          { label: "Perception Personality Test", icon: <FaUserFriends />, action: () => handleStart("/tests/personality/perception") },
                    { label: "Diagram Analysis", icon: <FaPalette />, action: () => handleStart("/tests/personality/diagramanalysis") },
                      { label: "Psychology of Geometry", icon: <FaShapes />, action: () => handleStart("/tests/personality/geometry") },
                       { label: "Social Quotient (SQ)", icon: <FaHandshake />, action: () => handleStart("/tests/personality/sqtest") },
          
      ]
    },
    {
      id: "career",
      title: "Career Core",
      subtitle: "Find your professional path",
      description: "Discover your professional archetype. We map your skills to high-demand industry roles.",
      icon: <FaBriefcase />,
      color: "#19fd91",
      gradient: "linear-gradient(135deg, #19fd91, rgba(25, 253, 145, 0.8))",
      bgColor: "rgba(25, 253, 145, 0.05)",
      buttons: [
        { label: "Career Anchor Assessment", icon: <FaBriefcase />, action: () => handleStart("/tests/career/career-anchor") },
        { label: "RIASEC (Holland Code)", icon: <FaChartPie />, action: () => handleStart("/tests/career/riasec") },

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
      title: "TOEFL MOCK",
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="tests-container">
      {/* Section Header */}
      <div className="tests-header">
        <h1 className="tests-main-title">
          <span className="title-gradient">Choose Your Assessment</span>
        </h1>
        <p className="tests-subtitle">
          Select a specific module to begin your analysis.
        </p>
      </div>

      {/* Assessment Cards Grid - Side by Side */}
      <div className="assessments-grid tests-page-grid">
        {ASSESSMENTS.map((assessment, index) => (
          <div
            key={assessment.id}
            ref={el => cardsRef.current[index] = el}
            className="assessment-interactive-card"
            style={{
              '--card-color': assessment.color,
              '--card-gradient': assessment.gradient,
              '--card-bg': assessment.bgColor,
            }}
          >
            <div className="card-glow"></div>

            <div className="card-header-interactive">
              <div className="icon-wrapper-large" style={{ color: assessment.color }}>
                {assessment.icon}
              </div>
              <h2>{assessment.title}</h2>
              <p className="card-subtitle-text">{assessment.subtitle}</p>
            </div>

            <div className="card-body-interactive">
              {assessment.description && (
                <p className="description-text">{assessment.description}</p>
              )}

              {assessment.buttons && (
                <div className="interactive-buttons-grid">
                  {assessment.buttons.map((btn, idx) => (
                    <button key={idx} className="interactive-btn" onClick={btn.action}>
                      <span className="btn-icon">{btn.icon}</span>
                      <span className="btn-label">{btn.label}</span>
                      <FaArrowRight className="btn-arrow" />
                    </button>
                  ))}
                </div>
              )}

              {assessment.mainButton && (
                <button className="main-start-btn" onClick={assessment.mainButton.action}>
                  <span>{assessment.mainButton.label}</span>
                  <FaArrowRight />
                </button>
              )}
            </div>

            <div className="hover-overlay"></div>
          </div>
        ))}
      </div>

      {/* Floating Elements for Futuristic Effect */}
      <div className="floating-elements">
        <div className="float-element el-1"></div>
        <div className="float-element el-2"></div>
        <div className="float-element el-3"></div>
      </div>
    </div>
  );
}

export default TestsSection;