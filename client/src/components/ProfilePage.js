// src/components/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api";
import leftBrainImg from "../assets/leftbrain.jpeg";
import rightBrainImg from "../assets/rightbrain.jpeg";

// --- HELPERS ---
const FACTORS = {
  A: "Warmth",
  B: "Reasoning",
  C: "Emotional Stability",
  E: "Dominance",
  F: "Liveliness",
  G: "Rule-Consciousness",
  H: "Social Boldness",
  I: "Sensitivity",
  L: "Vigilance",
  M: "Abstractedness",
  N: "Privateness",
  O: "Apprehension",
  Q1: "Openness to Change",
  Q2: "Self-Reliance",
  Q3: "Perfectionism",
  Q4: "Tension",
};

// Map for Career Anchors (Code -> Label)
const CAREER_ANCHORS_MAP = {
  AU: "Autonomy/Independence",
  SE: "Security/Stability",
  TF: "Technical/Functional",
  GM: "General Management",
  EC: "Entrepreneurial Creativity",
  SV: "Service/Dedication",
  CH: "Pure Challenge",
  LS: "Lifestyle",
};

const MBTI_DESCRIPTIONS = {
  ISTJ: {
    label: "ISTJ – Responsible Organizer",
    text: "Responsible, organized, and practical — dependable administrators.",
  },
  ISFJ: {
    label: "ISFJ – Supportive Protector",
    text: "Supportive, warm, and conscientious — protectors of tradition.",
  },
  INFJ: {
    label: "INFJ – Insightful Idealist",
    text: "Insightful, principled, and altruistic — quiet visionaries.",
  },
  INTJ: {
    label: "INTJ – Strategic Visionary",
    text: "Strategic, independent, and analytical — long-range planners.",
  },
  ISTP: {
    label: "ISTP – Practical Troubleshooter",
    text: "Adaptable, logical, and observant — hands-on problem solvers.",
  },
  ISFP: {
    label: "ISFP – Gentle Creator",
    text: "Gentle, creative, and spontaneous — sensitive artists.",
  },
  INFP: {
    label: "INFP – Thoughtful Idealist",
    text: "Idealistic, compassionate, and introspective — driven by values.",
  },
  INTP: {
    label: "INTP – Curious Analyst",
    text: "Curious, theoretical, and objective — conceptual thinkers.",
  },
  ESTP: {
    label: "ESTP – Energetic Doer",
    text: "Energetic, pragmatic, and resourceful — action-oriented doers.",
  },
  ESFP: {
    label: "ESFP – Friendly Performer",
    text: "Outgoing, playful, and vivacious — performers and motivators.",
  },
  ENFP: {
    label: "ENFP – Enthusiastic Explorer",
    text: "Enthusiastic, imaginative, and warm — idea-oriented inspirers.",
  },
  ENTP: {
    label: "ENTP – Inventive Debater",
    text: "Inventive, quick-witted, and energetic — debaters and innovators.",
  },
  ESTJ: {
    label: "ESTJ – Efficient Organizer",
    text: "Organized, direct, and pragmatic — natural leaders.",
  },
  ESFJ: {
    label: "ESFJ – Caring Coordinator",
    text: "Caring, social, and conscientious — community builders.",
  },
  ENFJ: {
    label: "ENFJ – Inspiring Mentor",
    text: "Charismatic, empathetic, and motivating — gifted communicators.",
  },
  ENTJ: {
    label: "ENTJ – Commanding Strategist",
    text: "Decisive, assertive, and strategic — born executives.",
  },
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- COMPONENT ---

function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = getApiBaseUrl();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (onLogout) onLogout();
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        // ✅ FIX FOR CRASH: Check if data exists
        if (res.ok && data) {
          setUser(data);
        } else {
          console.warn("Invalid session. Logging out.");
          localStorage.removeItem("token");
          localStorage.removeItem("loggedIn");
          if (onLogout) onLogout();
          navigate("/login");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, API_URL, onLogout]);

  // --- RENDER TEST RESULT CARDS ---
  const renderTestDetails = (test) => {
    const { testName, result } = test;

    // 1. MBTI
if (result?.type){
const info = result.description || {};
  const letters = result.type.split("");

  const letterMeaning = {
    E: "You gain energy from people and social interaction.",
    I: "You recharge by spending time alone.",
    S: "You focus on real facts and practical details.",
    N: "You focus on ideas and future possibilities.",
    T: "You make decisions using logic.",
    F: "You make decisions using feelings and values.",
    J: "You prefer planning and structure.",
    P: "You prefer flexibility and freedom.",
  };

  return (
    <div style={{ marginTop: "12px" }}>

      {/* TYPE */}
      <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent)" }}>
        {result.type}
      </div>

      <div style={{ fontSize: "1rem", fontWeight: "600", marginTop: "4px" }}>
        {info.label}
      </div>

      {/* MAIN DESCRIPTION */}
      <div
        style={{
          fontSize: "0.95rem",
          marginTop: "10px",
          color: "var(--text-primary)",
          lineHeight: "1.6",
        }}
      >
        {info.text}
      </div>

      {/* LETTER BREAKDOWN */}
      <div style={{ marginTop: "14px" }}>
        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
          Personality Breakdown
        </div>

        {letters.map((l, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              marginBottom: "5px",
              lineHeight: "1.5",
            }}
          >
            <b style={{ color: "var(--accent)" }}>{l}</b> — {letterMeaning[l]}
          </div>
        ))}
      </div>

      {/* REAL LIFE INSIGHT */}
      <div
        style={{
          marginTop: "14px",
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(25,253,145,0.06)",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
          What this means in real life
        </div>

        <div style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
          Your personality affects how you think, act, and respond daily.
          It influences communication, stress handling, and decision-making.

          <br /><br />

          You may prefer either structure or flexibility depending on your type.
          These are natural patterns of your mind, not forced behavior.

          <br /><br />

          Understanding this helps you choose better career paths, improve relationships,
          and manage stress more effectively.
        </div>
      </div>

      {/* STRENGTHS & LIMITS */}
      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.03)",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
          Strengths & Blind Spots
        </div>

        <div style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
          • You naturally build strengths based on your personality.<br/>
          • You may also have areas that feel difficult or uncomfortable.<br/>
          • These are not weaknesses, just areas for awareness.<br/>
          • Awareness helps you grow and become balanced.
        </div>
      </div>

      {/* CAREER NOTE */}
      <div
        style={{
          marginTop: "12px",
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: "1.6",
        }}
      >
        💡 You feel best in environments that match your personality.
        The right fit reduces stress and increases motivation.
      </div>

      {result.details && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          {result.details}
        </div>
      )}
    </div>
  );
}

