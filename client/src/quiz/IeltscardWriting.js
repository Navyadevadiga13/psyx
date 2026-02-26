// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPenAlt } from "react-icons/fa";

// function WritingTestReady() {
//     const navigate = useNavigate();

//     const handleStartTest = () => {
//         navigate("/quiz/writing");
//     };

//     return (
//         <>
//             <style jsx>{`
//                 .writing-container {
//                     min-height: 100vh;
//                     background: linear-gradient(135deg, #0a140f 0%, #111c17 100%);
//                     padding: 2rem;
//                     padding-top: 100px;
//                     color: white;
//                     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                 }

//                 .content-wrapper {
//                     max-width: 800px;
//                     margin: 0 auto;
//                     background: rgba(17, 28, 23, 0.7);
//                     border-radius: 20px;
//                     padding: 3rem;
//                     border: 1px solid rgba(25, 253, 145, 0.1);
//                     backdrop-filter: blur(10px);
//                     position: relative;
//                 }

//                 .main-title {
//                     font-size: 2.5rem;
//                     font-weight: 800;
//                     margin: 0 0 1rem 0;
//                     color: #19fd91;
//                     text-align: center;
//                 }

//                 .subtitle {
//                     font-size: 1.2rem;
//                     color: rgba(255, 255, 255, 0.7);
//                     text-align: center;
//                     margin-bottom: 3rem;
//                 }

//                 .section-title {
//                     font-size: 1.5rem;
//                     font-weight: 600;
//                     color: #19fd91;
//                     margin: 2rem 0 1rem 0;
//                 }

//                 .conditions-box {
//                     background: rgba(255, 255, 255, 0.03);
//                     border-radius: 12px;
//                     padding: 2rem;
//                     border: 1px solid rgba(25, 253, 145, 0.2);
//                     margin-bottom: 2rem;
//                 }

//                 .conditions-list {
//                     list-style: none;
//                     padding: 0;
//                     margin: 0;
//                 }

//                 .condition-item {
//                     color: rgba(255, 255, 255, 0.9);
//                     padding: 0.8rem 0;
//                     font-size: 1.1rem;
//                     border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//                     display: flex;
//                     align-items: center;
//                 }

//                 .condition-item:last-child {
//                     border-bottom: none;
//                 }

//                 .condition-item::before {
//                     content: "•";
//                     color: #19fd91;
//                     font-size: 1.5rem;
//                     margin-right: 1rem;
//                     font-weight: bold;
//                 }

//                 .start-button {
//                     background: #19fd91;
//                     color: #000;
//                     border: none;
//                     padding: 1.2rem 3rem;
//                     font-size: 1.2rem;
//                     font-weight: 600;
//                     border-radius: 12px;
//                     cursor: pointer;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     gap: 1rem;
//                     margin: 0;
//                     transition: all 0.3s ease;
//                     width: fit-content;
//                 }

//                 .start-button:hover {
//                     transform: translateY(-2px);
//                     box-shadow: 0 10px 30px rgba(25, 253, 145, 0.3);
//                 }

//                 .button-group {
//                     display: flex;
//                     gap: 1.5rem;
//                     justify-content: center;
//                     margin: 3rem auto;
//                 }

//                 .exit-button {
//                     background: transparent;
//                     color: rgba(255, 255, 255, 0.7);
//                     border: 1px solid rgba(255, 255, 255, 0.2);
//                     padding: 1.2rem 3rem;
//                     font-size: 1.2rem;
//                     font-weight: 600;
//                     border-radius: 12px;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .exit-button:hover {
//                     background: rgba(255, 255, 255, 0.1);
//                     color: white;
//                     border-color: white;
//                     transform: translateY(-2px);
//                 }

//                 .pen-icon {
//                     font-size: 1.2rem;
//                 }

//                 .divider-line {
//                     height: 1px;
//                     background: linear-gradient(90deg, transparent, rgba(25, 253, 145, 0.3), transparent);
//                     margin: 2rem 0;
//                 }

//                 .weather-info {
//                     text-align: right;
//                     color: rgba(255, 255, 255, 0.8);
//                     font-size: 1.1rem;
//                     line-height: 1.4;
//                     margin-top: 2rem;
//                 }

//                 .temperature {
//                     font-size: 1.3rem;
//                     font-weight: 600;
//                     color: #19fd91;
//                 }

//                 /* Test Details */
//                 .test-details {
//                     display: grid;
//                     grid-template-columns: repeat(2, 1fr);
//                     gap: 1.5rem;
//                     margin-top: 2rem;
//                 }

