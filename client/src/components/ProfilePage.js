// src/components/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api"; 
// --- HELPERS ---

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

// MBTI short descriptions (one-line summaries)
const MBTI_DESCRIPTIONS = {
  ISTJ: "Responsible, organized, and practical — dependable administrators.",
  ISFJ: "Supportive, warm, and conscientious — protectors of tradition.",
  INFJ: "Insightful, principled, and altruistic — quiet visionaries.",
  INTJ: "Strategic, independent, and analytical — long-range planners.",
  ISTP: "Adaptable, logical, and observant — hands-on problem solvers.",
  ISFP: "Gentle, creative, and spontaneous — sensitive artists.",
  INFP: "Idealistic, compassionate, and introspective — driven by values.",
  INTP: "Curious, theoretical, and objective — conceptual thinkers.",
  ESTP: "Energetic, pragmatic, and resourceful — action-oriented doers.",
  ESFP: "Outgoing, playful, and vivacious — performers and motivators.",
  ENFP: "Enthusiastic, imaginative, and warm — idea-oriented inspirers.",
  ENTP: "Inventive, quick-witted, and energetic — debaters and innovators.",
  ESTJ: "Organized, direct, and pragmatic — natural leaders.",
  ESFJ: "Caring, social, and conscientious — community builders.",
  ENFJ: "Charismatic, empathetic, and motivating — gifted communicators.",
  ENTJ: "Decisive, assertive, and strategic — born executives.",
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

  const API_URL =  getApiBaseUrl();

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
            "Authorization": token,
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
    if (testName.includes("MBTI") || (result && result.type)) {
      const desc = MBTI_DESCRIPTIONS[result.type] || result.description || "Personality type result saved.";
      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent)" }}>
            {result.type}
          </div>
          <div style={{ fontSize: "0.95rem", marginTop: "6px", color: "var(--text-primary)" }}>{desc}</div>
          {result.details && (
            <div style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              {result.details}
            </div>
          )}
        </div>
      );
    }

    // 2. LEFT BRAIN AND RIGHT BRAIN
    if (testName.includes("Left Brain") && result.dominance && result.careers) {
      return (
        <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 0.5rem 0" }}>
              Brain Dominance
            </p>
            <p style={{ fontSize: "1.3rem", color: "var(--accent)", fontWeight: "700", margin: 0 }}>
              {result.dominance}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "0.5rem 0 0 0" }}>
              {result.isRightBrain
                ? "Creative, intuitive, holistic thinker"
                : "Analytical, logical, detail-oriented thinker"}
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-primary)", margin: "0 0 0.6rem 0" }}>
              🎯 Suited Career Paths:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem" }}>
              {result.careers.slice(0, 6).map((career, idx) => (
                <div key={idx} style={{ color: "var(--text-secondary)" }}>
                  • {career}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // 3. RIASEC — Detailed Holland Code Result
    if (
      testName.toLowerCase().includes("riasec") &&
      result?.code &&
      result?.counts &&
      result?.top
    ) {
      return (
        <div style={{ marginTop: "12px" }}>

          {/* Holland Code */}
          <div
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Holland Interest Code
            </div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "var(--accent)",
                letterSpacing: "0.3em",
              }}
            >
              {result.code}
            </div>
          </div>

          {/* Scores */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>
              Interest Scores
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "6px",
                fontSize: "0.85rem",
              }}
            >
              {Object.entries(result.counts).map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: "var(--bg-card)",
                    padding: "6px",
                    borderRadius: "6px",
                    textAlign: "center",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>{k}</strong>
                  <div>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Detailed Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {result.top.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "var(--accent)",
                    marginBottom: "4px",
                  }}
                >
                  {idx + 1}. {t.letter} — {t.name} ({t.count})
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  {t.description}
                </div>

                <div style={{ fontSize: "0.8rem", marginBottom: "4px" }}>
                  <strong>Majors:</strong> {t.majors.join(", ")}
                </div>

                <div style={{ fontSize: "0.8rem" }}>
                  <strong>Pathways:</strong> {t.pathways.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }


    // 4. 16PF
    if (testName.includes("16PF")) {
      const scores = result.scores || result.raw || null;
      if (scores && typeof scores === "object") {
        return (
          <div style={{ marginTop: "10px" }}>
            <div style={{ fontWeight: "600", color: "var(--accent)", marginBottom: "8px" }}>16PF Results</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "0.9rem" }}>
              {Object.entries(scores).map(([k, v]) => (
                <div key={k} style={{ background: "var(--bg-card)", padding: "6px 8px", borderRadius: "6px" }}>
                  <strong style={{ marginRight: "6px" }}>{k}:</strong> {v}
                </div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div style={{ marginTop: "10px", fontSize: "0.9rem", fontStyle: "italic", opacity: 0.9 }}>
          16 Personality Factors result saved. View full report for detailed factor scores.
        </div>
      );
    }

// --- BIG FIVE ---
if (testName.toLowerCase().includes("big five") && result?.raw) {
  const { raw, description } = result;
  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ fontWeight: "600", color: "var(--accent)", marginBottom: "8px" }}>
        Big Five Personality Traits
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <strong>Extraversion (E):</strong> {raw.E} ({description?.Extraversion || 'N/A'})
        </li>
        <li>
          <strong>Agreeableness (A):</strong> {raw.A} ({description?.Agreeableness})
        </li>
        <li>
          <strong>Conscientiousness (C):</strong> {raw.C} ({description?.Conscientiousness})
        </li>
        <li>
          <strong>Neuroticism (N):</strong> {raw.N} ({description?.Neuroticism})
        </li>
        <li>
          <strong>Openness (O):</strong> {raw.O} ({description?.Openness})
        </li>
      </ul>
      
    </div>
  );
}

    // TOEFL (Reading / Writing)
    if (testName.toLowerCase().includes("toefl") && result && (result.score !== undefined)) {
      const total = Number(result.total) || 0;
      const score = Number(result.score) || 0;
      const percentage = result.percentage || (total ? Math.round((score / total) * 100) + '%' : 'N/A');

      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontWeight: "700", color: "var(--accent)", fontSize: "1.05rem", marginBottom: "6px" }}>
            Score: {score} / {total} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>({percentage})</span>
          </div>
        </div>
      );
    }

    // IELTS (Reading / Listening / Speaking / Writing)
    if ((testName.toLowerCase().includes("ielts") || testName.toLowerCase().includes("reading") || testName.toLowerCase().includes("listening")) && result && (result.score !== undefined)) {
      const total = Number(result.total) || 40;
      const score = Number(result.score) || 0;
      const percentage = result.percentage || (total ? Math.round((score / total) * 100) + '%' : 'N/A');

      // Scale to 40 and compute approximate IELTS band using common conversion ranges
      const scaledRaw = Math.round((score / total) * 40);
      const bandMap = [
        [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [7, 3.5], [5, 3], [3, 2.5], [1, 2], [0, 0]
      ];
      let band = 0;
      for (const [minRaw, b] of bandMap) {
        if (scaledRaw >= minRaw) { band = b; break; }
      }

      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontWeight: "700", color: "var(--accent)", fontSize: "1.05rem", marginBottom: "6px" }}>
            Score: {score} / {total} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>({percentage})</span>
          </div>
          <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginTop: "6px" }}>
            Estimated IELTS Band: <strong style={{ color: "var(--accent)", marginLeft: "6px" }}>{band}</strong>
          </div>
        </div>
      );
    }

    // 3. CAREER ANCHORS
    if (testName.includes("Career") && result.topAnchors) {
      const anchors = result.topAnchors.slice(0, 3);
      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontWeight: "bold", color: "var(--accent)", fontSize: "1.05rem", marginBottom: "6px" }}>
            Top Career Anchors
          </div>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {anchors.map((a, idx) => {
              const code = a[0];
              const score = a[1];
              return (
                <div key={idx} style={{ background: "var(--bg-card)", padding: "6px 10px", borderRadius: "8px", border: "1px solid rgba(34,197,94,0.08)", fontSize: "0.9rem" }}>
                  {CAREER_ANCHORS_MAP[code] || code} {score ? `— ${score}` : ""}
                </div>
              );
            })}
          </div>
        </div>
      );
    }


    // 5. 16PF
    if (testName.includes("16PF")) {
      return (
        <div style={{ marginTop: "10px", fontSize: "0.9rem", fontStyle: "italic", opacity: 0.8 }}>
          16 Personality Factors Analyzed
        </div>
      );
    }

    // 6. IQ TEST
    if (testName === "IQ Test" && result?.score) {
      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "5px" }}>
            IQ Score
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent)" }}>
            {result.score}
          </div>
          <div style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-main)" }}>
            {result.score >= 130 ? "Very Superior" :
              result.score >= 120 ? "Superior" :
                result.score >= 110 ? "High Average" :
                  result.score >= 90 ? "Average" :
                    result.score >= 80 ? "Low Average" : "Below Average"}
          </div>
        </div>
      );
    }

    // 7. EQ TEST
    if (testName === "EQ Test" && result?.score !== undefined) {
      const getEqInterpretation = (s) => {
        if (s >= 84) return "You have very high EI";
        if (s >= 64) return "High emotional intelligence";
        if (s >= 37) return "Neither low nor high";
        if (s >= 17) return "Low emotional intelligence";
        return "Very low emotional intelligence";
      };

      return (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "5px" }}>
            EQ Score
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent)" }}>
            {result.score}
          </div>
          <div style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-main)" }}>
            {getEqInterpretation(result.score)}
          </div>
        </div>
      );
    }
    // DR PHIL PERSONALITY TEST