// 2. LEFT BRAIN AND RIGHT BRAIN
if (testName.includes("Left Brain") && result?.dominance) {
  return (
    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* IMAGE */}
      <img
        src={result.isRightBrain ? rightBrainImg : leftBrainImg}
        alt="Brain Type"
        style={{
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto",
          display: "block",
          borderRadius: "10px"
        }}
      />

      {/* MAIN CARD */}
      <div
        style={{
          background: "rgba(34, 197, 94, 0.1)",
          border: "2px solid var(--accent)",
          borderRadius: "12px",
          padding: "1.2rem",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", color: "var(--accent)" }}>
          {result.dominance}
        </h3>

        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          {result.isRightBrain
            ? "You tend to think holistically, creatively, and intuitively. You see the big picture and prefer visual thinking."
            : "You tend to think analytically, logically, and step-by-step. You focus on details and structure."}
        </p>
      </div>

      {/* CAREERS */}
      <div
        style={{
          background: "rgba(34, 197, 94, 0.05)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          borderRadius: "12px",
          padding: "1.2rem",
        }}
      >
        <h4 style={{ color: "var(--accent)", marginBottom: "10px" }}>
          🎯 Ideal Career Paths
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {result.careers.map((career, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                padding: "8px",
                borderRadius: "8px",
                fontSize: "0.85rem"
              }}
            >
              ✓ {career}
            </div>
          ))}
        </div>
      </div>

      {/* HOW YOUR BRAIN WORKS */}
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(25,253,145,0.06)",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
          🧠 How your brain works
        </div>

        <div style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
          {result.isRightBrain
            ? "You process information visually and emotionally. You focus on patterns, creativity, and big-picture thinking."
            : "You process information logically and step-by-step. You focus on structure, facts, and clear reasoning."}

          <br /><br />

          {result.isRightBrain
            ? "You are naturally intuitive and imaginative, often thinking in ideas and possibilities."
            : "You are naturally analytical and practical, often thinking in structured steps and solutions."}
        </div>
      </div>

      {/* STRENGTHS & CHALLENGES */}
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.03)",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
          ⚖️ Strengths & Challenges
        </div>

        <div style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
          {result.isRightBrain ? (
            <>
              • Strong creativity and imagination<br/>
              • Good at understanding emotions and people<br/>
              • May struggle with structure and planning<br/>
              • Can get distracted easily
            </>
          ) : (
            <>
              • Strong logical and analytical thinking<br/>
              • Good at planning and organization<br/>
              • May struggle with creativity or flexibility<br/>
              • Can become too rigid or detail-focused
            </>
          )}
        </div>
      </div>

      {/* GROWTH TIP */}
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(25,253,145,0.08)",
          border: "1px solid rgba(25,253,145,0.25)",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: "6px", color: "#19fd91" }}>
          💡 Growth Tip
        </div>

        <div style={{ fontSize: "0.9rem", color: "#19fd91" }}>
          {result.isRightBrain
            ? "Try building routines and structure in your daily life to balance your creativity."
            : "Try exploring creative activities and flexible thinking to balance your logical approach."}
        </div>
      </div>

    </div>
  );
}
    // ✅ BIG FIVE TEST (DETAILED PROFILE VERSION)
if (
  testName &&
  testName.toLowerCase().includes("big five") &&
  result?.raw
) {
  const getLevel = (score) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Moderate";
    return "Low";
  };

  return (
    <div style={{ marginTop: "10px" }}>

      <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
        Big Five Personality Report
      </div>

      {/* SCORE CARD */}
      <div style={{
        marginTop: "10px",
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: "10px",
        padding: "1rem",
        textAlign: "center"
      }}>
        <h2 style={{ color: "var(--accent)" }}>
          {result.totalScore || "Personality Overview"}
        </h2>

        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          This report shows how you think, behave, and interact with others.
        </p>
      </div>

      {/* OVERALL SUMMARY */}
      <div style={{ marginTop: "12px" }}>
        <strong>🧠 What this means:</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Your personality is made up of 5 main traits. These traits affect how you talk to people,
          handle stress, make decisions, and live your daily life.
          
          There is no "good" or "bad" personality — this simply helps you understand yourself better.
        </p>
      </div>

      {/* EXTRAVERSION */}
      <div style={{ marginTop: "12px" }}>
        <strong>Extraversion ({getLevel(result.raw.E)}): {result.raw.E}</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {result.raw.E >= 70
            ? "You are very outgoing and energetic. You enjoy being around people, talking, and socializing. You feel more active and happy in group environments."
            : result.raw.E >= 40
            ? "You are balanced. You enjoy spending time with others but also value your personal space. You can adjust easily between social and quiet environments."
            : "You are more quiet and reserved. You prefer calm environments and meaningful conversations with a few close people rather than large groups."}
        </p>
      </div>

      {/* AGREEABLENESS */}
      <div style={{ marginTop: "12px" }}>
        <strong>Agreeableness ({getLevel(result.raw.A)}): {result.raw.A}</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {result.raw.A >= 70
            ? "You are kind, caring, and supportive. You try to help others and avoid conflict. People may see you as friendly and easy to approach."
            : result.raw.A >= 40
            ? "You are balanced. You can be kind and understanding, but you also know when to be practical and think logically."
            : "You are more direct and practical. You focus on facts and honesty, even if it sometimes feels less emotional."}
        </p>
      </div>

      {/* CONSCIENTIOUSNESS */}
      <div style={{ marginTop: "12px" }}>
        <strong>Conscientiousness ({getLevel(result.raw.C)}): {result.raw.C}</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {result.raw.C >= 70
            ? "You are highly organized and disciplined. You plan things well and complete your work responsibly."
            : result.raw.C >= 40
            ? "You are somewhat organized. You can manage tasks, but sometimes you may be flexible or delay things."
            : "You prefer flexibility over strict planning. You like doing things your own way rather than following routines."}
        </p>
      </div>

      {/* NEUROTICISM */}
      <div style={{ marginTop: "12px" }}>
        <strong>Emotional Stability ({getLevel(result.raw.N)}): {result.raw.N}</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {result.raw.N >= 70
            ? "You may feel stress or emotions strongly. Small problems may sometimes feel overwhelming."
            : result.raw.N >= 40
            ? "You are somewhat stable emotionally. You feel stress sometimes but can handle it in many situations."
            : "You are calm and emotionally stable. You handle pressure well and stay relaxed in difficult situations."}
        </p>
      </div>

      {/* OPENNESS */}
      <div style={{ marginTop: "12px" }}>
        <strong>Openness ({getLevel(result.raw.O)}): {result.raw.O}</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {result.raw.O >= 70
            ? "You are creative and curious. You enjoy learning new things and exploring new ideas."
            : result.raw.O >= 40
            ? "You are open to new experiences but also enjoy familiar routines."
            : "You prefer stability and routine. You feel comfortable with familiar methods and avoid unnecessary changes."}
        </p>
      </div>

      {/* FINAL INSIGHT */}
      <div style={{ marginTop: "14px" }}>
        <strong>📌 Final Insight:</strong>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Your personality is unique. Some areas are strong, and some can improve.

          The goal is not to change who you are — but to understand yourself better and grow step by step.

          Small improvements in daily habits can create big changes over time.
        </p>
      </div>

      {/* GROWTH TIP BOX */}
<div style={{
  marginTop: "14px",
  background: "rgba(34,197,94,0.08)",
  border: "1px solid rgba(34,197,94,0.3)",
  borderRadius: "10px",
  padding: "10px"
}}>

  <div style={{
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#19fd91",
    fontStyle: "italic"
  }}>
    💡 Growth Tip
  </div>

  <div style={{
    marginTop: "6px",
    fontSize: "0.9rem",
    color: "#19fd91",
    fontStyle: "italic",
    lineHeight: "1.5"
  }}>
    Focus on one small improvement at a time instead of trying to change everything at once.
  </div>

</div>

    </div>
  );
}

    // 4. 16PF
    if (testName.includes("16PF") && result?.averages) {
      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontWeight: "600", color: "var(--accent)", marginBottom: "8px" }}>
            16PF Results
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            fontSize: "0.9rem"
          }}>
            {Object.entries(result.averages).map(([k, v]) => (
              <div key={k} style={{
                background: "var(--bg-card)",
                padding: "6px 8px",
                borderRadius: "6px"
              }}>
                <strong>{k} – {FACTORS[k] || k}:</strong> {v} ({result.descriptions[k]})
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. CAREER ANCHORS (ENHANCED RESULT PROFILE)
if (testName.includes("Career") && result?.topAnchors) {

  const anchors = result.topAnchors.slice(0, 3);

  const primary = anchors[0];
  const secondary = anchors[1];
  const tertiary = anchors[2];

  const getAnchorMeaning = (code) => {
    const meanings = {
      AU: "You strongly value independence and dislike being controlled. You prefer freedom in how and when you work.",
      SE: "You prioritize job security and stability over risk or uncertainty.",
      TF: "You are driven by expertise and mastery in a specific skill or technical field.",
      GM: "You are leadership-oriented and naturally inclined toward managing people and systems.",
      EC: "You are innovative, risk-taking, and motivated to build something of your own.",
      SV: "You are motivated by helping others and contributing to society.",
      CH: "You thrive in difficult, competitive, and high-pressure challenges.",
      LS: "You value balance between personal life, family, and career above ambition."
    };
    return meanings[code] || "";
  };

  const getProfileSummary = () => {
    if (!primary) return "";

    const top = primary[0];

    const summaries = {
      AU: "You are an independent thinker who dislikes restrictions and prefers freedom in decision-making.",
      SE: "You are stability-driven and prefer predictable environments where risks are minimal.",
      TF: "You are skill-focused and want deep mastery in a specialized domain.",
      GM: "You are naturally leadership-oriented and think in terms of managing systems and people.",
      EC: "You are entrepreneurial in mindset and enjoy creating new ideas or businesses.",
      SV: "You are purpose-driven and want your work to have a meaningful social impact.",
      CH: "You are challenge-driven and perform best in difficult, competitive situations.",
      LS: "You are balance-driven and prioritize personal life harmony over career pressure."
    };

    return summaries[top] || "";
  };

  return (
    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* HEADER */}
      <div style={{
        fontWeight: "700",
        color: "var(--accent)",
        fontSize: "1.1rem"
      }}>
        Career Identity Profile Report
      </div>

      {/* PROFILE SUMMARY CARD */}
      <div style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.25)",
        borderRadius: "14px",
        padding: "1.2rem",
        lineHeight: "1.7",
        fontSize: "0.95rem",
        color: "var(--text-secondary)"
      }}>
        <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-main)" }}>
          🧠 Your Career Personality Profile
        </div>
        {getProfileSummary()}
      </div>

      {/* TOP 3 ANCHORS DETAILED */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        {[primary, secondary, tertiary].map((item, idx) => {
          if (!item) return null;

          const code = item[0];
          const score = item[1];

          return (
            <div key={idx} style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "1rem"
            }}>
              <div style={{
                fontWeight: "700",
                color: "var(--accent)",
                fontSize: "1rem",
                marginBottom: "6px"
              }}>
                {idx === 0 ? "🥇 Primary Anchor" :
                 idx === 1 ? "🥈 Secondary Anchor" :
                 "🥉 Tertiary Anchor"}: {CAREER_ANCHORS_MAP?.[code] || code}
              </div>

              <div style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6"
              }}>
                <b>Score:</b> {score}<br />
                <b>Meaning:</b> {getAnchorMeaning(code)}
              </div>
            </div>
          );
        })}

      </div>

      {/* HOW THIS RELATES TO REAL LIFE */}
      <div style={{
        background: "rgba(25,253,145,0.06)",
        border: "1px solid rgba(25,253,145,0.2)",
        borderRadius: "12px",
        padding: "1rem",
        fontSize: "0.9rem",
        color: "var(--text-secondary)",
        lineHeight: "1.7"
      }}>
        <div style={{ fontWeight: "600", marginBottom: "6px", color: "var(--text-main)" }}>
          🌍 What This Means in Real Life
        </div>

        Your top career anchors influence:
        <ul style={{ marginTop: "6px" }}>
          <li>What kind of job makes you feel satisfied</li>
          <li>How you react to pressure, leadership, and rules</li>
          <li>Whether you prefer freedom, stability, or responsibility</li>
          <li>Why you may like certain careers and dislike others</li>
        </ul>
      </div>

    </div>
  );
}

