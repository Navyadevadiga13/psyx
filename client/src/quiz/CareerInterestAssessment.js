import React, { useState, useEffect } from "react";
import { ALL_TESTS } from "../data/allTests";
import CAREER_CLUSTERS from "../data/careerInterestQuestions";
import getApiBaseUrl from "../utils/api";

const TEST_ID = "careerinterest";

function CareerInterestAssessment() {
  const test = ALL_TESTS.find((t) => t.id === TEST_ID);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const API_URL = getApiBaseUrl();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCluster = CAREER_CLUSTERS[step];

  const progress = Math.round(
    ((step + 1) / CAREER_CLUSTERS.length) * 100
  );

  const toggleAnswer = (section, index) => {
    const key = `${step}-${section}-${index}`;

    setAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getClusterScore = (clusterIndex) => {
    let total = 0;

    ["things", "traits", "problems"].forEach((section) => {
      for (let i = 0; i < 5; i++) {
        if (answers[`${clusterIndex}-${section}-${i}`]) {
          total++;
        }
      }
    });

    return total;
  };
    const saveTestResult = async (scores) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${API_URL}/tests/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          testName: "Career Interest Assessment",
          result: scores,
        }),
      });

      console.log("Career Interest Assessment saved");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step < CAREER_CLUSTERS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    const scores = CAREER_CLUSTERS.map((cluster, index) => ({
      id: cluster.id,
      title: cluster.title,
      score: getClusterScore(index),
    }));

    const topThree = [...scores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const finalResult = {
      scores,
      topThree,
    };

    setResult(finalResult);
    saveTestResult(finalResult);
    window.scrollTo(0, 0);
  };

  if (!test) {
    return <div>Test not found.</div>;
  }
    if (result) {
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "140px",
          background: "var(--bg-main)",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "var(--bg-card)",
            width: "95%",
            maxWidth: "850px",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 6px 40px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              color: "var(--text-main)",
            }}
          >
            {test.name}
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Based on your answers, these are your top Career Clusters.
          </p>

          {result.topThree.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "12px",
                background: "var(--bg-accent)",
                border: "1px solid var(--input-border)",
              }}
            >
              <h3>
                #{index + 1} {item.title}
              </h3>

              <p>
                Score: <strong>{item.score} / 15</strong>
              </p>
            </div>
          ))}

          <div
            style={{
              marginTop: "2rem",
              color: "var(--accent)",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            ✅ Your Career Interest Assessment has been saved.
          </div>
        </div>
      </div>
    );
  }
    return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "140px",
        background: "var(--bg-main)",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "3rem",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "900px",
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "2.5rem",
          boxShadow: "0 6px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            color: "var(--text-main)",
            marginBottom: ".5rem",
          }}
        >
          {test.name}
        </h2>

        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Select every statement that describes you.
          There are no right or wrong answers.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: ".7rem",
            color: "var(--text-muted)",
          }}
        >
          <span>
            Cluster {step + 1} of {CAREER_CLUSTERS.length}
          </span>

          <span>{progress}%</span>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "rgba(33,46,35,.15)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "var(--accent)",
              transition: ".3s",
            }}
          />
        </div>

        <h2
          style={{
            marginBottom: "2rem",
            color: "var(--text-main)",
          }}
        >
          {currentCluster.title}
        </h2>
                {[
          {
            title: "Things I Like To Do",
            key: "things",
            items: currentCluster.things,
          },
          {
            title: "Statements That Describe Me",
            key: "traits",
            items: currentCluster.traits,
          },
          {
            title: "Problems I Want To Solve",
            key: "problems",
            items: currentCluster.problems,
          },
        ].map((section) => (
          <div key={section.key} style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                color: "var(--accent)",
                marginBottom: "1rem",
              }}
            >
              {section.title}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".8rem",
              }}
            >
              {section.items.map((item, index) => {
                const answerKey = `${step}-${section.key}-${index}`;

                return (
                  <label
                    key={answerKey}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: answers[answerKey]
                        ? "var(--accent)"
                        : "var(--bg-accent)",
                      color: answers[answerKey]
                        ? "white"
                        : "var(--text-main)",
                      border: "1px solid var(--input-border)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={answers[answerKey] || false}
                      onChange={() =>
                        toggleAnswer(section.key, index)
                      }
                      style={{
                        width: 18,
                        height: 18,
                        cursor: "pointer",
                        accentColor: "var(--accent)",
                      }}
                    />

                    {item}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
                <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: "var(--text-main)",
            }}
          >
            Checked: {getClusterScore(step)} / 15
          </div>

          <div
            style={{
              color: "var(--text-muted)",
              fontSize: ".95rem",
            }}
          >
            Select all statements that describe you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          {step > 0 && (
            <button
              type="button"
              className="cta-btn"
              style={{
                background: "#222a22",
                color: "#fff",
                borderRadius: "12px",
                padding: ".7rem 2rem",
              }}
              onClick={handleBack}
            >
              Previous
            </button>
          )}

          <button
            type="button"
            className="cta-btn"
            style={{
              borderRadius: "12px",
              padding: ".7rem 2rem",
            }}
            onClick={handleNext}
          >
            {step === CAREER_CLUSTERS.length - 1
              ? "Finish Assessment"
              : "Next"}
          </button>
        </div>
                <div
          style={{
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--input-border)",
            textAlign: "center",
            fontSize: ".85rem",
            color: "var(--text-muted)",
          }}
        >
          <strong>Credits</strong>
          <br />
          Adapted from the <strong>Advance CTE National Career Clusters® Framework</strong>,
          <em> Career Interest Survey: Cluster-by-Cluster Edition (August 2025)</em>.
        </div>
      </div>
    </div>
  );
}

export default CareerInterestAssessment;