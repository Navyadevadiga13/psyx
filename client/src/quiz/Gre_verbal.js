// src/quiz/Gre_verbal.js

import React, { useState, useEffect } from "react";
import getApiBaseUrl from "../utils/api";
import { FaClock } from "react-icons/fa";

const verbalQuestions = [
  // ---------- SECTION 1 (12) ----------
  {
    id:1,
    question:"Although the professor appeared stern, his lectures were surprisingly ______.",
    options:["engaging","captivating","tedious","monotonous","rigid","dull"],
    answer:"engaging"
  },
  {
    id:2,
    question:"The CEO's explanation was so ______ that analysts struggled to determine the company's true financial position.",
    options:["lucid","transparent","equivocal","forthright"],
    answer:"equivocal"
  },
  {
    id:3,
    question:"Her criticism was so ______ that even confident speakers began doubting their arguments.",
    options:["devastating","scathing","mild","lenient","perfunctory","superficial"],
    answer:"scathing"
  },
  {
    id:4,
    question:"Despite early skepticism, economists began to view the reform with ______.",
    options:["hostility","cautious optimism","indifference","complete rejection"],
    answer:"cautious optimism"
  },
  {
    id:5,
    question:"Historians argue the empire's decline was a ______ process lasting centuries.",
    options:["gradual","abrupt","instantaneous","sudden"],
    answer:"gradual"
  },
  {
    id:6,
    question:"The scientist became famous for her ______ thinking, frequently challenging traditional beliefs.",
    options:["orthodox","iconoclastic","conventional","traditional"],
    answer:"iconoclastic"
  },
  {
    id:7,
    question:"The argument initially appears convincing but ultimately proves ______.",
    options:["sound","coherent","flawed","persuasive"],
    answer:"flawed"
  },
  {
    id:8,
    question:"The study's primary goal was to ______ widely accepted assumptions.",
    options:["confirm","refute","ignore","repeat"],
    answer:"refute"
  },
  {
    id:9,
    question:"The committee's decision was widely regarded as ______ and thoughtful.",
    options:["prudent","reckless","irrational","careless"],
    answer:"prudent"
  },
  {
    id:10,
    question:"His remarks were so ______ that many listeners felt offended.",
    options:["tactful","blunt","courteous","considerate"],
    answer:"blunt"
  },
  {
    id:11,
    question:"The discovery represented a ______ breakthrough in medical science.",
    options:["minor","insignificant","major","trivial"],
    answer:"major"
  },
  {
    id:12,
    question:"Her explanation was brief but remarkably ______.",
    options:["superficial","thorough","unclear","incomplete"],
    answer:"thorough"
  },

  // ---------- SECTION 2 (15) ----------
  {
    id:13,
    question:"The politician attempted to ______ public concern about the scandal.",
    options:["intensify","mitigate","provoke","expand"],
    answer:"mitigate"
  },
  {
    id:14,
    question:"The theory was dismissed by critics as highly ______.",
    options:["innovative","implausible","convincing","logical"],
    answer:"implausible"
  },
  {
    id:15,
    question:"The research conclusions were later ______ by further experimentation.",
    options:["confirmed","contradicted","ignored","weakened"],
    answer:"confirmed"
  },
  {
    id:16,
    question:"The author's tone throughout the essay is best described as ______.",
    options:["satirical","solemn","neutral","casual"],
    answer:"satirical"
  },
  {
    id:17,
    question:"Following the economic reforms, company profits began to ______ steadily.",
    options:["decline","increase","vanish","collapse"],
    answer:"increase"
  },
  {
    id:18,
    question:"The hypothesis assumes that natural resources are ______.",
    options:["abundant","limited","unpredictable","renewable"],
    answer:"limited"
  },
  {
    id:19,
    question:"Despite criticism, the theory remains ______ and widely respected.",
    options:["tenuous","robust","fragile","weak"],
    answer:"robust"
  },
  {
    id:20,
    question:"Her speech was both inspiring and highly ______.",
    options:["dull","motivating","confusing","irrelevant"],
    answer:"motivating"
  },
  {
    id:21,
    question:"The results of the study were frustratingly ______.",
    options:["conclusive","ambiguous","irrelevant","trivial"],
    answer:"ambiguous"
  },
  {
    id:22,
    question:"This breakthrough may significantly ______ future scientific research.",
    options:["hinder","advance","delay","prevent"],
    answer:"advance"
  },
  {
    id:23,
    question:"The artist is admired for his highly ______ and original style.",
    options:["derivative","innovative","ordinary","common"],
    answer:"innovative"
  },
  {
    id:24,
    question:"The central bank introduced new policies to ______ inflation.",
    options:["reduce","increase","ignore","encourage"],
    answer:"reduce"
  },
  {
    id:25,
    question:"The lawyer presented ______ evidence that convinced the jury.",
    options:["irrelevant","compelling","weak","questionable"],
    answer:"compelling"
  },
  {
    id:26,
    question:"The experimental results were ______ the researcher's predictions.",
    options:["consistent with","contrary to","unrelated to","identical to"],
    answer:"consistent with"
  },
  {
    id:27,
    question:"The author's attitude toward the theory can best be described as ______.",
    options:["supportive","skeptical","indifferent","enthusiastic"],
    answer:"skeptical"
  }
];

