import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

// --- COMPONENTS ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import TestsSection from "./components/TestsSection";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import CategoryListPage from "./components/CategoryListPage";
import AssessmentsPage from "./components/AssessmentsPage";
import QuizPage from "./components/QuizPage";
import VerifyEmailPage from "./components/VerifyEmailPage";
import AdminLogin from "./components/AdminLogin";

// --- QUIZ PAGES ---
import BigFivePage from "./quiz/BigFivePage";
import LeftRightBrainPage from "./quiz/LeftRightBrain";
import MbtiPage from "./quiz/MbtiPage";
import SixteenPFPage from "./quiz/SixteenPFPage";
import CareerOrientationsPage from "./quiz/CareerOrientationsPage";
import RiasecPage from "./quiz/Riasec";
import DrPhils from "./quiz/DrPhils";
import Perception from "./quiz/Perception";
import DiagramAnalysis from "./quiz/DiagramAnalysis";
import IqTestPage from "./quiz/IqTestPage";
import IqQuizPage from "./quiz/IqQuizPage";
import IqResultPage from "./quiz/IqResultPage";
import EqTestPage from "./quiz/EqTestPage";
import EqQuizPage from "./quiz/EqQuizPage";
import EqResultPage from "./quiz/EqResultPage";
import CareerInterestAssessment from "./quiz/CareerInterestAssessment";


// Other Tests ---
import Geometry from "./quiz/Geometry";
import SqTest from "./quiz/SqTest";
import PqTest from "./quiz/PqTest";


// --- STYLES ---
import "./App.css";

const HEADER_OFFSET = 70;

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

function MainContent() {
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const testsRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (section) => {
    let ref = null;
    switch (section) {
      case "home":
        ref = homeRef;
        break;
      case "about":
        ref = aboutRef;
        break;
      case "tests":
        ref = testsRef;
        break;
      default:
        break;
    }

    if (ref && ref.current) {
      let top = ref.current.offsetTop - HEADER_OFFSET;

      // Scroll to bottom of tests section for assessments
      if (section === "tests") {
        top = ref.current.offsetTop + ref.current.offsetHeight - window.innerHeight;
      }

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTarget) {
      scrollToSection(location.state.scrollTarget);
    }
  }, [location]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", "yes");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleExplore = (categoryId) => {
    navigate(`/tests/${categoryId}`);
  };

  return (
    <>
      <Header
        theme={theme}
        setTheme={setTheme}
        isLoggedIn={isLoggedIn}
        showLogin={() => navigate("/login")}
        goProfile={() => navigate("/profile")}
      />
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <div ref={homeRef}>
                <HomeSection
                  onStartAssessment={() => scrollToSection("tests")}
                  onLearnMore={() => scrollToSection("about")}
                />
              </div>

              <div ref={aboutRef}>
                <AboutSection onStartAssessment={() => scrollToSection("tests")} />
              </div>

              <div ref={testsRef} style={{ minHeight: "100vh", padding: "2rem 0" }}>
                <TestsSection isLoggedIn={isLoggedIn} onExplore={handleExplore} />
              </div>
            </>
          }
        />

        {/* AUTH ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} onSuccess={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSuccess={handleLogin} />} />
        <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
        <Route path="/verify-email" element={<VerifyEmailPage onLogin={handleLogin} />} />

        {/* CATEGORY & ASSESSMENTS */}
        <Route path="/tests" element={<AssessmentsPage />} />
        <Route path="/tests/:categoryId" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CategoryListPage />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:quizId" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <QuizPage />
          </ProtectedRoute>
        } />

        {/* PERSONALITY TESTS */}
        <Route path="/tests/personality/bigfive" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><BigFivePage /></ProtectedRoute>
        } />
        <Route path="/tests/personality/leftright" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><LeftRightBrainPage /></ProtectedRoute>
        } />
        <Route path="/tests/personality/mbti" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><MbtiPage /></ProtectedRoute>
        } />
        <Route path="/tests/personality/16pf" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><SixteenPFPage /></ProtectedRoute>
        } />
        <Route path="/tests/personality/drphils" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><DrPhils /></ProtectedRoute>
        } />
        <Route path="/tests/personality/perception" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><Perception /></ProtectedRoute>
        } />
        <Route path="/tests/personality/diagramanalysis" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><DiagramAnalysis /></ProtectedRoute>
        } />
        <Route path="/tests/personality/geometry" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><Geometry /></ProtectedRoute>
        } />
        <Route path="/tests/personality/sqtest" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><SqTest /></ProtectedRoute>
        } />
        <Route path="/tests/personality/pqtest" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><PqTest /></ProtectedRoute>
        } />
        <Route path="/tests/personality/eqtest" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><EqTestPage /></ProtectedRoute>
        } />

        {/* EQ QUIZ */}
        <Route path="/quiz/eq-test" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><EqQuizPage /></ProtectedRoute>
        } />
        <Route path="/quiz/eq-result" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><EqResultPage /></ProtectedRoute>
        } />

        {/* IQ QUIZ */}
        <Route path="/tests/career/iqtest" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><IqTestPage /></ProtectedRoute>
        } />
        <Route path="/quiz/iq-test" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><IqQuizPage /></ProtectedRoute>
        } />
        <Route path="/quiz/iq-result" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><IqResultPage /></ProtectedRoute>
        } />

        {/* CAREER TESTS */}
        <Route path="/tests/career/riasec" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><RiasecPage /></ProtectedRoute>
        } />
        <Route path="/tests/career/career-anchor" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><CareerOrientationsPage /></ProtectedRoute>
        } />
        <Route path="/tests/career/career-interest" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}><CareerInterestAssessment /></ProtectedRoute>
        } />

      </Routes>

      {!["/login", "/signup"].includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;