import React, { useState } from "react";
import getApiBaseUrl from "../utils/api";

import triangleImg from "../assets/triangle.png";
import squareImg from "../assets/square.png";
import rectangleImg from "../assets/rectangle.png";
import circleImg from "../assets/circle.png";
import squiggleImg from "../assets/squiggle.png";

const TEST_NAME = "Geometry Personality Test";

const SHAPES = [
  {
    id: 1,
    name: "Triangle",
    image: triangleImg,
    traits: `Wannabe LEADER
Upwardly-mobile
Loves recognition
Loves to be in charge
Controlling and opinionated`
  },
  {
    id: 2,
    name: "Square",
    image: squareImg,
    traits: `SYSTEMATIC
Organized
Hard-working
Precise and Punctual
To-the-point`
  },
  {
    id: 3,
    name: "Rectangle",
    image: rectangleImg,
    traits: `ADAPTABLE nature
Flexible
Loves learning
Open to new things
In a state of transition`
  },
  {
    id: 4,
    name: "Circle",
    image: circleImg,
    traits: `Lovable & nurturer
Warm & friendly
Promotes harmony
Good communicator
Needs people and approval`
  },
  {
    id: 5,
    name: "Squiggle",
    image: squiggleImg,
    traits: `Highly DRAMATIC
Unconventional
Creative
Energetic
Spontaneous`
  }
];

function Geometry() {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");

  const API_URL = getApiBaseUrl();

  const handleSubmit = async () => {
    if (!selected) {
      alert("Please select a shape first.");
      return;
    }

    const chosen = SHAPES.find((shape) => shape.id === selected);
    if (!chosen) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/tests/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          testName: TEST_NAME,
          result: {
            selectedShape: chosen.name,
            traits: chosen.traits
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(chosen);
        setSavedMessage("✅ Result saved to your profile!");
      } else {
        alert(data.message || "Error saving result.");
      }

    } catch (error) {
      console.error("Error saving result:", error);
      alert("Server error. Try again.");
    }
  };

  const handleRetake = () => {
    setSelected(null);
    setResult(null);
    setSavedMessage("");
  };

  /* ---------------- RESULT SCREEN ---------------- */

  if (result) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>{TEST_NAME}</h1>

        <div style={styles.resultCard}>
          <h2>You selected: {result.name}</h2>

          <img
            src={result.image}
            alt={result.name}
            style={styles.resultImage}
          />

          <div style={styles.descriptionText}>
            {result.traits}
          </div>

          {savedMessage && (
            <div style={{ marginTop: "15px", color: "#19fd91" }}>
              {savedMessage}
            </div>
          )}

          <button style={styles.button} onClick={handleRetake}>
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- SELECTION SCREEN ---------------- */

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{TEST_NAME}</h1>

      {/* ✅ NEW DESCRIPTION DIV SECTION */}
      <div style={styles.descriptionCard}>
        <p style={styles.descriptionTextCard}>
          This test reveals your personality traits based on the geometric
          shape you feel most connected to.
        </p>
        <p style={styles.descriptionTextCard}>
          Your preferred shape reflects your leadership style, behavior
          patterns, and how you interact with the world.
        </p>
      </div>

      <p style={styles.subText}>
        Select the shape that appeals to you most.
      </p>

      <div style={styles.row}>
        {SHAPES.map((shape) => (
          <div
            key={shape.id}
            style={{
              ...styles.card,
              border:
                selected === shape.id
                  ? "2px solid #19fd91"
                  : "1px solid rgba(255,255,255,0.08)",
              transform:
                selected === shape.id ? "translateY(-10px)" : "none",
              boxShadow:
                selected === shape.id
                  ? "0 0 25px rgba(25,253,145,0.4)"
                  : "0 10px 25px rgba(0,0,0,0.4)"
            }}
            onClick={() => setSelected(shape.id)}
          >
            <img
              src={shape.image}
              alt={shape.name}
              style={styles.image}
            />
          </div>
        ))}
      </div>

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "140px auto 80px",
    padding: "0 20px",
    textAlign: "center",
    minHeight: "70vh"
  },

  heading: {
    fontSize: "36px",
    color: "#19fd91",
    marginBottom: "10px"
  },

  /* ✅ DESCRIPTION CARD STYLE */
  descriptionCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(25,253,145,0.3)",
    borderRadius: "18px",
    padding: "25px",
    maxWidth: "700px",
    margin: "20px auto 40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  descriptionTextCard: {
    color: "#ccc",
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "10px"
  },

  subText: {
    color: "#ccc",
    marginBottom: "50px",
    fontSize: "16px"
  },

  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "40px"
  },

  card: {
    width: "200px",
    height: "200px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    width: "75%",
    transition: "0.3s ease"
  },

  button: {
    marginTop: "20px",
    padding: "14px 40px",
    background: "linear-gradient(135deg, #19fd91, #0bd87d)",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    color: "#000",
    boxShadow: "0 10px 25px rgba(25,253,145,0.3)",
    transition: "0.3s ease"
  },

  resultCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(25,253,145,0.4)",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
  },

  resultImage: {
    width: "120px",
    margin: "25px auto",
    display: "block"
  },

  descriptionText: {
    marginTop: "20px",
    fontSize: "15px",
    color: "#ddd",
    lineHeight: "1.8",
    whiteSpace: "pre-line",
    textAlign: "left"
  }
};

export default Geometry;