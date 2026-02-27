// const iqQuestions = [
//     {
//         id: 1,
//         question: "Which number completes the series? 2, 5, 10, 17, ...",
//         options: ["24", "26", "25", "27"],
//         answer: "26", // +3, +5, +7, +9
//     },
//     {
//         id: 2,
//         question: "Which word does not belong with the others?",
//         options: ["Guitar", "Flute", "Violin", "Cello"],
//         answer: "Flute", // String instruments vs Wind
//     },
//     {
//         id: 3,
//         question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
//         options: ["True", "False", "Uncertain", "None of the above"],
//         answer: "True",
//     },
//     {
//         id: 4,
//         question: "Which number completes the analogy? 8 : 4 :: 10 : ?",
//         options: ["3", "5", "20", "2"],
//         answer: "5", // Half
//     },
//     {
//         id: 5,
//         question: "Complete the pattern: O, T, T, F, F, S, S, ...",
//         options: ["E", "N", "T", "O"],
//         answer: "E", // One, Two, Three... Eight
//     },
//     {
//         id: 6,
//         question: "Which of the following can be arranged into a 5-letter English word?",
//         options: ["H R G S T", "R I L S A", "T O O M T", "W Q R G S"],
//         answer: "R I L S A", // RAILS, LIARS, LAIRS...
//     },
//     {
//         id: 7,
//         question: "What comes next in the sequence? 1, 1, 2, 3, 5, 8, ...",
//         options: ["11", "12", "13", "14"],
//         answer: "13", // Fibonacci
//     },
//     {
//         id: 8,
//         question: "Finger is to Hand as Leaf is to ...",
//         options: ["Tree", "Branch", "Blossom", "Bark"],
//         answer: "Branch", // Part of structural whole sequence
//     },
//     {
//         id: 9,
//         question: "Choose the number that is 1/4 of 1/2 of 1/5 of 200.",
//         options: ["2", "4", "5", "10"],
//         answer: "5", // (200/5)/2)/4 = 40/2/4 = 20/4 = 5
//     },
//     {
//         id: 10,
//         question: "Which number should replace the question mark? 7, 10, 8, 11, 9, 12, ...",
//         options: ["7", "10", "12", "13"],
//         answer: "10", // +3, -2 pattern
//     },
//     {
//         id: 11,
//         question: "Book is to Reading as Fork is to ...",
//         options: ["Drawing", "Writing", "Stirring", "Eating"],
//         answer: "Eating",
//     },
//     {
//         id: 12,
//         question: "Find the odd one out.",
//         options: ["Triangle", "Square", "Sphere", "Rectangle"],
//         answer: "Sphere", // 3D vs 2D
//     },
//     {
//         id: 13,
//         question: "What is the next number? 100, 99, 96, 91, 84, ...",
//         options: ["73", "75", "77", "79"],
//         answer: "75", // -1, -3, -5, -7, -9
//     },
//     {
//         id: 14,
//         question: "CAT is to 3120 as DOG is to ...",
//         options: ["4157", "4150", "4152", "4125"],
//         answer: "4157", // C=3, A=1, T=20
//     },
//     {
//         id: 15,
//         question: "If you rearrange the letters 'CIFAIPC', you would have the name of a(n):",
//         options: ["City", "Animal", "Ocean", "River"],
//         answer: "Ocean", // PACIFIC
//     },
//     {
//         id: 16,
//         question: "Which number completes the grid? \n 2  4  8 \n 3  9 27 \n 4 16  ?",
//         options: ["32", "64", "48", "24"],
//         answer: "64", // Powers: 2^1, 2^2, 2^3... 4^3 = 64
//     },
//     {
//         id: 17,
//         question: "Ralph likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145. Which does he like?",
//         options: ["10", "50", "124", "1600"],
//         answer: "1600", // Square numbers
//     },
//     {
//         id: 18,
//         question: "A doctor gives you 3 pills and tells you to take one every half hour. How long will the pills last?",
//         options: ["1.5 hours", "1 hour", "2 hours", "3 hours"],
//         answer: "1 hour", // Take 1st (0:00), 2nd (0:30), 3rd (1:00)
//     },
//     {
//         id: 19,
//         question: "Which letter completes the sequence? A, C, F, J, O, ...",
//         options: ["T", "U", "S", "R"],
//         answer: "U", // +2, +3, +4, +5, +6 (O is 15th, 15+6=21=U) - Wait: A(1)+2=C(3)+3=F(6)+4=J(10)+5=O(15)+6=U(21)
//     },
//     {
//         id: 20,
//         question: "Mary's father has five daughters: 1. Nana, 2. Nene, 3. Nini, 4. Nono. What is the name of the fifth daughter?",
//         options: ["Nunu", "Nina", "Mary", "None of the above"],
//         answer: "Mary",
//     }
// ];