//                 .detail-card {
//                     background: rgba(25, 253, 145, 0.05);
//                     border-radius: 10px;
//                     padding: 1.5rem;
//                     border: 1px solid rgba(25, 253, 145, 0.1);
//                     text-align: center;
//                 }

//                 .detail-number {
//                     font-size: 2rem;
//                     font-weight: 700;
//                     color: #19fd91;
//                     margin-bottom: 0.5rem;
//                 }

//                 .detail-label {
//                     color: rgba(255, 255, 255, 0.7);
//                     font-size: 0.9rem;
//                 }

//                 /* Tasks Section */
//                 .tasks-section {
//                     background: rgba(25, 253, 145, 0.05);
//                     border-radius: 10px;
//                     padding: 1.5rem;
//                     margin: 2rem 0;
//                     border: 1px solid rgba(25, 253, 145, 0.1);
//                 }

//                 .task-item {
//                     margin: 1.5rem 0;
//                 }

//                 .task-title {
//                     color: #19fd91;
//                     font-size: 1.1rem;
//                     margin-bottom: 0.5rem;
//                     font-weight: 600;
//                 }

//                 .task-details {
//                     color: rgba(255, 255, 255, 0.9);
//                     margin: 0.3rem 0;
//                     font-size: 1rem;
//                     display: flex;
//                     align-items: center;
//                 }

//                 .task-details::before {
//                     content: "▸";
//                     color: #19fd91;
//                     margin-right: 0.8rem;
//                     font-weight: bold;
//                 }

//                 /* Word Count Indicator */
//                 .word-count-info {
//                     background: rgba(25, 253, 145, 0.08);
//                     border-radius: 8px;
//                     padding: 1rem;
//                     margin-top: 1rem;
//                     text-align: center;
//                     border: 1px solid rgba(25, 253, 145, 0.15);
//                 }

//                 .word-count-text {
//                     color: rgba(255, 255, 255, 0.9);
//                     font-size: 1rem;
//                 }

//                 .word-count-highlight {
//                     color: #19fd91;
//                     font-weight: 600;
//                 }

//                 /* Responsive Design */
//                 @media (max-width: 768px) {
//                     .writing-container {
//                         padding: 1rem;
//                         padding-top: 80px;
//                     }
                    
//                     .content-wrapper {
//                         padding: 2rem;
//                     }
                    
//                     .main-title {
//                         font-size: 2rem;
//                     }
                    
//                     .subtitle {
//                         font-size: 1rem;
//                     }
                    
//                     .section-title {
//                         font-size: 1.3rem;
//                     }
                    
//                     .test-details {
//                         grid-template-columns: 1fr;
//                     }
//                 }

//                 @media (max-width: 480px) {
//                     .content-wrapper {
//                         padding: 1.5rem;
//                     }
                    
//                     .main-title {
//                         font-size: 1.8rem;
//                     }
                    
//                     .condition-item {
//                         font-size: 1rem;
//                     }
                    
//                     .start-button {
//                         width: 100%;
//                         padding: 1rem;
//                     }
//                 }
//             `}</style>

//             <div className="writing-container">
//                 <div className="content-wrapper">
//                     {/* Main Title */}
//                     <h1 className="main-title"></h1>
//                     <p className="subtitle">Prepare for your IELTS Writing assessment</p>

//                     {/* Exam Conditions Section */}
//                     <h2 className="section-title">Exam Conditions Active</h2>
//                     <div className="conditions-box">
//                         <ul className="conditions-list">
//                             <li className="condition-item">2 writing tasks to complete in 60 minutes</li>
//                             <li className="condition-item">Task 1: Describe visual information (20 minutes)</li>
//                             <li className="condition-item">Task 2: Essay writing (40 minutes)</li>
//                             <li className="condition-item">Word count monitoring enabled</li>
//                             <li className="condition-item">Spell check and grammar suggestions disabled</li>
//                             <li className="condition-item">Auto-submit when time expires</li>
//                         </ul>
//                     </div>

//                     {/* Test Details */}
//                     <div className="test-details">
//                         <div className="detail-card">
//                             <div className="detail-number">60</div>
//                             <div className="detail-label">Minutes Total</div>
//                         </div>
//                         <div className="detail-card">
//                             <div className="detail-number">2</div>
//                             <div className="detail-label">Tasks</div>
//                         </div>
//                         <div className="detail-card">
//                             <div className="detail-number">400</div>
//                             <div className="detail-label">Min Words</div>
//                         </div>
//                         <div className="detail-card">
//                             <div className="detail-number">9.0</div>
//                             <div className="detail-label">Max Band</div>
//                         </div>
//                     </div>

