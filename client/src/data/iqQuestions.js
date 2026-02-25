const iqQuestions = [
    {
        id: 1,
        question: "Which number completes the series? 2, 5, 10, 17, ...",
        options: ["24", "26", "25", "27"],
        answer: "26", // +3, +5, +7, +9
    },
    {
        id: 2,
        question: "Which word does not belong with the others?",
        options: ["Guitar", "Flute", "Violin", "Cello"],
        answer: "Flute", // String instruments vs Wind
    },
    {
        id: 3,
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
        options: ["True", "False", "Uncertain", "None of the above"],
        answer: "True",
    },
    {
        id: 4,
        question: "Which number completes the analogy? 8 : 4 :: 10 : ?",
        options: ["3", "5", "20", "2"],
        answer: "5", // Half
    },
    {
        id: 5,
        question: "Complete the pattern: O, T, T, F, F, S, S, ...",
        options: ["E", "N", "T", "O"],
        answer: "E", // One, Two, Three... Eight
    },
    {
        id: 6,
        question: "Which of the following can be arranged into a 5-letter English word?",
        options: ["H R G S T", "R I L S A", "T O O M T", "W Q R G S"],
        answer: "R I L S A", // RAILS, LIARS, LAIRS...
    },
    {
        id: 7,
        question: "What comes next in the sequence? 1, 1, 2, 3, 5, 8, ...",
        options: ["11", "12", "13", "14"],
        answer: "13", // Fibonacci
    },
    {
        id: 8,
        question: "Finger is to Hand as Leaf is to ...",
        options: ["Tree", "Branch", "Blossom", "Bark"],
        answer: "Branch", // Part of structural whole sequence
    },
    {
        id: 9,
        question: "Choose the number that is 1/4 of 1/2 of 1/5 of 200.",
        options: ["2", "4", "5", "10"],
        answer: "5", // (200/5)/2)/4 = 40/2/4 = 20/4 = 5
    },
    {
        id: 10,
        question: "Which number should replace the question mark? 7, 10, 8, 11, 9, 12, ...",
        options: ["7", "10", "12", "13"],
        answer: "10", // +3, -2 pattern
    },
    {
        id: 11,
        question: "Book is to Reading as Fork is to ...",
        options: ["Drawing", "Writing", "Stirring", "Eating"],
        answer: "Eating",
    },
    {
        id: 12,
        question: "Find the odd one out.",
        options: ["Triangle", "Square", "Sphere", "Rectangle"],
        answer: "Sphere", // 3D vs 2D
    },
    {
        id: 13,
        question: "What is the next number? 100, 99, 96, 91, 84, ...",
        options: ["73", "75", "77", "79"],
        answer: "75", // -1, -3, -5, -7, -9
    },
    {
        id: 14,
        question: "CAT is to 3120 as DOG is to ...",
        options: ["4157", "4150", "4152", "4125"],
        answer: "4157", // C=3, A=1, T=20
    },
    {
        id: 15,
        question: "If you rearrange the letters 'CIFAIPC', you would have the name of a(n):",
        options: ["City", "Animal", "Ocean", "River"],
        answer: "Ocean", // PACIFIC
    },
    {
        id: 16,
        question: "Which number completes the grid? \n 2  4  8 \n 3  9 27 \n 4 16  ?",
        options: ["32", "64", "48", "24"],
        answer: "64", // Powers: 2^1, 2^2, 2^3... 4^3 = 64
    },
    {
        id: 17,
        question: "Ralph likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145. Which does he like?",
        options: ["10", "50", "124", "1600"],
        answer: "1600", // Square numbers
    },
    {
        id: 18,
        question: "A doctor gives you 3 pills and tells you to take one every half hour. How long will the pills last?",
        options: ["1.5 hours", "1 hour", "2 hours", "3 hours"],
        answer: "1 hour", // Take 1st (0:00), 2nd (0:30), 3rd (1:00)
    },
    {
        id: 19,
        question: "Which letter completes the sequence? A, C, F, J, O, ...",
        options: ["T", "U", "S", "R"],
        answer: "U", // +2, +3, +4, +5, +6 (O is 15th, 15+6=21=U) - Wait: A(1)+2=C(3)+3=F(6)+4=J(10)+5=O(15)+6=U(21)
    },
    {
        id: 20,
        question: "Mary's father has five daughters: 1. Nana, 2. Nene, 3. Nini, 4. Nono. What is the name of the fifth daughter?",
        options: ["Nunu", "Nina", "Mary", "None of the above"],
        answer: "Mary",
    }
];

export default iqQuestions;