// export default iqQuestions;
// iqQuestions.js
const iqQuestions = [
    // ========== SECTION 1: LOGIC AND REASONING (8 Questions) ==========
    {
        id: 1,
        question: "Odometer is to mileage as compass is to:",
        options: ["Speed", "Hiking", "Direction", "Needle"],
        answer: "Direction",
    },
    {
        id: 2,
        question: "Elated is to despondent as enlightened is to:",
        options: ["Aware", "Ignorant", "Miserable", "Tolerant"],
        answer: "Ignorant",
    },
    {
        id: 3,
        question: "Conductor is to orchestra as teacher is to:",
        options: ["Textbook", "Classroom", "Students", "Principal"],
        answer: "Students",
    },
    {
        id: 4,
        question: "All squares have four sides. This shape has four sides. Therefore:",
        options: ["It must be a square", "It could be a square", "It is not a square", "It is a rectangle"],
        answer: "It could be a square",
    },
    {
        id: 5,
        question: "No birds are mammals. All penguins are birds. Therefore:",
        options: ["Penguins are mammals", "Penguins are not mammals", "Some penguins are mammals", "Penguins are fish"],
        answer: "Penguins are not mammals",
    },
    {
        id: 6,
        question: "If you have a 3‑gallon jug and a 5‑gallon jug, how can you measure exactly 4 gallons?",
        options: [
            "Fill 5, pour into 3, empty 3, pour remaining 2 into 3, fill 5, pour into 3 until full",
            "Fill 3, pour into 5, fill 3, pour into 5 until full, empty 5, pour 3 into 5",
            "Fill 5 and 3, mix them",
            "It's impossible"
        ],
        answer: "Fill 5, pour into 3, empty 3, pour remaining 2 into 3, fill 5, pour into 3 until full",
    },
    {
        id: 7,
        question: "A doctor gives you three pills and tells you to take one every half hour. How many minutes will the pills last?",
        options: ["60", "90", "120", "30"],
        answer: "60",
    },
    {
        id: 8,
        question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        options: ["$0.05", "$0.10", "$0.15", "$0.20"],
        answer: "$0.05",
    },

    // ========== SECTION 2: SPATIAL AWARENESS (6 Questions with SVG) ==========
    {
        id: 9,
        question: "Which of the following is a rotation of this shape?<br/><svg width='80' height='80' viewBox='0 0 40 40'><polygon points='20,5 35,35 5,35' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
        options: [
            "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='5,20 35,5 35,35' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='20,35 5,5 35,5' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><rect x='10' y='10' width='20' height='20' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><circle cx='20' cy='20' r='15' fill='lightgray' stroke='white' stroke-width='2'/></svg>"
        ],
        answer: "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='5,20 35,5 35,35' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
    },
    {
        id: 10,
        question: "Which of the following is a rotation of this shape?<br/><svg width='80' height='80' viewBox='0 0 40 40'><polygon points='20,5 35,20 20,35 5,20' fill='lightgray' stroke='white' stroke-width='2'/></svg> ",
        options: [
            "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='5,20 20,5 35,20 20,35' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><rect x='10' y='10' width='20' height='20' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='10,10 30,10 30,30 10,30' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
            "<svg width='80' height='80' viewBox='0 0 40 40'><circle cx='20' cy='20' r='15' fill='lightgray' stroke='white' stroke-width='2'/></svg>"
        ],
        answer: "<svg width='80' height='80' viewBox='0 0 40 40'><polygon points='5,20 20,5 35,20 20,35' fill='lightgray' stroke='white' stroke-width='2'/></svg>",
    },
    {
        id: 11,
        question: "A square piece of paper is folded in half, then folded in half again. A hole is punched through all layers. When unfolded, how many holes will there be?",
        options: ["1", "2", "3", "4"],
        answer: "4",
    },
    {
        id: 12,
        question: "If you fold a paper once and punch a hole at the folded edge, how many holes appear when unfolded?",
        options: ["1", "2", "3", "4"],
        answer: "2",
    },
    {
        id: 13,
        question: "Which net folds into a cube?(All six squares in a line)<br/><svg width='160' height='120' viewBox='0 0 80 60'><rect x='10' y='10' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/><rect x='30' y='10' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/><rect x='50' y='10' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/><rect x='10' y='30' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/><rect x='30' y='30' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/><rect x='50' y='30' width='20' height='20' fill='lightgray' stroke='white' stroke-width='1.5'/></svg>",
        options: ["Yes, it's a valid net", "No, it's not a valid net", "Only if you rotate it", "Depends on the cube size"],
        answer: "Yes, it's a valid net",
    },
    {
        id: 14,
        question: "On a standard dice, opposite sides sum to 7. If 3 is on top and 4 is facing you, what number is on the bottom?",
        options: ["1", "3", "4", "6"],
        answer: "4",
    },

    // ========== SECTION 3: VERBAL REASONING (8 Questions) ==========
    {
        id: 15,
        question: "Father : Mother :: Uncle : _____",
        options: ["Cousin", "Aunt", "Nephew", "Sister"],
        answer: "Aunt",
    },
    {
        id: 16,
        question: "Tree : Forest :: Star : _____",
        options: ["Sky", "Galaxy", "Night", "Moon"],
        answer: "Galaxy",
    },
    {
        id: 17,
        question: "Petal : Flower :: Page : _____",
        options: ["Book", "Paper", "Reading", "Cover"],
        answer: "Book",
    },
    {
        id: 18,
        question: "Despite his ______ nature, he was surprisingly kind to children.",
        options: ["genial", "irascible", "jovial", "amiable"],
        answer: "irascible",
    },
    {
        id: 19,
        question: "The _______ rainfall led to widespread flooding in the region.",
        options: ["minimal", "sporadic", "torrential", "anticipated"],
        answer: "torrential",
    },
    {
        id: 20,
        question: "Her _______ speech bored the audience to tears.",
        options: ["animated", "interminable", "passionate", "eloquent"],
        answer: "interminable",
    },
    {
        id: 21,
        question: "Which word does not belong? <br/>Apple, Banana, Carrot, Orange",
        options: ["Apple", "Banana", "Carrot", "Orange"],
        answer: "Carrot",
    },
    {
        id: 22,
        question: "Which word does not belong?<br/> Happy, Elated, Joyful, Morose",
        options: ["Happy", "Elated", "Joyful", "Morose"],
        answer: "Morose",
    },

    // ========== SECTION 4: VISUAL ABILITIES (5 Questions with SVG) ==========
    {
         id: 23,
        question: "Complete the pattern:<br/><svg width='200' height='200' viewBox='0 0 120 120'>" +
            "<rect x='0' y='0' width='30' height='30' fill='lightgray' stroke='white'/>" +
            "<circle cx='55' cy='15' r='8' fill='lightgray' stroke='white'/>" +
            "<rect x='80' y='0' width='30' height='30' fill='lightgray' stroke='white'/>" +
            "<circle cx='15' cy='55' r='8' fill='lightgray' stroke='white'/>" +
            "<rect x='40' y='40' width='30' height='30' fill='lightgray' stroke='white'/>" +
            "<circle cx='95' cy='55' r='8' fill='lightgray' stroke='white'/>" +
            "<rect x='0' y='80' width='30' height='30' fill='lightgray' stroke='white'/>" +
            "<circle cx='55' cy='95' r='8' fill='lightgray' stroke='white'/>" +
            "<text x='95' y='105' font-size='24' fill='white' text-anchor='middle'>?</text>" +
            "</svg>",
        options: ["Square", "Circle", "Triangle", "None"],
        answer: "Square",
    },
    // Question 24 – Dot count pattern
    {
        id: 24,
        question: "Complete the pattern:<br/><svg width='200' height='200' viewBox='0 0 120 120'>" +
            // Cell outlines
            "<rect x='0' y='0' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='40' y='0' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='80' y='0' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='0' y='40' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='40' y='40' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='80' y='40' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='0' y='80' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='40' y='80' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            "<rect x='80' y='80' width='30' height='30' fill='none' stroke='white' stroke-width='1'/>" +
            // Dots
            "<circle cx='15' cy='15' r='3' fill='white'/>" +
            "<circle cx='55' cy='15' r='3' fill='white'/>" +
            "<circle cx='95' cy='15' r='3' fill='white'/>" +
            "<circle cx='7' cy='55' r='3' fill='white'/><circle cx='21' cy='55' r='3' fill='white'/>" +
            "<circle cx='45' cy='55' r='3' fill='white'/><circle cx='55' cy='55' r='3' fill='white'/><circle cx='65' cy='55' r='3' fill='white'/>" +
            "<circle cx='95' cy='55' r='3' fill='white'/>" +
            "<circle cx='5' cy='95' r='3' fill='white'/><circle cx='15' cy='95' r='3' fill='white'/><circle cx='25' cy='95' r='3' fill='white'/>" +
            "<circle cx='55' cy='95' r='3' fill='white'/>" +
            "<text x='95' y='105' font-size='24' fill='white' text-anchor='middle'>?</text>" +
            "</svg>",
        options: ["1 dot", "2 dots", "3 dots", "4 dots"],
        answer: "2 dots",
    },
    {
        id: 25,
        question: "How many triangles are in this figure?<br/><svg width='160' height='160' viewBox='0 0 80 80'><rect x='10' y='10' width='60' height='60' fill='none' stroke='white' stroke-width='2'/><line x1='10' y1='10' x2='70' y2='70' stroke='white' stroke-width='2'/><line x1='70' y1='10' x2='10' y2='70' stroke='white' stroke-width='2'/></svg>",
        options: ["4", "6", "8", "10"],
        answer: "6",
    },
    {
        id: 26,
        question: "Which shape is hidden in the larger figure?<br/><svg width='160' height='160' viewBox='0 0 80 80'><rect x='10' y='10' width='60' height='60' fill='none' stroke='white' stroke-width='2'/><circle cx='40' cy='40' r='20' fill='none' stroke='white' stroke-width='2'/><line x1='10' y1='10' x2='70' y2='70' stroke='white' stroke-width='2'/><line x1='10' y1='70' x2='70' y2='10' stroke='white' stroke-width='2'/></svg>",
        options: [
            "<svg width='60' height='60' viewBox='0 0 30 30'><circle cx='15' cy='15' r='10' fill='none' stroke='white' stroke-width='2'/></svg>",
            "<svg width='60' height='60' viewBox='0 0 30 30'><rect x='5' y='5' width='20' height='20' fill='none' stroke='white' stroke-width='2'/></svg>",
            "<svg width='60' height='60' viewBox='0 0 30 30'><polygon points='15,5 25,25 5,25' fill='none' stroke='white' stroke-width='2'/></svg>",
            "<svg width='60' height='60' viewBox='0 0 30 30'><line x1='5' y1='15' x2='25' y2='15' stroke='white' stroke-width='2'/></svg>"
        ],
        answer: "<svg width='60' height='60' viewBox='0 0 30 30'><circle cx='15' cy='15' r='10' fill='none' stroke='white' stroke-width='2'/></svg>",
    },
    {
        id: 27,
        question: "How many cubes are in this stack? (Bottom layer: 9 cubes, middle: 4 cubes, top: 1 cube)",
        options: ["9", "13", "14", "15"],
        answer: "14",
    },

    // ========== SECTION 5: PATTERN RECOGNITION (8 Questions) ==========
    {
        id: 28,
        question: "Find the number that will come in the place of the question mark.<br/>Series: 4, 18, ?, 100, 180, 294, 448.",
        options: ["62", "86", "38", "48"],
        answer: "48",
    },
    {
        id: 29,
        question: "Find the number which would come in place of question mark.<br/>Series: 2, 4, 8, 10, 14, ?.",
        options: ["16", "18", "24", "20"],
        answer: "16",
    },
    {
        id: 30,
        question: "What is the next number? 1, 4, 9, 16, 25, ...",
        options: ["30", "36", "49", "64"],
        answer: "36",
    },
    {
        id: 31,
        question: "What is the next number? 2, 3, 5, 7, 11, 13, ...",
        options: ["15", "17", "19", "21"],
        answer: "17",
    },
    {
        id: 32,
        question: "What is the next number? 1, 1, 2, 3, 5, 8, 13, ...",
        options: ["18", "20", "21", "22"],
        answer: "21",
    },
    {
        id: 33,
        question: "Complete the letter series: A, C, E, G, I, ...",
        options: ["J", "K", "L", "M"],
        answer: "K",
    },
    {
        id: 34,
        question: "Complete the letter series: Z, X, V, T, R, ...",
        options: ["P", "Q", "S", "U"],
        answer: "P",
    },
    {
        id: 35,
        question: "Complete the letter series: A, Z, B, Y, C, X, D, ...",
        options: ["W", "V", "U", "T"],
        answer: "W",
    },

    // ========== SECTION 6: VERBAL COMPREHENSION (6 Questions) ==========
    {
        id: 36,
        question: "What does 'benevolent' mean?",
        options: ["Kind and generous", "Evil and cruel", "Indifferent", "Energetic"],
        answer: "Kind and generous",
    },
    {
        id: 37,
        question: "Define 'ephemeral'.",
        options: ["Lasting a short time", "Lasting a long time", "Eternal", "Fragile"],
        answer: "Lasting a short time",
    },
    {
        id: 38,
        question: "What does 'ubiquitous' mean?",
        options: ["Found everywhere", "Rare", "Mysterious", "Foreign"],
        answer: "Found everywhere",
    },
    {
        id: 39,
        question: "Why do people vote in elections?",
        options: ["To choose their leaders", "To win prizes", "To avoid taxes", "To show off"],
        answer: "To choose their leaders",
    },
    {
        id: 40,
        question: "What is the purpose of a constitution?",
        options: ["To set rules for government", "To collect taxes", "To declare war", "To entertain citizens"],
        answer: "To set rules for government",
    },
    {
        id: 41,
        question: "Why are taxes collected?",
        options: ["To fund public services", "To make people poor", "To control population", "For no reason"],
        answer: "To fund public services",
    },

    // ========== SECTION 7: PROCESSING SPEED (5 Questions) ==========
    {
        id: 42,
        question: "Target Symbol: #<br>Row: @ # $ % ^ & * ( ) +<br>Does the row contain the target?",
        options: ["Yes", "No"],
        answer: "Yes",
    },
    {
        id: 43,
        question: "Target Symbol: &<br>Row: @ # $ % ^ * ( ) +<br>Does the row contain the target?",
        options: ["Yes", "No"],
        answer: "No",
    },
    {
        id: 44,
        question: "Key: 1 = A, 2 = B, 3 = C, 4 = D, 5 = E<br>Code for: 1 3 5",
        options: ["ACE", "BDF", "CEG", "DFH"],
        answer: "ACE",
    },
    {
        id: 45,
        question: "Key: 1 = A, 2 = B, 3 = C, 4 = D, 5 = E<br>Code for: 4 2 1",
        options: ["DBA", "EAB", "CAB", "BDA"],
        answer: "DBA",
    },
    {
        id: 46,
        question: "How many 'e's are in this sentence?<br/> 'The early bird catches the worm.'",
        options: ["4", "5", "6", "7"],
        answer: "5",
    },

    // ========== SECTION 8: WORKING MEMORY (4 Questions - Mental Arithmetic) ==========
    {
        id: 47,
        question: "If you have $10 and buy a $3 sandwich and a $2 drink, how much do you have left?",
        options: ["$4", "$5", "$6", "$7"],
        answer: "$5",
    },
    {
        id: 48,
        question: "Evaluate the expression: (3 + 5) × (4 - 2)²",
        options: ["8", "16", "32", "64"],
        answer: "32",
    },
    {
        id: 49,
        question: "A train leaves at 3:15 PM and arrives at 5:45 PM. How long is the journey?",
        options: ["2 hours", "2 hours 15 minutes", "2 hours 30 minutes", "2 hours 45 minutes"],
        answer: "2 hours 30 minutes",
    },
    {
        id: 50,
        question: "You have 24 apples and want to share them equally among 6 friends. How many apples does each friend get?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    }
];

export default iqQuestions;