//                     {/* Tasks Breakdown */}
//                     <div className="tasks-section">
//                         <div className="task-item">
//                             <div className="task-title">Task 1: Academic/General Training</div>
//                             <div className="task-details">Describe visual information (chart, graph, diagram)</div>
//                             <div className="task-details">Minimum 150 words</div>
//                             <div className="task-details">Recommended time: 20 minutes</div>
//                         </div>

//                         <div className="task-item">
//                             <div className="task-title">Task 2: Essay Writing</div>
//                             <div className="task-details">Respond to a point of view, argument, or problem</div>
//                             <div className="task-details">Minimum 250 words</div>
//                             <div className="task-details">Recommended time: 40 minutes</div>
//                         </div>

//                         <div className="word-count-info">
//                             <div className="word-count-text">
//                                 Total minimum words: <span className="word-count-highlight">400+</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Start Test and Exit Buttons */}
//                     <div className="button-group">
//                         <button className="start-button" onClick={handleStartTest}>
//                             <FaPenAlt className="pen-icon" />
//                             <span>Start Test</span>
//                         </button>
//                         <button className="exit-button" onClick={() => navigate("/")}>
//                             Exit Module
//                         </button>
//                     </div>

//                     {/* Divider */}
//                     <div className="divider-line"></div>


//                 </div>
//             </div>
//         </>
//     );
// }

// export default WritingTestReady;


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPenAlt } from "react-icons/fa";