// 3. RIASEC TEST (PROFILE VIEW)
if (testName.includes("RIASEC") && result?.code) {

  // 🔥 Growth Tip Function
  const getRiasecGrowthTip = (type) => {
    const tips = {
      R: "Try improving communication skills along with your practical abilities to grow faster in team environments.",
      I: "Balance analysis with action — don’t overthink, start applying your ideas.",
      A: "Build discipline and structure to turn your creativity into real outcomes.",
      S: "Set personal boundaries and focus on your own growth along with helping others.",
      E: "Develop patience and listening skills to become a stronger leader.",
      C: "Be open to change and flexibility instead of sticking only to routines.",
    };

    return tips[type] || "Focus on improving both your strengths and weaker areas for balanced growth.";
  };

  return (
    <div style={{ marginTop: "15px" }}>

      {/* TITLE */}
      <h3 style={{ color: "#19fd91", marginBottom: "10px" }}>
        🎯 RIASEC Career Result
      </h3>

      {/* INFO BOX */}
      <div style={{
        padding: "12px",
        background: "rgba(25,253,145,0.1)",
        borderRadius: "8px",
        marginBottom: "12px"
      }}>
        <p style={{ fontSize: "0.9rem" }}>
          Your interests are based on Holland Code. This helps you choose careers and fields that match your personality.
        </p>
      </div>

      {/* SCORE GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "8px",
        marginBottom: "12px"
      }}>
        {Object.keys(result.counts).map((k) => (
          <div key={k} style={{
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            background: "rgba(25,253,145,0.08)"
          }}>
            <div style={{ fontSize: "0.8rem" }}>{k}</div>
            <div style={{ fontSize: "1.3rem", color: "#19fd91" }}>
              {result.counts[k]}
            </div>
          </div>
        ))}
      </div>

      {/* CODE */}
      <div style={{
        padding: "12px",
        textAlign: "center",
        border: "2px solid #19fd91",
        borderRadius: "10px",
        marginBottom: "14px"
      }}>
        <div>Your Code</div>
        <div style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#19fd91"
        }}>
          {result.code}
        </div>
      </div>

      {/* TOP 3 */}
      {result.top.map((t, i) => (
        <div key={i} style={{
          marginBottom: "12px",
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.05)"
        }}>

          <h4 style={{ color: "#19fd91" }}>
            {i + 1}. {t.letter} — {t.name}
          </h4>

          <p style={{ fontSize: "0.9rem" }}>
            {t.description}
          </p>

          {/* MAJORS */}
          <div style={{ marginTop: "8px" }}>
            <b style={{ color: "#19fd91" }}>🎓 Majors:</b>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "5px" }}>
              {t.majors.map((m, idx) => (
                <span key={idx} style={{
                  background: "rgba(25,253,145,0.15)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.8rem"
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* PATHWAYS */}
          <div style={{ marginTop: "8px" }}>
            <b style={{ color: "#19fd91" }}>🚀 Career Paths:</b>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "5px" }}>
              {t.pathways.map((p, idx) => (
                <span key={idx} style={{
                  background: "rgba(25,253,145,0.2)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "0.8rem"
                }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      ))}

      {/* HOW TO USE */}
      <div style={{
        padding: "12px",
        borderRadius: "10px",
        background: "rgba(25,253,145,0.08)",
        marginBottom: "12px"
      }}>
        <b style={{ color: "#19fd91" }}>💡 How to use this</b>
        <ul style={{ fontSize: "0.9rem", marginTop: "6px" }}>
          <li>Choose careers matching your top 3 types</li>
          <li>Pick college majors aligned with your interests</li>
          <li>Use this for career planning & guidance</li>
        </ul>
      </div>

      {/* 🔥 GROWTH TIP */}
      <div style={{
        padding: "12px",
        borderRadius: "10px",
        background: "rgba(25,253,145,0.08)",
        border: "1px solid rgba(25,253,145,0.25)"
      }}>
        <div style={{
          fontWeight: "700",
          marginBottom: "6px",
          color: "#19fd91"
        }}>
          💡 Growth Tip
        </div>

        <div style={{
          fontSize: "0.9rem",
          color: "#19fd91"
        }}>
          {getRiasecGrowthTip(result.top?.[0]?.letter)}
        </div>
      </div>

    </div>
  );
}

  // 6. IQ TEST
if (
  testName &&
  testName.toLowerCase().includes("iq") &&
  result?.score !== undefined
) {
  const TOTAL = result.total || 30;
  const MEAN_RAW = 30;
  const RAW_SD = 5;
  const IQ_MEAN = 100;
  const IQ_SD = 15;

  // ✅ Use saved IQ OR fallback calculate
  const iqScore =
    result.iq ??
    Math.round(((result.score - MEAN_RAW) / RAW_SD) * IQ_SD + IQ_MEAN);

  // ✅ Classification
  const getClassification = (iq) => {
    if (iq >= 130) return "Highly Gifted";
    if (iq >= 115) return "Above Average";
    if (iq >= 90) return "Average";
    if (iq >= 75) return "Below Average";
    return "Low";
  };

  // ✅ Detailed Explanation
const getIQExplanation = (iq) => {
  if (iq >= 130) {
    return `You have a very high level of intelligence.

You can quickly understand complex ideas, notice patterns easily, and think deeply about problems. You likely enjoy challenges that require strategy, logic, or creativity.

In real life, this means you can solve problems faster, learn new skills quickly, and adapt well in difficult situations. You may also find yourself thinking ahead or seeing solutions others might miss.

People with this level of IQ often do well in fields like technology, research, business, design, or leadership roles.

Just remember — your ability is strong, but growth depends on how consistently you use and challenge your mind.`;
  }

  if (iq >= 115) {
    return `You have above-average intelligence.

You can understand concepts faster than most people and usually perform well in problem-solving situations. You are good at logical thinking and can handle tasks that require planning and analysis.

In everyday life, you are likely able to make good decisions, learn new things efficiently, and handle responsibilities confidently.

With regular practice and focus, you can reach a very high level of performance in your studies or career.

Keep challenging yourself — that’s how you grow further.`;
  }

  if (iq >= 90) {
    return `You have a balanced and practical level of intelligence.

You can manage daily tasks, decisions, and problem-solving without much difficulty. You may not always think very fast, but you are consistent and dependable.

In real life, this means you can understand things clearly, complete tasks effectively, and handle responsibilities well.

If you regularly practice thinking skills like reading, reasoning, and learning new concepts, you can improve even more over time.

Your growth depends on consistency, not speed.`;
  }

  if (iq >= 75) {
    return `You may find some logical or complex thinking tasks a bit challenging.

At times, understanding new ideas or solving problems may take more effort or time. This is completely normal and nothing to worry about.

In real life, you may feel slower in certain situations, but with practice, you can improve your thinking ability step by step.

Start with simple activities like puzzles, reading, or guided learning. Over time, your confidence and ability will grow.

The key is to keep practicing regularly without giving up.`;
  }

  return `Right now, some thinking or problem-solving tasks may feel difficult.

You might struggle with understanding certain concepts or making quick decisions, but this does not define your ability or your future.

In real life, improvement comes from small, consistent efforts — not instant results.

You can build your intelligence by reading, practicing simple problems, and learning step by step every day.

With patience and consistency, you will definitely improve over time.`;
};
  // ✅ Tips
  const getIQTips = (iq) => {
    if (iq >= 130) return "Tip: Challenge yourself with advanced problems and leadership roles.";
    if (iq >= 115) return "Tip: Keep learning new skills and engage in analytical thinking.";
    if (iq >= 90) return "Tip: Practice reasoning and problem-solving regularly.";
    if (iq >= 75) return "Tip: Start with simple puzzles and improve gradually.";
    return "Tip: Focus on basic cognitive exercises daily.";
  };

  const classification = getClassification(iqScore);
  const explanation = getIQExplanation(iqScore);
  const tip = getIQTips(iqScore);

  return (
    <div style={{ marginTop: "10px" }}>
      
      <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
        IQ Score
      </div>

      <div style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "var(--accent)"
      }}>
        {iqScore}
      </div>

      {/* ✅ Classification */}
      <div style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#19fd91",
        marginTop: "5px"
      }}>
        {classification}
      </div>

      {/* ✅ Explanation */}
      <div style={{
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        marginTop: "6px",
        lineHeight: "1.6",
        whiteSpace: "pre-line"
      }}>
        {explanation}
      </div>

      {/* ✅ TIP BOX */}
