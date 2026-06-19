// import React, { useEffect, useRef, useState } from "react";
// import styles from "./HomeSection.module.css";
// import { useNavigate } from "react-router-dom";
// function HomeSection({ onStartAssessment, onLearnMore }) {
//   const navigate = useNavigate();
//   const handleStartAssessment = () => {
//   navigate("/", { state: { scrollTarget: "tests" } });
// };
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const buttonsRef = useRef(null);

//   /* ================= POPUP LOGIC ================= */

//   // Show popup only once per browser session
//   const [showPopup, setShowPopup] = useState(() => {
//     const hasShown = sessionStorage.getItem("hasShownHomePopup");
//     return hasShown ? false : true;
//   });

//   const handleClosePopup = () => {
//     sessionStorage.setItem("hasShownHomePopup", "true");
//     setShowPopup(false);
//   };

//   /* ================= ANIMATION ================= */

//   useEffect(() => {
//     setTimeout(() => {
//       if (titleRef.current) titleRef.current.classList.add(styles.visible);
//     }, 200);

//     setTimeout(() => {
//       if (subtitleRef.current) subtitleRef.current.classList.add(styles.visible);
//     }, 500);

//     setTimeout(() => {
//       if (buttonsRef.current) buttonsRef.current.classList.add(styles.visible);
//     }, 800);
//   }, []);

//   return (
//     <>
//       {/* ================= POPUP ================= */}
//       {showPopup && (
//         <div style={overlayStyle}>
//           <div style={modalStyle}>
//             <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
//               🎓
//             </div>

//             <h2 style={{ marginBottom: "1rem", color: "#19fd91" }}>
//               Student Notice
//             </h2>

//             <p
//               style={{
//                 marginBottom: "1.5rem",
//                 textAlign: "center",
//                 lineHeight: "1.6",
//               }}
//             >
//               This platform is entirely non-commercial and has been created
//               exclusively to support students in their learning and career
//               exploration journey.
//             </p>

//             <button onClick={handleClosePopup} style={buttonStyle}>
//               Continue
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= HERO SECTION ================= */}
//       <section className={styles.heroSection}>
//         <div className={styles.cyberGrid}></div>
//         <div className={styles.ambientGlow}></div>

//         {/* Neuron Visualization */}
//         <div className={styles.neuronContainer}>
//           <div className={styles.neuronMain}>
//             <div className={styles.cellBody}>
//               <div className={styles.cellCore}></div>
//               <div className={styles.cellRing}></div>
//               <div
//                 className={styles.cellRing}
//                 style={{ animationDelay: "0.5s" }}
//               ></div>
//             </div>

//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={`dendrite-${i}`}
//                 className={styles.dendriteLine}
//                 style={{
//                   transform: `rotate(${i * 45}deg)`,
//                   animationDelay: `${i * 0.1}s`,
//                 }}
//               >
//                 <div className={styles.dendriteTip}></div>
//               </div>
//             ))}

//             <div className={styles.axonLine}>
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className={styles.myelinSegment}></div>
//               ))}
//             </div>

//             <div className={styles.synapseTerminal}></div>

//             {[...Array(20)].map((_, i) => (
//               <div
//                 key={`neuro-${i}`}
//                 className={styles.neuroDot}
//                 style={{
//                   top: `${20 + i * 4}%`,
//                   left: `${60 + i * 2}%`,
//                   animationDelay: `${i * 0.2}s`,
//                 }}
//               ></div>
//             ))}

//             <div className={styles.neuralImpulse}></div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className={styles.heroContent}>
//           <h1 ref={titleRef} className={styles.heroTitle}>
//             <span className={styles.titleLine}>UNLOCK YOUR</span>
//             <span className={styles.titleHighlight}> MIND </span>
//             <span className={styles.titleLine}>AND</span>
//             <span className={styles.titleHighlight}> PERSONALITY</span>
//           </h1>

//           <p ref={subtitleRef} className={styles.heroSubtitle}>
//             Take a FREE personality assessment test and get a personalized,
//             research-backed profile of your strengths, values, and career fit.
//             <br />
//             <span className={styles.highlightLine}>
//               Unlock your potential now!
//             </span>
//           </p>

