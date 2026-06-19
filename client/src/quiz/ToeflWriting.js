
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api";

const writingTasks = [
    {
        id: "integrated",
        title: "Integrated Writing Task",
        time: 1200,
        minWords: 150,

        reading: `Many environmental scientists believe that urban green spaces are essential for improving the quality of life in large cities. Green spaces include public parks, gardens, tree-lined streets, and natural reserves within urban areas.

First, green spaces offer recreational opportunities for city residents. Parks and gardens allow individuals to relax and exercise outdoors.

Second, urban vegetation can improve environmental conditions. Trees absorb carbon dioxide and release oxygen.

Finally, green spaces can help manage rainwater and reduce the risk of flooding.`,

        lecture: `Okay, so the reading passage suggests that urban green spaces provide several benefits for cities. However, the professor explains that these advantages may actually be overstated.

First, many parks are crowded and noisy, so they do not always improve mental health.

Second, cities have far fewer trees compared to the pollution created by vehicles and factories.

Finally, modern cities rely on advanced drainage systems to prevent flooding.`,

        prompt: "Summarize the points made in the lecture and explain how they challenge the reading passage."
    },

    {
        id: "discussion",
        title: "Academic Discussion",
        time: 600,
        minWords: 120,
        prompt: "Do you agree or disagree with the following statement?\n\nOnline education is better than traditional classroom education.\n\nUse reasons and examples to support your answer."
    }
];

function ToeflWriting() {

    const navigate = useNavigate();
    const API_URL = getApiBaseUrl();

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(writingTasks[0].time);

    const currentTask = writingTasks[currentTaskIndex];
    const isLastTask = currentTaskIndex === writingTasks.length - 1;

    const playLecture = (text) => {

        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            return;
        }

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    };

    const pauseLecture = () => {
        window.speechSynthesis.pause();
    };

    useEffect(() => {

        setTimeLeft(currentTask.time);

        const timer = setInterval(() => {

            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, [currentTaskIndex]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    const handleInputChange = (value) => {
        setAnswers(prev => ({
            ...prev,
            [currentTask.id]: value
        }));
    };

    const handleNext = () => {
        window.speechSynthesis.cancel();

        if (currentTaskIndex < writingTasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        window.speechSynthesis.cancel();

        if (currentTaskIndex > 0) {
            setCurrentTaskIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const wordCount = (answers[currentTask.id] || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const saveTestResult = async (result) => {

        const token = localStorage.getItem("token");
        if (!token) return;

        try {

            await fetch(`${API_URL}/tests/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    testName: "TOEFL Writing",
                    result: result
                })
            });

        } catch (err) {
            console.error(err);
        }

    };

    const calculateTotalScore = () => {

        window.speechSynthesis.cancel();

        let completed = 0;

        writingTasks.forEach(task => {

            const words = (answers[task.id] || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;

            if (words >= task.minWords) {
                completed++;
            }

        });

        const total = writingTasks.length;
        const percentage = Math.round((completed / total) * 100);

        let toeflScore = 15;

        if (percentage === 100) toeflScore = 30;
        else if (percentage >= 75) toeflScore = 24;
        else if (percentage >= 50) toeflScore = 20;

        const resultPayload = {
            rawScore: completed,
            total: total,
            percentage: percentage,
            toeflScore: toeflScore
        };

        saveTestResult(resultPayload);

        navigate("/quiz/toefl/result", {
            state: {
                correctCount: completed,
                total: total,
                toeflScore: toeflScore,
                testType: "Writing"
            }
        });

    };

    return (

        <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "100px 20px",
            minHeight: "100vh",
            background: "#0a140f",
            color: "#fff"
        }}>

            <h1 style={{ textAlign: "center", color: "#19fd91" }}>TOEFL Writing</h1>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem"
            }}>

                <div>Task {currentTaskIndex + 1} of {writingTasks.length}</div>

                <div style={{ color: "#19fd91" }}>
                    Time Remaining: {formatTime(timeLeft)}
                </div>

                <div>Word Count: {wordCount}</div>

            </div>

            {currentTask.reading && (

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem"
                }}>

                    <div style={{
                        background: "#111c17",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        maxHeight: "300px",
                        overflowY: "auto"
                    }}>

                        <h3 style={{ color: "#19fd91" }}>Reading Passage</h3>
                        <p style={{ lineHeight: "1.7" }}>{currentTask.reading}</p>

                    </div>

                    <div style={{
                        background: "#111c17",
                        padding: "1.5rem",
                        borderRadius: "10px"
                    }}>

                        <h3 style={{ color: "#19fd91" }}>Lecture Audio</h3>

                        <div style={{ display: "flex", gap: "10px" }}>

                            <button
                                onClick={() => playLecture(currentTask.lecture)}
                                style={{
                                    padding: "8px 18px",
                                    background: "#19fd91",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Play
                            </button>

                            <button
                                onClick={pauseLecture}
                                style={{
                                    padding: "8px 18px",
                                    background: "#ffaa00",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "20px",
                                    cursor: "pointer"
                                }}
                            >
                                Pause
                            </button>

                        </div>

                    </div>

                </div>

            )}

            <div style={{
                background: "#111c17",
                padding: "1.5rem",
                borderRadius: "10px",
                marginBottom: "1rem"
            }}>

                <h3 style={{ color: "#19fd91" }}>Prompt</h3>

                <p style={{ whiteSpace: "pre-wrap" }}>
                    {currentTask.prompt}
                </p>

            </div>

            <textarea
                rows="12"
                value={answers[currentTask.id] || ""}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Write your response here..."
                style={{
                    width: "100%",
                    padding: "1rem",
                    background: "#222",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff"
                }}
            />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem"
            }}>

                <button
                    onClick={handlePrev}
                    disabled={currentTaskIndex === 0}
                    style={{
                        padding: "10px 25px",
                        background: "#19fd91",
                        color: "#000",
                        border: "none",
                        borderRadius: "30px",
                        fontWeight: "bold"
                    }}
                >
                    Previous
                </button>

                {!isLastTask ? (

                    <button
                        onClick={handleNext}
                        style={{
                            padding: "10px 25px",
                            background: "#19fd91",
                            color: "#000",
                            border: "none",
                            borderRadius: "30px",
                            fontWeight: "bold"
                        }}
                    >
                        Next Task
                    </button>

                ) : (

                    <button
                        onClick={calculateTotalScore}
                        style={{
                            padding: "10px 25px",
                            background: "#19fd91",
                            color: "#000",
                            border: "none",
                            borderRadius: "30px",
                            fontWeight: "bold"
                        }}
                    >
                        Finish & Submit
                    </button>

                )}

            </div>

        </div>

    );

}

export default ToeflWriting;