<div style={{
  marginTop: "12px",
  background: "rgba(25,253,145,0.08)",
  border: "1px solid rgba(25,253,145,0.3)",
  borderRadius: "10px",
  padding: "10px"
}}>

  <div style={{
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#19fd91",
    fontStyle: "italic"
  }}>
    💡 Growth Tip
  </div>

  <div style={{
    marginTop: "6px",
    fontSize: "0.85rem",
    color: "#19fd91",
    fontStyle: "italic",
    lineHeight: "1.5"
  }}>
    {tip}
  </div>

</div>

      <div style={{
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginTop: "6px"
      }}>
        Raw: {result.score} / {TOTAL}
      </div>

    </div>
  );
}

 // 7. EQ TEST
if (
  testName &&
  testName.toLowerCase().includes("eq") &&
  result?.score !== undefined
) {
  const score = result.score;

  // ✅ Interpretation
  const getInterpretation = (s) => {
    if (s >= 84) return "Very high emotional intelligence";
    if (s >= 64) return "High emotional intelligence";
    if (s >= 37) return "Moderate emotional intelligence";
    if (s >= 17) return "Low emotional intelligence";
    return "Very low emotional intelligence";
  };

  // ✅ Detailed Explanation
 const getEQExplanation = (s) => {
  if (s >= 84) {
    return `You are very good at understanding your emotions and staying calm even in difficult situations.

You also understand how others feel, which helps you build strong and meaningful relationships.

People with this level of EQ usually do well in teamwork, leadership, and communication.`;
  }

  if (s >= 64) {
    return `You handle your emotions well in most situations and can understand others.

You are generally good at maintaining relationships and dealing with everyday stress.

With a little more awareness and reflection, you can improve even further.`;
  }

  if (s >= 37) {
    return `You understand emotions in many situations, but sometimes you may react quickly or feel confused.

You can improve by paying more attention to your emotions and how you respond to others.

Small changes can make a big difference over time.`;
  }

  if (s >= 17) {
    return `You may find it difficult to manage emotions or understand others clearly.

Sometimes reactions may feel out of control or confusing.

The good part is — emotional intelligence can improve with practice and awareness.`;
  }

  return `You may struggle with understanding emotions and handling relationships right now.

But this is not permanent — with small daily efforts, you can improve step by step.

Start by observing your emotions and learning from your experiences.`;
};
  // ✅ Tips
  const getEQTips = (s) => {
    if (s >= 84) return "Tip: Keep building leadership and mentoring skills.";
    if (s >= 64) return "Tip: Practice active listening and emotional awareness.";
    if (s >= 37) return "Tip: Reflect on your emotions and improve communication.";
    if (s >= 17) return "Tip: Start journaling and observing your reactions.";
    return "Tip: Focus on basic emotional awareness and control exercises.";
  };

  const interpretation = getInterpretation(score);
  const explanation = getEQExplanation(score);
  const tip = getEQTips(score);

  return (
    <div style={{ marginTop: "10px" }}>
      
      {/* TITLE */}
      <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
        EQ Score
      </div>

      {/* SCORE */}
      <div style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "var(--accent)"
      }}>
        {score}
      </div>

      {/* INTERPRETATION */}
      <div style={{
        marginTop: "5px",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#19fd91"
      }}>
        {interpretation}
      </div>

      {/* 🔥 GRAPH */}
      <div style={{
        marginTop: "15px",
        height: "200px",
        width: "100%"
      }}>
        <svg viewBox="0 0 400 200" style={{ width: "100%" }}>
          
          <line x1="20" y1="180" x2="380" y2="180" stroke="var(--border)" strokeWidth="2" />

          <path
            d="M20,180 Q100,180 150,100 T200,20 T250,100 T380,180"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <path
            d="M20,180 Q100,180 150,100 T200,20 T250,100 T380,180 L380,180 L20,180 Z"
            fill="var(--accent)"
            opacity="0.1"
          />

          {/* YOU MARKER */}
          {(() => {
            const x = 20 + (Math.min(score, 100) / 100) * 360;
            return (
              <g>
                <line x1={x} y1="20" x2={x} y2="180" stroke="#00e0ff" strokeWidth="3" />
                <circle cx={x} cy="20" r="5" fill="#00e0ff" />
              </g>
            );
          })()}

          {/* Labels */}
          <text x="77" y="195" fill="var(--text-muted)" fontSize="10">16</text>
          <text x="149" y="195" fill="var(--text-muted)" fontSize="10">36</text>
          <text x="246" y="195" fill="var(--text-muted)" fontSize="10">63</text>
          <text x="318" y="195" fill="var(--text-muted)" fontSize="10">83</text>

        </svg>
      </div>

      {/* ✅ Explanation */}
      <div style={{
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        marginTop: "10px",
        lineHeight: "1.6",
        whiteSpace: "pre-line"
      }}>
        {explanation}
      </div>

  {/* ✅ TIP BOX */}