//           <div ref={buttonsRef} className={styles.heroActions}>
//         <button className={styles.heroCta} onClick={handleStartAssessment}>
//               <span className={styles.btnText}>Start Your Assessment</span>
//               <span className={styles.arrowIcon}>→</span>
//             </button>

//             <button
//               className={styles.heroSecondary}
//               onClick={onLearnMore}
//             >
//               <span>Learn More</span>
//               <span className={styles.playIcon}>▶</span>
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default HomeSection;

// /* ================= POPUP STYLES ================= */

// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   background: "rgba(0, 0, 0, 0.85)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 9999,
// };

// const modalStyle = {
//   background: "#0f172a",
//   padding: "2rem",
//   borderRadius: "16px",
//   maxWidth: "420px",
//   width: "90%",
//   textAlign: "center",
//   color: "white",
//   boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
// };

// const buttonStyle = {
//   background: "#19fd91",
//   border: "none",
//   padding: "0.8rem 1.8rem",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontWeight: "600",
//   fontSize: "1rem",
// };

// src/components/HomeSection.js
import React, { useEffect, useRef, useState } from "react";
import styles from "./HomeSection.module.css";

function HomeSection({ onStartAssessment, onLearnMore }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

const [showPopup, setShowPopup] = useState(false);

useEffect(() => {
  const hasSeenPopup = localStorage.getItem("hasSeenHomePopup");

  if (!hasSeenPopup) {
    setShowPopup(true);
    localStorage.setItem("hasSeenHomePopup", "true");
  }
}, []);

  useEffect(() => {
    setTimeout(() => titleRef.current?.classList.add(styles.visible), 200);
    setTimeout(() => subtitleRef.current?.classList.add(styles.visible), 500);
    setTimeout(() => buttonsRef.current?.classList.add(styles.visible), 800);
  }, []);

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
  };

const handleClosePopup = () => {
  setShowPopup(false);
};
  return (
    <>
      {/* ================= POPUP ================= */}
      {showPopup && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>🎓</div>
            <h2 style={{ marginBottom: "1rem", color: "#19fd91" }}>Student Notice</h2>
            <p style={{ marginBottom: "1.5rem", textAlign: "center", lineHeight: "1.6" }}>
              This platform is entirely non-commercial and created to support students in their learning and career exploration journey.
            </p>
            <button onClick={handleClosePopup} style={buttonStyle}>Continue</button>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className={styles.heroSection}>
        <div className={styles.cyberGrid}></div>
        <div className={styles.ambientGlow}></div>

        {/* VIDEO BACKGROUND */}
        <div
          className={styles.videoContainer}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/video/brain25.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#1a6b1a",
              mixBlendMode: "color",
              opacity: 0.75,
              zIndex: 2,
              pointerEvents: "none",
            }}
          ></div>
        </div>

        {/* CONTENT */}
        <div className={styles.heroContent} style={{ position: "relative", zIndex: 10 }}>
          <h1 ref={titleRef} className={styles.heroTitle}>
            <span className={styles.titleLine}>UNLOCK YOUR</span>
            <span className={styles.titleHighlight}> MIND </span>
            <span className={styles.titleLine}>AND</span>
            <span className={styles.titleHighlight}> PERSONALITY</span>
          </h1>

          <p ref={subtitleRef} className={styles.heroSubtitle}>
            Take a FREE personality assessment test and get a personalized,
            research-backed profile of your strengths, values, and career fit.
            <br />
            <span className={styles.highlightLine}>Unlock your potential now!</span>
          </p>

          <div ref={buttonsRef} className={styles.heroActions}>
            <button className={styles.heroCta} onClick={onStartAssessment}>
              <span className={styles.btnText}>Start Your Assessment</span>
              <span className={styles.arrowIcon}>→</span>
            </button>

            <button className={styles.heroSecondary} onClick={onLearnMore}>
              <span>Learn More</span>
              <span className={styles.playIcon}>▶</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeSection;

/* ================= STYLES ================= */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#0f172a",
  padding: "2rem",
  borderRadius: "16px",
  maxWidth: "420px",
  width: "90%",
  textAlign: "center",
  color: "white",
  boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
};

const buttonStyle = {
  background: "#19fd91",
  border: "none",
  padding: "0.8rem 1.8rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
};