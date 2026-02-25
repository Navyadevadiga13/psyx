import React, { useEffect, useRef } from "react";
import { FaFlask, FaUserCheck, FaLock, FaChartLine, FaBrain, FaShieldAlt } from "react-icons/fa";

function AboutSection({ onStartAssessment }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
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
    <section className="about-section">
      {/* Animated Background Elements */}
      <div className="about-bg-gradient"></div>
      <div className="about-floating-orb orb-1"></div>
      <div className="about-floating-orb orb-2"></div>

      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          
          <h2 className="about-title">
            <span className="title-line">Why Choose</span>
            <span className="title-accent"> PsyX?</span>
          </h2>

          <p className="about-subtitle">
            Gain a competitive edge in your personal and professional life with
            insights backed by neuroscience and AI.
          </p>

    
        </div>

        {/* Feature Cards */}
        <div className="about-cards-grid">
          {/* Card 1 */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="about-card"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="card-icon-wrapper">
              <FaFlask className="card-icon" />
              <div className="icon-glow"></div>
            </div>
            <div className="card-badge">SCIENCE</div>
            <h3 className="card-title">Scientifically Validated</h3>
            <p className="card-desc">
             All these tests are publicly available. Efforts have been made to collate these assessments in one place through our Psyx platform. We do not claim ownership or guarantee the accuracy of any of these assessments, and they are presented as they are
            </p>
            <div className="card-features">
              <span className="feature-tag">Peer-Reviewed</span>
              <span className="feature-tag">Research-Backed</span>
              <span className="feature-tag">Clinical Validation</span>
            </div>
            {/* <div className="card-footer">
              <span className="footer-text">Based on DSM-5 & ICD-11 frameworks</span>
            </div> */}
          </div>

          {/* Card 2 */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="about-card card-highlight"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-icon-wrapper">
              <FaUserCheck className="card-icon" />
              <div className="icon-glow"></div>
            </div>
            <div className="card-badge">PERSONALIZED</div>
            <h3 className="card-title">AI-Powered Insights</h3>
            <p className="card-desc">
              Receive a comprehensive neural profile detailing your cognitive patterns,
              emotional intelligence, and optimal career trajectories.
            </p>
            <div className="card-features">
              <span className="feature-tag">Deep Learning</span>
              <span className="feature-tag">Real-time Analysis</span>
              <span className="feature-tag">Predictive Modeling</span>
            </div>
            {/* <div className="card-footer">
              <span className="footer-text">Generates 50+ personalized insights</span>
            </div> */}
          </div>

          {/* Card 3 */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="about-card"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="card-icon-wrapper">
              <FaLock className="card-icon" />
              <div className="icon-glow"></div>
            </div>
            <div className="card-badge">SECURITY</div>
            <h3 className="card-title">High-Grade Security</h3>
            <p className="card-desc">
              Your neural data is encrypted with AES-256 bit encryption and stored
              in GDPR-compliant servers with zero-knowledge architecture.
            </p>
            <div className="card-features">
              <span className="feature-tag">End-to-End Encrypted</span>
              <span className="feature-tag">GDPR Compliant</span>
              <span className="feature-tag">Zero-Knowledge</span>
            </div>
            {/* <div className="card-footer">
              <span className="footer-text">Your data never leaves encrypted servers</span>
            </div> */}
          </div>

          {/* Card 4 - New Card */}
          <div
            ref={el => cardsRef.current[3] = el}
            className="about-card"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="card-icon-wrapper">
              <FaChartLine className="card-icon" />
              <div className="icon-glow"></div>
            </div>
            <div className="card-badge">ANALYTICS</div>
            <h3 className="card-title">Advanced Analytics</h3>
            <p className="card-desc">
              Track your cognitive development over time with detailed progress
              reports and comparative analytics against global benchmarks.
            </p>
            <div className="card-features">
              <span className="feature-tag">Progress Tracking</span>
              <span className="feature-tag">Benchmark Analysis</span>
              <span className="feature-tag">Trend Prediction</span>
            </div>
            {/* <div className="card-footer">
              <span className="footer-text">Compare with 1M+ global dataset</span>
            </div> */}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="about-cta">
          <div className="cta-content">
            <FaShieldAlt className="cta-icon" />
            <h3 className="cta-title">Ready to Discover Your Mind?</h3>
            <p className="cta-text">
              Join thousands who've unlocked their true potential with PsyX's
              neuroscience-powered assessments.
            </p>
            <button className="cta-button" onClick={onStartAssessment}>
              <span>Start Free Assessment</span>
              <span className="arrow">→</span>
            </button>
          </div>
          {/* <div className="cta-stats">
            <div className="cta-stat">
              <div className="cta-number">50K+</div>
              <div className="cta-label">Active Users</div>
            </div>
            <div className="cta-stat">
              <div className="cta-number">4.9★</div>
              <div className="cta-label">Rating</div>
            </div>
            <div className="cta-stat">
              <div className="cta-number">99.9%</div>
              <div className="cta-label">Uptime</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;