<div style={{
  marginTop: "14px",
  background: "rgba(34,197,94,0.08)",
  border: "1px solid rgba(34,197,94,0.3)",
  borderRadius: "10px",
  padding: "10px"
}}>

  <div style={{
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#19fd91",
    fontStyle: "italic"
  }}>
    💡 Growth Tip
  </div>

  <div style={{
    marginTop: "6px",
    fontSize: "0.9rem",
    color: "#19fd91",
    fontStyle: "italic",
    lineHeight: "1.5"
  }}>
    {tip}
  </div>

</div>

    </div>
  );
}
    // DR PHIL PERSONALITY TEST

if (
  testName &&
  testName.toLowerCase().includes("phil") &&
  result?.score !== undefined
) {

  const score = result.score;
  const total = result.totalScore || 100;

  // 🧠 SIMPLE + DETAILED INTERPRETATION
  const getInterpretation = () => {
    if (score < total * 0.4)
      return `Your score is in the lower range.

This means you may sometimes find it difficult to stay calm in stressful situations or make confident decisions.

You might feel confused, overwhelmed, or depend on others when things get tough.

But this is completely normal — these skills can be improved with practice.

With small daily efforts, you can build confidence, emotional control, and better decision-making ability.`;

    if (score < total * 0.7)
      return `Your score is in the average range.

This means you are able to handle most situations in a balanced way.

Sometimes you may feel unsure, stressed, or confused while making decisions, but overall you manage things reasonably well.

You have a good base — with a little more focus and practice, you can become much stronger mentally and emotionally.`;

    return `Your score is in the high range.

You are good at handling your emotions and staying calm even in difficult situations.

You think clearly before making decisions and can manage stress better than most people.

You are likely seen as strong, stable, and dependable.

Keep building on these strengths to become even better.`;
  };

  // 💪 STRENGTHS (MORE HUMAN EXPLANATION)
  const getStrengths = () => {
    if (score < total * 0.4)
      return [
        "You are aware that you need to improve",
        "You are open to learning and growing",
        "You try your best even when situations feel difficult"
      ];

    if (score < total * 0.7)
      return [
        "You handle situations in a balanced way",
        "You can adjust to different environments",
        "You understand people and situations fairly well"
      ];

    return [
      "You stay calm under pressure",
      "You make clear and confident decisions",
      "You manage stress effectively",
      "People may rely on you in difficult situations"
    ];
  };

  // ⚠️ AREAS TO IMPROVE
  const getWeaknesses = () => {
    if (score < total * 0.4)
      return [
        "You may struggle with confidence",
        "Stress may affect your decisions",
        "You may depend too much on others"
      ];

    if (score < total * 0.7)
      return [
        "You may overthink sometimes",
        "You may feel unsure in tough situations",
        "Stress can affect your performance occasionally"
      ];

    return [
        "You may take too much responsibility",
        "You may get mentally tired (burnout)",
        "You may overthink important decisions"
    ];
  };

  // 🧩 THINKING STYLE
  const getThinkingStyle = () => {
    if (score < total * 0.4)
      return "You rely more on emotions, which can make decision-making difficult sometimes.";

    if (score < total * 0.7)
      return "You use both logic and emotions, but sometimes feel unsure.";

    return "You balance logic and emotions very well, helping you make strong decisions.";
  };

  // 📈 IMPROVEMENT PLAN (CLEAR ACTION STEPS)
  const getImprovements = () => {
    if (score < total * 0.4)
      return [
        "Start making small decisions on your own",
        "Practice staying calm in simple stressful situations",
        "Avoid overthinking before acting",
        "Spend 5–10 minutes daily reflecting on your actions"
      ];

    if (score < total * 0.7)
      return [
        "Build confidence in decision-making",
        "Practice solving small problems daily",
        "Improve stress control techniques",
        "Set clear and simple goals"
      ];

    return [
        "Maintain your emotional balance",
        "Take breaks to avoid burnout",
        "Continue learning and improving",
        "Support and guide others around you"
    ];
  };

  return (
    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* SCORE CARD */}
      <div style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: "10px",
        padding: "1rem",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Personality Test Score
        </p>

        <h2 style={{ margin: "5px 0", color: "var(--accent)", fontSize: "2rem" }}>
          {score} / {total}
        </h2>

        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          {score < total * 0.4 ? "Low" : score < total * 0.7 ? "Average" : "High"}
        </p>
      </div>

      {/* INTERPRETATION */}
      <div>
        <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>
          🧠 What Your Score Means
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", whiteSpace: "pre-line" }}>
          {getInterpretation()}
        </p>
      </div>

      {/* STRENGTHS & WEAKNESSES */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>✅ Strengths</p>
          <ul style={{ fontSize: "0.85rem" }}>
            {getStrengths().map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>⚠️ Areas to Improve</p>
          <ul style={{ fontSize: "0.85rem" }}>
            {getWeaknesses().map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </div>

      {/* THINKING STYLE */}
      <div>
        <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>🧩 Your Thinking Style</p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {getThinkingStyle()}
        </p>
      </div>

      {/* IMPROVEMENT PLAN */}
      <div>
        <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>📈 How You Can Improve</p>
        <ul style={{ fontSize: "0.85rem" }}>
          {getImprovements().map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      {/* GROWTH TIP (GREEN ITALIC) */}
      <div style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: "8px",
        padding: "0.8rem"
      }}>
        <p style={{
          fontWeight: "600",
          fontSize: "0.85rem",
          color: "#19fd91",
          fontStyle: "italic"
        }}>
          🚀 Growth Tip
        </p>

        <p style={{
          fontSize: "0.85rem",
          color: "#19fd91",
          fontStyle: "italic"
        }}>
          Your score shows your current level — not your limit. With regular practice, you can improve step by step.
        </p>
      </div>

    </div>
  );
}
    // 9. DIAGRAM ANALYSIS TEST

  //  Diagram Analysis Test (PROFILE PAGE)
if (testName === "Diagram Analysis Test" && result?.selectedShape) {

  const getDetailedExplanation = (shape) => {

    switch (shape) {

      case 1:
        return {
          explanation: `You are someone who enjoys action, movement, and new experiences.

You don’t like routine work — you feel more alive when things are changing and exciting. You are likely to take initiative and step forward rather than wait.

You enjoy being involved in activities and often prefer roles where you can lead, act, or explore.`,

          strengths: `✔ Energetic and proactive
✔ Good in dynamic environments
✔ Takes initiative easily
✔ Adapts quickly to change`,

          tip: `Try to balance excitement with consistency.
Sometimes routine is necessary for long-term success.
Focus on finishing what you start.`
        };

      case 2:
        return {
          explanation: `You are a deep thinker who understands yourself well.

You prefer meaningful conversations over casual talk. You are emotionally aware and value strong, genuine relationships.

You may not open up quickly, but when you do, your connections are deep and real.`,

          strengths: `✔ Emotionally aware
✔ Deep thinker
✔ Strong personal values
✔ Builds meaningful relationships`,

          tip: `Don’t isolate yourself too much.
Try to open up gradually and connect with more people.
Balance depth with social interaction.`
        };

      case 3:
        return {
          explanation: `You are practical, stable, and balanced.

You value simplicity and reliability. People trust you because you are consistent and grounded.

You prefer real, meaningful things over trends or unnecessary complexity.`,

          strengths: `✔ Reliable and stable
✔ Practical thinker
✔ Calm and balanced
✔ Trustworthy personality`,

          tip: `Try to step out of comfort zone sometimes.
Explore new ideas and experiences.
Growth happens when you challenge yourself.`
        };

      case 4:
        return {
          explanation: `You are cheerful, free-spirited, and love spontaneity.

You enjoy trying new things and dislike restrictions. You bring energy and positivity into situations.

You are naturally curious and open-minded.`,

          strengths: `✔ Positive and energetic
✔ Open to new experiences
✔ Fun to be around
✔ Curious mindset`,

          tip: `Be mindful of consistency.
Too much spontaneity can lead to lack of focus.
Balance fun with responsibility.`
        };

      case 5:
        return {
          explanation: `You are emotional, imaginative, and deeply connected to your feelings.

You value creativity, dreams, and emotional experiences. You may feel things more strongly than others.

Your inner world is rich and expressive.`,

          strengths: `✔ Creative and imaginative
✔ Emotionally deep
✔ Expressive personality
✔ Strong intuition`,

          tip: `Try not to let emotions control every decision.
Balance feelings with logic.
Stay grounded in practical reality when needed.`
        };

      default:
        return {};
    }
  };

  const details = getDetailedExplanation(result.selectedShape);

  return (
    <div style={{ marginTop: "10px" }}>

      {/* SHAPE */}
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Selected Shape: {result.selectedShape}
      </div>

      {/* PERSONALITY */}
      <div style={{
        fontSize: "1rem",
        fontWeight: "700",
        color: "var(--accent)",
        marginTop: "6px"
      }}>
        {result.personality}
      </div>

      {/* MAIN DESCRIPTION */}
      <div style={{
        marginTop: "8px",
        fontSize: "0.9rem",
        whiteSpace: "pre-line",
        lineHeight: "1.6"
      }}>
        {details.explanation}
      </div>

      {/* STRENGTHS */}
      <div style={{
        marginTop: "10px",
        fontSize: "0.9rem",
        whiteSpace: "pre-line"
      }}>
        <strong>What you're strong at:</strong>
        {details.strengths}
      </div>

      {/* ✅ GREEN BOX TIP */}
      <div style={{
        marginTop: "12px",
        background: "rgba(25,253,145,0.08)",
        border: "1px solid #19fd91",
        borderRadius: "10px",
        padding: "10px"
      }}>
        <div style={{
          fontWeight: "600",
          color: "#19fd91",
          marginBottom: "4px"
        }}>
          💡 Growth Tip
        </div>

        <div style={{
          fontSize: "0.85rem",
          color: "#19fd91",
          lineHeight: "1.5"
        }}>
          {details.tip}
        </div>
      </div>

    </div>
  );
}

    // 10. GEOMETRY PERSONALITY TEST
if (testName === "Geometry Personality Test" && result?.selectedShape) {

  const getShapeMeaning = (shape) => {
    switch (shape) {

      case "Triangle":
        return `You are a goal-driven and leadership-oriented personality. You naturally prefer taking control, setting direction, and achieving visible success. In real life, you may often take initiative in group situations and prefer being in charge rather than following others.`;

      case "Square":
        return `You are a structured and disciplined personality. You prefer order, planning, and clarity in life. In real situations, you are dependable, consistent, and focused on completing tasks in a systematic way without unnecessary chaos.`;

      case "Rectangle":
        return `You are in a phase of growth and transition. You are open-minded, flexible, and constantly learning. In real life, you adapt easily to new environments and are comfortable exploring change and uncertainty.`;

      case "Circle":
        return `You are a warm, emotional, and people-oriented personality. You value relationships, harmony, and emotional connection. In real life, you are often seen as caring, supportive, and someone people trust for emotional comfort.`;

      case "Squiggle":
        return `You are a creative, energetic, and unconventional thinker. You enjoy freedom, originality, and expressing yourself in unique ways. In real life, you often bring new ideas, spontaneity, and creativity into situations.`;

      default:
        return "";
    }
  };

  const getRealLifeConnection = (shape) => {
    switch (shape) {

      case "Triangle":
        return "This suggests you perform best in leadership roles, competitive environments, and situations where decision-making is required.";

      case "Square":
        return "This suggests you perform best in structured environments, routine tasks, and roles that require accuracy and responsibility.";

      case "Rectangle":
        return "This suggests you perform best in learning environments, new experiences, and situations requiring adaptability.";

      case "Circle":
        return "This suggests you perform best in team environments, social settings, and roles involving communication or support.";

      case "Squiggle":
        return "This suggests you perform best in creative environments, innovation-based work, and situations requiring imagination.";

      default:
        return "";
    }
  };
const getGrowthTip = (shape) => {
  switch (shape) {

    case "Triangle":
      return "Learn to balance leadership with listening. Not every situation needs control — sometimes collaboration brings better results.";

    case "Square":
      return "Try to be flexible with change. Not everything will go as planned, and adapting will help you grow faster.";

    case "Rectangle":
      return "Stay consistent while exploring new things. Too much change without direction can slow your progress.";

    case "Circle":
      return "Don’t ignore your own needs while caring for others. Set boundaries and take care of yourself too.";

    case "Squiggle":
      return "Focus on completing what you start. Creativity is powerful, but discipline turns ideas into results.";

    default:
      return "";
  }
};
  return (
    <div style={{ marginTop: "10px" }}>

      {/* HEADER */}
      <div style={{
        fontWeight: "700",
        color: "var(--accent)",
        fontSize: "1.05rem",
        marginBottom: "10px"
      }}>
        Geometry Personality Test Report
      </div>

      {/* SELECTED SHAPE */}
      <div style={{
        background: "rgba(25,253,145,0.08)",
        border: "1px solid rgba(25,253,145,0.25)",
        borderRadius: "14px",
        padding: "1.2rem",
        textAlign: "center",
        marginBottom: "14px"
      }}>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Selected Shape
        </div>

        <div style={{
          fontSize: "2rem",
          fontWeight: "800",
          color: "var(--accent)",
          marginTop: "6px"
        }}>
          {result.selectedShape}
        </div>
      </div>

      {/* PERSONALITY MEANING */}
      <div style={{
        background: "var(--bg-card)",
        padding: "16px",
        borderRadius: "12px",
        fontSize: "0.95rem",
        color: "var(--text-secondary)",
        lineHeight: "1.8"
      }}>
        <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>
          🧠 Personality Interpretation
        </div>
        {getShapeMeaning(result.selectedShape)}
      </div>

      {/* REAL LIFE CONNECTION */}
      <div style={{
        marginTop: "12px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "16px",
        borderRadius: "12px",
        fontSize: "0.9rem",
        color: "var(--text-secondary)",
        lineHeight: "1.7"
      }}>
        <div style={{ fontWeight: "600", marginBottom: "6px", color: "var(--text-primary)" }}>
          🔗 How This Relates to You
        </div>
        {getRealLifeConnection(result.selectedShape)}
      </div>

      {/* TRAITS (your original data kept) */}
      <div style={{
        marginTop: "12px",
        background: "rgba(25,253,145,0.05)",
        border: "1px solid rgba(25,253,145,0.15)",
        padding: "16px",
        borderRadius: "12px",
        fontSize: "0.9rem",
        whiteSpace: "pre-line",
        color: "var(--text-secondary)"
      }}>
        <div style={{ fontWeight: "600", marginBottom: "6px", color: "var(--text-primary)" }}>
          📊 Trait Breakdown
        </div>
        {result.traits}
      </div>
{/* ✅ GROWTH TIP BOX */}
<div style={{
  marginTop: "14px",
  background: "rgba(25,253,145,0.08)",
  border: "1px solid #19fd91",
  borderRadius: "12px",
  padding: "16px"
}}>

  <div style={{
    fontWeight: "600",
    color: "#19fd91",
    marginBottom: "6px"
  }}>
    💡 Growth Tip
  </div>

  <div style={{
    fontSize: "0.9rem",
    color: "#19fd91",
    lineHeight: "1.6"
  }}>
    {getGrowthTip(result.selectedShape)}
  </div>

</div>
    </div>
  );
}


    // 11. SOCIAL QUOTIENT TEST
    if (
      testName === "Social Quotient Test" &&
      result?.score !== undefined
    ) {

      const getSqInterpretation = (s) => {
  if (s >= 65) {
    return {
      title: "Very High Social Intelligence",
      strengths: `
You are naturally very comfortable around people and can easily understand how others feel.

You respond calmly and respectfully in conversations, even in difficult situations.

People likely trust you and feel safe sharing things with you because you listen and communicate clearly.

You are able to adjust your communication style depending on the person and situation, which makes you socially adaptable.
`,
      growthTip: `
Continue building confidence in challenging conversations or leadership situations.

Make sure you don’t always adjust yourself just to please others — your own boundaries are important too.

Use your strong social skills to guide and support others positively.
`
    };
  }

  if (s >= 50) {
    return {
      title: "High / Healthy Social Skills",
      strengths: `
You handle social situations well and can communicate your thoughts clearly.

You are able to understand others’ feelings most of the time and respond appropriately.

You are a good listener and can maintain healthy and meaningful conversations.

People likely see you as friendly, approachable, and easy to talk to.
`,
      growthTip: `
Work on staying calm when receiving criticism or feedback.

Practice being more confident in uncomfortable or new social situations.

Try to express your thoughts openly instead of holding back.
`
    };
  }

  if (s >= 35) {
    return {
      title: "Moderate Social Skills",
      strengths: `
You can manage basic social interactions and connect with people in familiar situations.

You understand others to some extent, but may sometimes feel unsure about how to respond.

You have the ability to build strong social skills — you just need more confidence and practice.
`,
      growthTip: `
Practice active listening and focus fully when someone is speaking.

Improve eye contact and confidence when talking to new people.

Try to notice small emotional signals like tone, expressions, and body language.
`
    };
  }

  return {
    title: "Needs Social Skill Development",
    strengths: `
You may prefer quiet environments or smaller groups where you feel more comfortable.

You tend to think before speaking, which can actually be a strength when used well.
`,
  growthTip: [
  "Practice active listening and focus fully when someone is speaking.",
  "Improve eye contact and confidence when talking to new people.",
  "Try to notice small emotional signals like tone, expressions, and body language."
]
  };
};

      const interpretation = getSqInterpretation(result.score);

      return (
        <div style={{ marginTop: "10px" }}>

          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "5px" }}>
            SQ Score
          </div>

          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent)" }}>
            {result.score}
          </div>

          {/* Level Title */}
          <div style={{ marginTop: "8px", fontSize: "1rem", fontWeight: "700", color: "var(--accent)" }}>
            {interpretation.title}
          </div>

          {/* Strengths */}
          <div style={{ marginTop: "10px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
            <strong>What you're strong at:</strong>
            {interpretation.strengths}
          </div>

          {/* Growth Tip */}
   {/* GROWTH TIP BOX */}
<div style={{
  marginTop: "14px",
  background: "rgba(34,197,94,0.08)",
  border: "1px solid rgba(34,197,94,0.3)",
  borderRadius: "10px",
  padding: "10px"
}}>

  <div style={{
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#19fd91",
    fontStyle: "italic"
  }}>
    🚀 Growth Tip
  </div>

  <div style={{
    marginTop: "6px",
    fontSize: "0.9rem",
    color: "#19fd91",
    fontStyle: "italic",
    lineHeight: "1.4"
  }}>

    {/* ✅ HANDLE BOTH STRING + ARRAY */}
    {Array.isArray(interpretation.growthTip)
      ? interpretation.growthTip.map((tip, i) => (
          <div key={i}>• {tip}</div>
        ))
      : interpretation.growthTip
          .trim()
          .split("\n")
          .filter(line => line.trim() !== "")
          .map((line, i) => (
            <div key={i}>• {line.trim()}</div>
          ))
    }

  </div>

</div>

        </div>
      );
    }
