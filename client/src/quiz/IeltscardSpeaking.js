// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaMicrophone } from "react-icons/fa";

// function SpeakingTestReady() {
//     const navigate = useNavigate();

//     const handleStartTest = () => {
//         navigate("/quiz/speaking");
//     };

//     return (
//         <>
//             <style jsx>{`
//                 .speaking-container {
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

//                 .button-group {
//                     display: flex;
//                     gap: 1.5rem;
//                     justify-content: center;
//                     margin: 3rem auto;
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
//                     transition: all 0.3s ease;
//                 }

//                 .start-button:hover {
//                     transform: translateY(-2px);
//                     box-shadow: 0 10px 30px rgba(25, 253, 145, 0.3);
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

//                 .icon-large {
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

//                 /* Responsive Design */
//                 @media (max-width: 768px) {
//                     .speaking-container {
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
                    
//                     .button-group {
//                         flex-direction: column;
//                         gap: 1rem;
//                     }

//                     .start-button, .exit-button {
//                         width: 100%;
//                         padding: 1rem;
//                     }
//                 }
//             `}</style>

//             <div className="speaking-container">
//                 <div className="content-wrapper">
//                     {/* Main Title */}
//                     <h1 className="main-title">Speaking Test</h1>
//                     <p className="subtitle">Prepare for your IELTS Speaking assessment</p>

//                     {/* Exam Conditions Section */}
//                     <h2 className="section-title">Exam Conditions Active</h2>
//                     <div className="conditions-box">
//                         <ul className="conditions-list">
//                             <li className="condition-item">Candidates must visit the test centre location to take the test.</li>
//                             <li className="condition-item">Test Centre Address:
//                                 2nd Floor, Takshila Building, MG Rd, near Janatha Delux Hotel, Ballalbagh, Kodailbail, Mangaluru, Karnataka 575003.
//                                 The test is a live interview with a certified examiner.</li>
//                             <li className="condition-item">It consists of three parts and lasts 11–14 minutes.</li>
//                             <li className="condition-item">Please arrive at least 15 minutes early and bring valid identification.</li>
//                             <li className="condition-item">Late arrivals may not be allowed to sit the test.</li>

//                         </ul>
//                     </div>


//                     {/* Start Test and Exit Buttons */}
//                     <div className="button-group">

//                         <button className="exit-button" onClick={() => navigate("/")}>
//                             Exit Module
//                         </button>
//                     </div>

//                     {/* Divider */}
//                     <div className="divider-line"></div>

//                     {/* Weather Info */}

//                 </div>
//             </div>
//         </>
//     );
// }

// export default SpeakingTestReady;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";

function SpeakingTestReady() {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate("/quiz/speaking");
    };

    return (
        <>
            <style jsx>{`
                .speaking-container {
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

                .button-group {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    margin: 3rem auto;
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
                    transition: all 0.3s ease;
                }

                .start-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(25, 253, 145, 0.3);
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

                .icon-large {
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

                /* Responsive Design */
                @media (max-width: 768px) {
                    .speaking-container {
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
                    
                    .button-group {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .start-button, .exit-button {
                        width: 100%;
                        padding: 1rem;
                    }
                }
            `}</style>

            <div className="speaking-container">
                <div className="content-wrapper">
                    {/* Main Title */}
                    <h1 className="main-title">Speaking Test</h1>
                    
                    {/* Subtitle group with reduced spacing */}
                    <div className="subtitle-group">
                        <p className="subtitle">Prepare for your IELTS Speaking assessment</p>
                        <p className="subtitle">
                            This test measures your spoken English skills in a structured conversation format.
                        </p>
                        <p className="subtitle">
                            You will be assessed on fluency, pronunciation, grammar, and vocabulary across three parts.
                        </p>
                    </div>

                    {/* Exam Conditions Section */}
                    <h2 className="section-title">Exam Conditions Active</h2>
                    <div className="conditions-box">
                        <ul className="conditions-list">
                            <li className="condition-item">Candidates must visit the test centre location to take the test.</li>
                            <li className="condition-item">Test Centre Address:
                                2nd Floor, Takshila Building, MG Rd, near Janatha Delux Hotel, Ballalbagh, Kodailbail, Mangaluru, Karnataka 575003.
                                The test is a live interview with a certified examiner.</li>
                            <li className="condition-item">It consists of three parts and lasts 11–14 minutes.</li>
                            <li className="condition-item">Please arrive at least 15 minutes early and bring valid identification.</li>
                            <li className="condition-item">Late arrivals may not be allowed to sit the test.</li>

                        </ul>
                    </div>


                    {/* Start Test and Exit Buttons */}
                    <div className="button-group">

                        <button className="exit-button" onClick={() => navigate("/")}>
                            Exit Module
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="divider-line"></div>

                    {/* Weather Info */}

                </div>
            </div>
        </>
    );
}

export default SpeakingTestReady;