function Gre_verbal(){
const API_URL = getApiBaseUrl();  
const [section,setSection]=useState(1);
const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
const [answers,setAnswers]=useState({});
const [timeLeft,setTimeLeft]=useState(18*60);
const [showResult,setShowResult]=useState(false);

const questions = section===1
? verbalQuestions.slice(0,12)
: verbalQuestions.slice(12,27);

const question = questions[currentQuestionIndex];

useEffect(()=>{
const timer=setInterval(()=>{
setTimeLeft(prev=>{
if(prev<=1){
finishQuiz();
return 0;
}
return prev-1;
});
},1000);

return ()=>clearInterval(timer);

},[section,currentQuestionIndex]);

const formatTime=(seconds)=>{
const min=Math.floor(seconds/60);
const sec=seconds%60;
return `${min}:${sec<10?"0":""}${sec}`;
};

const handleOptionSelect=(option)=>{
setAnswers(prev=>({
...prev,
[`${section}-${currentQuestionIndex}`]:option
}));
};

const handleNext=()=>{
if(currentQuestionIndex<questions.length-1){
setCurrentQuestionIndex(prev=>prev+1);
}else{
if(section===1){
setSection(2);
setCurrentQuestionIndex(0);
setTimeLeft(23*60);
}else{
finishQuiz();
}
}
};

const finishQuiz = async () => {

  const score = calculateScore();

  const level =
    score >= 22
      ? "Excellent Verbal Ability"
      : score >= 16
      ? "Strong Verbal Skills"
      : score >= 10
      ? "Moderate Verbal Skills"
      : "Needs Improvement";

  try {

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/tests/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        testName: "GRE Verbal Reasoning",
        result: {
          score: score,
          total: 27,
          level: level
        }
      })
    });

  } catch (err) {
    console.error("Error saving GRE result:", err);
  }

  setShowResult(true);
};

/* FIXED SCORE LOGIC */

const calculateScore=()=>{
let score=0;

Object.keys(answers).forEach((key)=>{

const [sectionIndex,questionIndex] = key.split("-");

let index =
sectionIndex === "1"
? parseInt(questionIndex)
: 12 + parseInt(questionIndex);

if(verbalQuestions[index].answer === answers[key]){
score++;
}

});

return score;
};

const progress=((currentQuestionIndex+1)/questions.length)*100;


/* RESULT SCREEN */

if(showResult){

const score = calculateScore();

const level =
score >= 22
? "Excellent Verbal Ability"
: score >= 16
? "Strong Verbal Skills"
: score >= 10
? "Moderate Verbal Skills"
: "Needs Improvement";

return(

<div style={{
maxWidth:"800px",
margin:"120px auto 60px",
padding:"0 20px",
textAlign:"center"
}}>

<h1 style={{
fontSize:"32px",
color:"#19fd91",
marginBottom:"20px"
}}>
GRE Verbal Reasoning Test
</h1>

<div style={{
background:"#111",
border:"1px solid #19fd91",
borderRadius:"12px",
padding:"30px",
marginTop:"20px"
}}>

<h2>Your GRE Verbal Result</h2>

<div style={{
fontSize:"1.3rem",
fontWeight:"600",
color:"#19fd91",
marginTop:"10px"
}}>
Score: {score} / 27
</div>

<div style={{
fontSize:"1.1rem",
marginTop:"10px"
}}>
{level}
</div>

<div style={{
marginTop:"15px",
color:"#19fd91"
}}>
✅ Complete result stored in profile
</div>

<button
style={{
padding:"12px 25px",
background:"#19fd91",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
fontSize:"16px",
marginTop:"20px"
}}
onClick={()=>window.location.href="/profile"}
>
Go to Profile
</button>

</div>

</div>

);
}

/* QUESTION SCREEN */

return(

<div style={{
minHeight:"100vh",
background:"#111",
display:"flex",
justifyContent:"center",
paddingTop:"140px",
paddingLeft:"15px",
paddingRight:"15px"
}}>

<div style={{width:"100%",maxWidth:"900px",color:"white"}}>

<h2 style={{textAlign:"center",marginBottom:"15px"}}>
GRE Verbal Reasoning — Section {section}
</h2>

<p style={{textAlign:"center",marginBottom:"20px"}}>
<FaClock/> {formatTime(timeLeft)}
</p>

<div style={{height:"8px",background:"#333",borderRadius:"6px",marginBottom:"25px"}}>
<div style={{width:`${progress}%`,background:"#19fd91",height:"100%",borderRadius:"6px"}}></div>
</div>

<h3 style={{marginBottom:"10px"}}>
Question {currentQuestionIndex+1}
</h3>

<p style={{marginBottom:"20px",lineHeight:"1.6"}}>
{question.question}
</p>

{question.options.map((option,index)=>{

const selected=answers[`${section}-${currentQuestionIndex}`]===option;

return(
<div
key={index}
onClick={()=>handleOptionSelect(option)}
style={{
padding:"14px",
border:selected?"2px solid #19fd91":"2px solid #444",
marginBottom:"12px",
cursor:"pointer",
borderRadius:"8px",
background:selected?"#19fd9120":"transparent"
}}
>
{option}
</div>
);

})}

<div style={{textAlign:"center"}}>
<button
onClick={handleNext}
disabled={!answers[`${section}-${currentQuestionIndex}`]}
style={{
background:answers[`${section}-${currentQuestionIndex}`]?"#19fd91":"#555",
color:answers[`${section}-${currentQuestionIndex}`]?"#000":"#aaa",
border:"none",
padding:"12px 32px",
borderRadius:"8px",
fontWeight:"600",
cursor:answers[`${section}-${currentQuestionIndex}`]?"pointer":"not-allowed",
marginTop:"20px",
marginBottom:"40px",
fontSize:"16px"
}}
>
Next
</button>
</div>

</div>
</div>

);
}

export default Gre_verbal;