// DR PHIL PERSONALITY TEST
if (testName.includes("Dr Phil") && result?.score !== undefined) {
  return (
    <div style={{ marginTop: "15px" }}>
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Personality Score
      </div>

      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "var(--accent)",
          marginTop: "5px"
        }}
      >
        {result.score}
      </div>

      <div
        style={{
          marginTop: "15px",
          fontSize: "0.95rem",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap",   // 🔥 CRITICAL
          wordBreak: "break-word"
        }}
      >
        {result.interpretation}
      </div>
    </div>
  );
}
// 8. PERCEPTION PERSONALITY TEST
if (
  testName === "Perception Personality Test" &&
  result?.selectedWords
) {
  return (
    <div style={{ marginTop: "10px" }}>
      
      {/* Word Badges */}
      <div style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "10px"
      }}>
        {result.selectedWords.map((word, idx) => (
          <span
            key={idx}
            style={{
              padding: "6px 12px",
              background: "var(--accent)",
              color: "#000",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600"
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* AI Generated Description */}
      {result.generatedDescription && (
        <div style={{
          marginTop: "8px",
          fontSize: "0.9rem",
          color: "var(--text-primary)",
          lineHeight: "1.5"
        }}>
          {result.generatedDescription}
        </div>
      )}

    </div>
  );
  
}
// 9. DIAGRAM ANALYSIS TEST

if (testName === "Diagram Analysis Test" && result?.selectedShape) {
  return (
    <div style={{ marginTop: "10px" }}>

      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Selected Shape: {result.selectedShape}
      </div>

      {result.personality && (
        <div style={{
          fontSize: "1rem",
          fontWeight: "700",
          color: "var(--accent)",
          marginTop: "6px"
        }}>
          {result.personality}
        </div>
      )}

      {result.description && (
        <div style={{
          marginTop: "8px",
          fontSize: "0.9rem",
          color: "var(--text-primary)",
          whiteSpace: "pre-line",
          lineHeight: "1.5"
        }}>
          {result.description}
        </div>
      )}

    </div>
  );
}
// 10. GEOMETRY PERSONALITY TEST
if (testName === "Geometry Personality Test" && result?.selectedShape) {
  return (
    <div style={{ marginTop: "10px" }}>
      
      {/* Selected Shape */}
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Selected Shape: {result.selectedShape}
      </div>

      {/* Traits */}
      <div style={{
        marginTop: "8px",
        fontSize: "0.95rem",
        fontWeight: "600",
        color: "var(--accent)",
        whiteSpace: "pre-line"
      }}>
        {result.traits}
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
You are naturally good with people.
You understand emotions quickly and respond in a calm, respectful way.
People likely feel comfortable talking to you.
You communicate clearly and listen well.
`,
        growthTip: `
Keep building confidence in difficult conversations.
Make sure you don’t always adjust yourself just to please others.
`
      };
    }

    if (s >= 50) {
      return {
        title: "High / Healthy Social Skills",
        strengths: `
You handle social situations well.
You can express yourself clearly and usually understand others.
You are a good listener and can maintain healthy conversations.
`,
        growthTip: `
Work on handling criticism calmly.
Practice being more confident in tough or awkward situations.
`
      };
    }

    if (s >= 35) {
      return {
        title: "Moderate Social Skills",
        strengths: `
You manage basic social situations well.
You can communicate and connect, but sometimes feel unsure.
You have the ability — you just need more confidence.
`,
        growthTip: `
Practice active listening.
Improve eye contact and confidence in starting conversations.
Work on understanding subtle emotional signals.
`
      };
    }

    return {
      title: "Needs Social Skill Development",
      strengths: `
You may prefer smaller groups or quiet environments.
You likely think deeply before speaking.
`,
      growthTip: `
Practice small daily conversations.
Work on eye contact and clear communication.
Try to understand others’ feelings before reacting.
Remember — social skills improve with practice.
`
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
      <div style={{ marginTop: "10px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
        <strong>Growth Tip:</strong>
        {interpretation.growthTip}
      </div>

    </div>
  );
}

// 12. PERSONALITY QUOTIENT (PQ) TEST

if (
  testName === "Personality Quotient Test (PQ)" &&
  result?.score !== undefined
) {

  const getPqInterpretation = (s) => {
    if (s >= 40) {
      return {
        strengths: `
You have a strong understanding of human behavior.
You quickly pick up social cues and body language.
You naturally build trust in conversations.
You navigate professional and social environments with confidence.
`,
        growthTip: `
Continue sharpening emotional awareness.
Consider leadership or mentoring roles where perception skills are valuable.
`
      };
    }

    if (s >= 30) {
      return {
        strengths: `
You understand relationship dynamics well.
You interpret common emotional signals accurately.
You build meaningful and stable connections.
`,
        growthTip: `
Improve attention to subtle micro-expressions.
Practice deeper empathy in complex or sensitive situations.
`
      };
    }

    if (s >= 20) {
      return {
        strengths: `
You manage basic social situations comfortably.
You can maintain conversations and build rapport.
You have strong potential to improve further.
`,
        growthTip: `
Observe body language more carefully.
Strengthen active listening and emotional responsiveness.
`
      };
    }

    return {
      strengths: `
You may rely more on logic than emotional cues.
Some complex social dynamics may feel challenging.
`,
      growthTip: `
Work on eye contact and listening skills.
Observe how people express emotions non-verbally.
Practice engaging in small group conversations regularly.
`
    };
  };

  const interpretation = getPqInterpretation(result.score);

  return (
    <div style={{ marginTop: "10px" }}>

      {/* Score Label */}
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "5px" }}>
        PQ Score
      </div>

      {/* Score Number */}
      <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent)" }}>
        {result.score}
      </div>

      {/* Saved Level From Backend */}
      <div style={{
        marginTop: "6px",
        fontSize: "1rem",
        fontWeight: "700",
        color: "var(--accent)"
      }}>
        {result.level}
      </div>

      {/* Strengths Section */}
      <div style={{ marginTop: "12px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
        <strong>What you're strong at:</strong>
        {interpretation.strengths}
      </div>

      {/* Growth Tip Section */}
      <div style={{ marginTop: "12px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
        <strong>Growth Tip:</strong>
        {interpretation.growthTip}
      </div>

    </div>
  );
}

    return null;
  };

  if (loading) return <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>Loading profile...</div>;
  if (error) return <div style={{ padding: "2rem", textAlign: "center", color: "#ff5252" }}>{error}</div>;
  if (!user) return null;

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

          {(!user.testHistory || user.testHistory.length === 0) ? (
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
              {user.testHistory.slice().reverse().map((test, index) => (
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