function WritingTestReady() {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate("/quiz/writing");
    };

    return (
        <>
            <style jsx>{`
                .writing-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0a140f 0%, #111c17 100%);
                    padding: 2rem;
                    padding-top: 100px;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .content-wrapper {
                    max-width: 800px;
                    margin: 0 auto;
                    background: rgba(17, 28, 23, 0.7);
                    border-radius: 20px;
                    padding: 3rem;
                    border: 1px solid rgba(25, 253, 145, 0.1);
                    backdrop-filter: blur(10px);
                    position: relative;
                }

                .main-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin: 0 0 1rem 0;
                    color: #19fd91;
                    text-align: center;
                }

                .subtitle {
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-align: center;
                    margin-bottom: 3rem;
                }

                /* New group for subtitles to reduce spacing between them */
                .subtitle-group {
                    margin-bottom: 3rem;
                }
                .subtitle-group .subtitle {
                    margin-bottom: 0.5rem;
                }
                .subtitle-group .subtitle:last-child {
                    margin-bottom: 0;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #19fd91;
                    margin: 2rem 0 1rem 0;
                }

                .conditions-box {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    padding: 2rem;
                    border: 1px solid rgba(25, 253, 145, 0.2);
                    margin-bottom: 2rem;
                }

                .conditions-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .condition-item {
                    color: rgba(255, 255, 255, 0.9);
                    padding: 0.8rem 0;
                    font-size: 1.1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                }

                .condition-item:last-child {
                    border-bottom: none;
                }

                .condition-item::before {
                    content: "•";
                    color: #19fd91;
                    font-size: 1.5rem;
                    margin-right: 1rem;
                    font-weight: bold;
                }

                .start-button {
                    background: #19fd91;
                    color: #000;
                    border: none;
                    padding: 1.2rem 3rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin: 0;
                    transition: all 0.3s ease;
                    width: fit-content;
                }

                .start-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(25, 253, 145, 0.3);
                }

                .button-group {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    margin: 3rem auto;
                }

                .exit-button {
                    background: transparent;
                    color: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 1.2rem 3rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .exit-button:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    border-color: white;
                    transform: translateY(-2px);
                }

                .pen-icon {
                    font-size: 1.2rem;
                }

                .divider-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(25, 253, 145, 0.3), transparent);
                    margin: 2rem 0;
                }

                .weather-info {
                    text-align: right;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 1.1rem;
                    line-height: 1.4;
                    margin-top: 2rem;
                }

                .temperature {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #19fd91;
                }

                /* Test Details */
                .test-details {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .detail-card {
                    background: rgba(25, 253, 145, 0.05);
                    border-radius: 10px;
                    padding: 1.5rem;
                    border: 1px solid rgba(25, 253, 145, 0.1);
                    text-align: center;
                }

                .detail-number {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #19fd91;
                    margin-bottom: 0.5rem;
                }

                .detail-label {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                }

                /* Tasks Section */
                .tasks-section {
                    background: rgba(25, 253, 145, 0.05);
                    border-radius: 10px;
                    padding: 1.5rem;
                    margin: 2rem 0;
                    border: 1px solid rgba(25, 253, 145, 0.1);
                }

                .task-item {
                    margin: 1.5rem 0;
                }

                .task-title {
                    color: #19fd91;
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .task-details {
                    color: rgba(255, 255, 255, 0.9);
                    margin: 0.3rem 0;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                }

                .task-details::before {
                    content: "▸";
                    color: #19fd91;
                    margin-right: 0.8rem;
                    font-weight: bold;
                }

                /* Word Count Indicator */
                .word-count-info {
                    background: rgba(25, 253, 145, 0.08);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-top: 1rem;
                    text-align: center;
                    border: 1px solid rgba(25, 253, 145, 0.15);
                }

                .word-count-text {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1rem;
                }

                .word-count-highlight {
                    color: #19fd91;
                    font-weight: 600;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .writing-container {
                        padding: 1rem;
                        padding-top: 80px;
                    }
                    
                    .content-wrapper {
                        padding: 2rem;
                    }
                    
                    .main-title {
                        font-size: 2rem;
                    }
                    
                    .subtitle {
                        font-size: 1rem;
                    }
                    
                    .section-title {
                        font-size: 1.3rem;
                    }
                    
                    .test-details {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .content-wrapper {
                        padding: 1.5rem;
                    }
                    
                    .main-title {
                        font-size: 1.8rem;
                    }
                    
                    .condition-item {
                        font-size: 1rem;
                    }
                    
                    .start-button {
                        width: 100%;
                        padding: 1rem;
                    }
                }
            `}</style>

            <div className="writing-container">
                <div className="content-wrapper">
                    {/* Main Title */}
                    <h1 className="main-title">Writing Test Ready</h1>
                    
                    {/* Subtitle group with reduced spacing */}
                    <div className="subtitle-group">
                        <p className="subtitle">Prepare for your IELTS Writing assessment</p>
                        <p className="subtitle">
                            This test assesses your ability to write effectively in academic English, focusing on task response,and grammatical accuracy.
                        </p>
                        <p className="subtitle">
                            You will have 60 minutes to complete two writing tasks, with recommended time allocations for each.
                        </p>
                    </div>

                    {/* Exam Conditions Section */}
                    <h2 className="section-title">Exam Conditions Active</h2>
                    <div className="conditions-box">
                        <ul className="conditions-list">
                            <li className="condition-item">2 writing tasks to complete in 60 minutes</li>
                            <li className="condition-item">Task 1: Describe visual information (20 minutes)</li>
                            <li className="condition-item">Task 2: Essay writing (40 minutes)</li>
                            <li className="condition-item">Word count monitoring enabled</li>
                            <li className="condition-item">Spell check and grammar suggestions disabled</li>
                            <li className="condition-item">Auto-submit when time expires</li>
                        </ul>
                    </div>

                    {/* Test Details */}
                    <div className="test-details">
                        <div className="detail-card">
                            <div className="detail-number">60</div>
                            <div className="detail-label">Minutes Total</div>
                        </div>
                        <div className="detail-card">
                            <div className="detail-number">2</div>
                            <div className="detail-label">Tasks</div>
                        </div>
                        <div className="detail-card">
                            <div className="detail-number">400</div>
                            <div className="detail-label">Min Words</div>
                        </div>
                        <div className="detail-card">
                            <div className="detail-number">9.0</div>
                            <div className="detail-label">Max Band</div>
                        </div>
                    </div>

                    {/* Tasks Breakdown */}
                    <div className="tasks-section">
                        <div className="task-item">
                            <div className="task-title">Task 1: Academic/General Training</div>
                            <div className="task-details">Describe visual information (chart, graph, diagram)</div>
                            <div className="task-details">Minimum 150 words</div>
                            <div className="task-details">Recommended time: 20 minutes</div>
                        </div>

                        <div className="task-item">
                            <div className="task-title">Task 2: Essay Writing</div>
                            <div className="task-details">Respond to a point of view, argument, or problem</div>
                            <div className="task-details">Minimum 250 words</div>
                            <div className="task-details">Recommended time: 40 minutes</div>
                        </div>

                        <div className="word-count-info">
                            <div className="word-count-text">
                                Total minimum words: <span className="word-count-highlight">400+</span>
                            </div>
                        </div>
                    </div>

                    {/* Start Test and Exit Buttons */}
                    <div className="button-group">
                        <button className="start-button" onClick={handleStartTest}>
                            <FaPenAlt className="pen-icon" />
                            <span>Start Test</span>
                        </button>
                        <button className="exit-button" onClick={() => navigate("/")}>
                            Exit Module
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="divider-line"></div>

                </div>
            </div>
        </>
    );
}

export default WritingTestReady;