// iqQuestions.js
import iq9Image from "../assets/IQ_9.png";
import iq10Image from "../assets/IQ_10.png";
import iq13Image from "../assets/IQ_13.png";
import iq23Image from "../assets/IQ_23.png";
import iq24Image from "../assets/IQ_24.PNG";
import iq25Image from "../assets/IQ_25.png";
import iq27Image from "../assets/IQ_27.png";

const iqQuestions = [
    // ===== VERBAL REASONING =====
    {
        id: 1,
        question: "Which word is a synonym for 'Innate'?",
        options: ["Acquired", "Congenital", "External", "Incidental"],
        answer: "Congenital",
    },
    {
       
    id: 2,
    question: "Which word does not belong in the group based on meaning?",
    options: ["Benevolent", "Altruistic", "Compassionate", "Parsimonious"],
    answer: "Parsimonious",

    },
   {
    id: 3,
    question: "Key is to Lock as Password is to ___",
    options: ["Computer", "Security", "Login", "Access"],
    answer: "Access",
},
    {
        id: 4,
        question: "Light is to Glare as Sound is to ___",
        options: ["Music", "Noise", "Voice", "Silence"],
        answer: "Noise",
    },
    {
        id: 5,
        question: "Which word is most similar to 'Meticulous'?",
        options: ["Sloppy", "Fastidious", "Hasty", "Generic"],
        answer: "Fastidious",
    },
{
    id: 6,
    question: "All pens are instruments. Some instruments are expensive. Which conclusion follows?",
    options: [
        "All pens are expensive",
        "Some pens may be expensive",
        "No pens are expensive",
        "None can be determined"
    ],
    answer: "None can be determined",
},
     // ===== NUMERICAL REASONING =====
{
    id: 7,
    question: "If the average of five consecutive even numbers is 28, what is the largest number?",
    options: ["30", "32", "34", "36"],
    answer: "32",
},
   
{
    id: 8,
    question: "Which number does not belong in the series: 3, 7, 15, 31, 62, 63?",
    options: ["31", "62", "63", "15"],
    answer: "62",
},
{
    id: 9,
    question: "What will be the value of the next term if the pattern continues: 2, 10, 30, 68, 130?",
    options: ["190", "210", "222", "224"],
    answer: "222",
},
{
    id: 10,
    question: "Identify the pattern and choose the next term: 4, 6, 9, 13, 18, 24, ?",
    options: ["30", "31", "32", "33"],
    answer: "31",
},
{
    id: 11,
    question: "If x² + 5x + 6 = 0, what are the possible values of x?",
    options: ["-2 or -3", "2 or 3", "-1 or -6", "1 or 6"],
    answer: "-2 or -3",
},
{
    id: 12,
    question: "What pattern best describes the sequence: 1, 4, 10, 22, 46?",
    options: ["Multiply by 2 and add 2", "Multiply by 2 and add increasing numbers", "Add squares", "Double and subtract 2"],
    answer: "Multiply by 2 and add 2",
},

{
    id: 13,
    question: "What is the sum of all multiples of 3 between 1 and 50?",
    options: ["375", "408", "420", "435"],
    answer: "408",

},
{
    id: 14,
    question: "If 3 → 27, 4 → 64, 5 → 125, then which rule is followed?",
    options: ["Square", "Cube", "Multiply by 9", "Add 24"],
    answer: "Cube",
},
{
    id: 15,
    question: "In the sequence 8, 24, 12, 36, 18, 54, what operation is repeated?",
    options: ["×3, ÷2 alternately", "+16, -12 alternately", "×2, ÷3 alternately", "+10, -6 alternately"],
    answer: "×3, ÷2 alternately",
},
{
    id: 16,
    question: "If the ratio of two numbers is 2:3 and their sum is 25, what is the larger number?",
    options: ["10", "12", "15", "18"],
    answer: "15",
},

  // ===== LOGICAL REASONING (STANDARD + DIFFICULT) =====
{
    id: 17,
    question: "Statements: All programmers are logical thinkers. Some logical thinkers are mathematicians. Which conclusion logically follows?",
    options: [
        "All programmers are mathematicians",
        "Some programmers are mathematicians",
        "No programmers are mathematicians",
        "None can be determined"
    ],
    answer: "None can be determined",
},
{
    id: 18,
    question: "If in a certain code, 'PAPER' is written as 'QBQFS', how is 'TABLE' written?",
    options: ["UBCMF", "UBBLE", "TBCMF", "UABMF"],
    answer: "UBCMF",
},
{
    id: 19,
    question: "If P is left of Q but right of R, and S is right of Q, who is in the middle?",
    options: ["P", "Q", "R", "S"],
    answer: "P",
},
{
    id: 20,
    question: "Find the missing number: 4, 9, 19, 39, ?",
    options: ["69", "79", "81", "83"],
    answer: "79",
},
{
    id: 21,
    question: "Six people are sitting in a row. A is between B and C. D is at one end, and E is next to D. Who is in the middle?",
    options: ["A", "B", "C", "Cannot be determined"],
    answer: "Cannot be determined",
},

{
    id: 22,
    question: "A cube has opposite faces colored Red–Orange, Blue–Green, and White–Yellow. If the Red face is on top and the Blue face is in front, which color is on the bottom?",
    options: ["Orange", "Green", "Yellow", "White"],
    answer: "Orange",
},
    {
        id: 23,
        question: "Complete the pattern",
        image: iq23Image,
        options: ["1", "2", "3", "4"],
        answer: "4",
    },
    {
        id: 24,
        question: "Complete the pattern",
        image: iq24Image,
        options: ["1", "2", "3", "4"],
        answer: "4",
    },
    {
        id: 25,
        question: "How many triangles are in this figure?",
        image: iq25Image,
        options: ["4", "6", "8", "10"],
        answer: "10",
    },
    {
        id: 26,
        question: "How many small cubes form a 3×3×3 cube?",
        image: iq27Image,
        options: ["18", "27", "36", "30"],
        answer: "27",
    },

    // ===== MIXED / APPLICATION =====
    {
        id: 27,
        question: "A cube painted on all sides is cut into 27 cubes. How many have exactly one face painted?",
        options: ["6", "8", "12", "18"],
        answer: "6",
    },
    {
        id: 28,
        question: "Mary is 16 and 4 times as old as her brother. When will she be twice his age?",
        options: ["20", "24", "28", "32"],
        answer: "24",
    },
    {
        id: 29,
        question: "If you have 30 coins, give away 2/3 and get 5 more, how many left?",
        options: ["10", "15", "20", "25"],
        answer: "15",
    },
    {
        id: 30,
        question: "Complete the series: Triangle → Square → Pentagon → ?",
        options: ["Hexagon", "Circle", "Rectangle", "Octagon"],
        answer: "Hexagon",
    },
];

export default iqQuestions;