const WORD_MEANINGS = {
  happy: "You have a positive mindset and naturally focus on the brighter side of situations.",
  lazy: "You prefer comfort and may avoid unnecessary effort unless required.",
  impatient: "You like quick results and may feel frustrated with delays.",
  patient: "You stay calm and composed even when things take time.",
  genuine: "You are real, honest, and value authenticity in yourself and others.",
  elegant: "You appreciate grace, style, and refined behavior.",
  peaceful: "You prefer calm environments and avoid unnecessary conflict.",
  reserved: "You are quiet and take time before opening up to others.",
  witty: "You are quick-thinking and enjoy humor and clever conversations.",
  sentimental: "You value emotions, memories, and deep connections.",
  lovely: "You see kindness and warmth as important traits.",
  dependent: "You may rely on others for support or decisions.",
  loyal: "You value commitment and stand by people you care about.",
  lethargic: "You may feel low energy or prefer slower-paced environments.",
  dramatic: "You express emotions strongly and intensely.",
  overdramatic: "You may sometimes react more emotionally than needed.",
  talented: "You recognize skills and abilities, both in yourself and others.",
  charismatic: "You are naturally attractive in personality and influence people easily.",
  honest: "You value truth and transparency in communication.",
  naive: "You tend to trust easily and may see things in a simple way.",
  shy: "You may feel hesitant in social situations, especially new ones.",
  kind: "You are caring, compassionate, and considerate toward others.",
  passionate: "You feel strongly about things and put energy into what you love.",
  insecure: "You may sometimes doubt yourself or your abilities.",
  secure: "You are confident and comfortable with yourself.",
  thoughtful: "You think deeply and consider others before acting.",
  restless: "You like movement, change, and may feel bored easily.",
  outgoing: "You enjoy socializing and interacting with people.",
  sweet: "You are gentle, friendly, and easy to be around.",
  sincere: "You are honest and true in your actions and intentions.",
  charming: "You naturally attract people with your personality.",
  courageous: "You are brave and willing to face challenges.",
  compassionate: "You deeply care about others’ feelings.",
  helpful: "You like supporting and assisting others.",
  stubborn: "You stick strongly to your opinions and decisions.",
  calculating: "You think logically and plan before acting"
};
// 13. PERCEPTION PERSONALITY TEST
if (
  testName === "Perception Personality Test" &&
  result?.selectedWords
) {
  const words = result.selectedWords;

  return (
    <div style={{ marginTop: "10px" }}>

      {/* TITLE */}
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Perception Personality
      </div>

      {/* WORD BADGES */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "10px"
      }}>
        {words.map((w, i) => (
          <div key={i} style={{
            padding: "6px 12px",
            background: "#19fd91",
            color: "#000",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "600"
          }}>
            {w}
          </div>
        ))}
      </div>

      {/* ✅ EACH WORD EXPLANATION */}
      <div style={{ marginTop: "12px" }}>
        {words.map((w, i) => (
          <div key={i} style={{
            marginBottom: "10px",
            fontSize: "0.9rem",
            lineHeight: "1.5"
          }}>
            <strong style={{ color: "#19fd91" }}>{w}:</strong>{" "}
            {WORD_MEANINGS[w.toLowerCase()] || "This trait reflects a unique part of your personality."}
          </div>
        ))}
      </div>

      {/* ✅ FINAL SUMMARY */}
      <div style={{
        marginTop: "12px",
        fontSize: "0.9rem",
        lineHeight: "1.6",
        color: "var(--text-muted)"
      }}>
        These words represent how your mind naturally observes people and situations.  
        They reflect your inner personality, values, and emotional thinking style.
      </div>

      {/* ✅ GREEN BOX TIP */}
      <div style={{
        marginTop: "15px",
        background: "rgba(25,253,145,0.08)",
        border: "1px solid #19fd91",
        borderRadius: "10px",
        padding: "12px"
      }}>
        <div style={{
          fontSize: "0.9rem",
          fontWeight: "600",
          color: "#19fd91",
          marginBottom: "5px"
        }}>
          💡 Growth Tip
        </div>

        <div style={{
          fontSize: "0.85rem",
          color: "#19fd91",
          lineHeight: "1.5"
        }}>
          Try to understand people beyond first impressions.  
          Your perception is strong, but combining it with deeper understanding will make your decisions even better.
        </div>
      </div>

    </div>
  );
}
    // 12. PERSONALITY QUOTIENT TEST (PQ)
if (
  testName === "Personality Quotient Test (PQ)" &&
  result?.score !== undefined
) {

  const getPqInterpretation = (s) => {

    if (s >= 40) {
      return {
        title: "Excellent People Understanding",

        explanation: `You have a very strong ability to understand people.

You can easily notice how others feel just by observing their tone, expressions, or behavior. You are good at reading situations and adjusting your response accordingly.

You probably communicate in a way that makes others feel comfortable and understood. Because of this, people may trust you easily and enjoy talking to you.

You are also able to handle social and professional situations confidently. Whether it's teamwork, leadership, or conversations — you naturally perform well.

This is a powerful skill in real life, especially in careers that involve people, communication, or decision-making.`,

        strengths: `✔ You understand emotions quickly
✔ You read body language and behavior well
✔ You build trust easily with people
✔ You handle social situations confidently`,

        growthTip: `Keep challenging yourself in leadership roles.
Don’t always adjust yourself for others — your boundaries matter.
Use your skills to guide and support people positively.`
      };
    }

    if (s >= 30) {
      return {
        title: "Strong Social Awareness",

        explanation: `You have a good understanding of people and relationships.

Most of the time, you can understand how others feel and respond in a reasonable way. You are able to communicate clearly and maintain healthy conversations.

You are someone who can build meaningful connections, whether in friendships, college, or work environments.

Sometimes, you may miss very small emotional signals, but overall your social understanding is strong and reliable.

With a little more awareness and practice, you can become excellent at reading people.`,

        strengths: `✔ You understand common emotions
✔ You communicate clearly
✔ You build stable relationships
✔ You are approachable and friendly`,

        growthTip: `Focus on small emotional signals like tone and expressions.
Practice deeper listening instead of just responding.
Be more confident in expressing your thoughts openly.`
      };
    }

    if (s >= 20) {
      return {
        title: "Developing Social Skills",

        explanation: `You have basic social understanding, but there is room to grow.

You can handle simple conversations and situations, especially with familiar people. However, in new or complex situations, you may feel unsure about how to respond.

Sometimes you might not fully understand what others are feeling, or you may take time to react.

The good part is — you have strong potential to improve. Social intelligence is not fixed, it improves with practice.

With regular effort, you can become much more confident and comfortable in social situations.`,

        strengths: `✔ You can handle basic conversations
✔ You can connect with familiar people
✔ You have good potential to improve`,

        growthTip: `Practice active listening — focus fully when someone talks.
Improve eye contact and confidence.
Observe how people express emotions through body language.`
      };
    }

    return {
      title: "Needs Improvement",

      explanation: `You may find social situations a bit challenging right now.

Understanding emotions, body language, or reactions of others might feel confusing sometimes. You may also feel uncomfortable starting or continuing conversations.

But this is completely okay — social skills are learned, not fixed.

Many people improve these skills over time by practicing simple habits daily.

You can definitely improve your confidence and understanding step by step.`,

      strengths: `✔ You think before speaking
✔ You may prefer calm and quiet environments`,

      growthTip: `Start with small daily conversations.
Practice eye contact and clear speaking.
Observe how people behave and react in different situations.
With consistency, your social skills will improve.`
    };
  };

  const interpretation = getPqInterpretation(result.score);

  return (
    <div style={{ marginTop: "10px" }}>

      {/* LABEL */}
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        PQ Score
      </div>

      {/* SCORE */}
      <div style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "var(--accent)"
      }}>
        {result.score}
      </div>

      {/* LEVEL */}
      <div style={{
        marginTop: "6px",
        fontSize: "1rem",
        fontWeight: "700",
        color: "var(--accent)"
      }}>
        {interpretation.title}
      </div>

      {/* EXPLANATION */}
      <div style={{
        marginTop: "10px",
        fontSize: "0.9rem",
        color: "var(--text-muted)",
        lineHeight: "1.6",
        whiteSpace: "pre-line"
      }}>
        {interpretation.explanation}
      </div>

      {/* STRENGTHS */}
      <div style={{
        marginTop: "12px",
        fontSize: "0.9rem",
        whiteSpace: "pre-line",
        lineHeight: "1.5"
      }}>
        <strong>What you're strong at:</strong>
        {"\n"}
        {interpretation.strengths}
      </div>

  {/* GROWTH TIP BOX */}
<div style={{
  marginTop: "14px",
  background: "rgba(34,197,94,0.08)",   // light green bg
  border: "1px solid rgba(34,197,94,0.3)",
  borderRadius: "10px",
  padding: "10px"
}}>

  <div style={{
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#19fd91",
    fontStyle: "italic"
  }}>
    🚀 Growth Tip
  </div>

  <div style={{
    marginTop: "6px",
    fontSize: "0.9rem",
    color: "#19fd91",
    fontStyle: "italic",
    whiteSpace: "pre-line",
    lineHeight: "1.5"
  }}>
    {interpretation.growthTip.trim()}
  </div>

</div>

    </div>
  );
}

// Career Interest Assessment
if (
  testName === "Career Interest Assessment" &&
  result?.topThree
) {
  return (
    <div style={{ marginTop: "12px" }}>
      <h3
        style={{
          color: "var(--accent)",
          marginBottom: "12px",
        }}
      >
        Career Interest Assessment
      </h3>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "16px",
        }}
      >
        Your top three career interest clusters are:
      </p>

      {result.topThree.map((item, index) => (
        <div
          key={item.id}
          style={{
            marginBottom: "12px",
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(25,253,145,0.08)",
            border: "1px solid rgba(25,253,145,0.25)",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "700",
              color: "var(--accent)",
            }}
          >
            #{index + 1} {item.title}
          </div>

          <div
            style={{
              marginTop: "6px",
              color: "var(--text-primary)",
            }}
          >
            Score: <strong>{item.score} / 15</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
    return null;
  };


  if (loading) return <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>Loading profile...</div>;
  if (error) return <div style={{ padding: "2rem", textAlign: "center", color: "#ff5252" }}>{error}</div>;

  if (!user) return null;

  // ✅ Exclude IELTS, TOEFL, and GRE tests entirely from the profile page
  const excludedTestHistory = (user.testHistory || []).filter((test) => {
    const name = (test.testName || "").toLowerCase();
    return !name.includes("ielts") && !name.includes("toefl") && !name.includes("gre");
  });

  const latestTestsMap = {};

  excludedTestHistory.forEach((test) => {
    const name = test.testName;

    if (!latestTestsMap[name]) {
      latestTestsMap[name] = test;
    } else {
      const existingDate = new Date(latestTestsMap[name].date);
      const currentDate = new Date(test.date);

      if (currentDate > existingDate) {
        latestTestsMap[name] = test;
      }
    }
  });

  const latestTests = Object.values(latestTestsMap)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ minHeight: "90vh", background: "var(--bg-main)", padding: "4rem 1rem" }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "var(--bg-card)",
        borderRadius: "24px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>

        {/* --- Header Section --- */}
        <div style={{
          background: "linear-gradient(135deg, var(--accent), #29ff8f)",
          padding: "3rem 2rem",
          textAlign: "center",
          color: "#021409",
          width: "100%"
        }}>
          <div style={{
            width: "100px", height: "100px", background: "#fff",
            borderRadius: "50%", margin: "0 auto 1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem", fontWeight: "bold", color: "var(--accent)"
          }}>
            {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 style={{ margin: 0, fontSize: "2rem" }}>{user.fullname || "User"}</h1>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.9, fontSize: "1.1rem" }}>{user.email}</p>
          {user.isVerified && (
            <span style={{
              display: "inline-block", marginTop: "10px",
              background: "rgba(0,0,0,0.1)", padding: "4px 12px",
              borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600"
            }}>
              ✅ Verified Account
            </span>
          )}
        </div>

        {/* --- Test History Section --- */}
        <div style={{ padding: "3rem 2rem", width: "100%" }}>
          <h2 style={{ color: "var(--text-main)", borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "20px" }}>
            Test History
          </h2>

          {(!excludedTestHistory || excludedTestHistory.length === 0) ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
              <p>You haven't taken any tests yet.</p>
              <button
                onClick={() => navigate("/")}
                className="cta-btn"
                style={{ marginTop: "1rem" }}
              >
                Explore Tests
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Responsive Grid
              gap: "1.5rem"
            }}>
{latestTests.map((test, index) => (
                <div key={index} style={{
                  background: "var(--bg-main)",
                  padding: "1.5rem",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color)",
                  borderLeft: "5px solid var(--accent)",
                  transition: "transform 0.2s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                  {/* Top Row: Name & Date */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--text-main)" }}>{test.testName}</h3>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    {formatDate(test.date)}
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "var(--border-color)", width: "100%", marginBottom: "1rem" }}></div>

                  {/* Dynamic Details */}
                  {renderTestDetails(test)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Big Red Logout Button */}
        <button
          onClick={() => {
            if (onLogout) onLogout();
            navigate("/login");
          }}
          style={{
            marginTop: "1rem",
            marginBottom: "3rem",
            background: "#ff5252",
            color: "white",
            border: "none",
            padding: "0.8rem 3rem",
            borderRadius: "50px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255, 82, 82, 0.4)",
            transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          Log Out
        </button>

      </div>
    </div>
  );
}

export default ProfilePage;