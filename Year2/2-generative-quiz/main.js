const body_element = document.body;

const questions_container = document.getElementById('questions-container');
const start_container = document.getElementById('start-container');

const question = document.getElementById('question');
const buttons_grid = document.getElementById('buttons-grid');

const question_number = document.getElementById("question-number");

var total_question_count = 0;
var question_index = 0;
var total_score = 0;

window.onload = ( ) => {
    questions.forEach( () => {
        total_question_count++;
    });        

    shuffleQuestionSet(questions);

};

function shuffleQuestionSet(question_set) {
    for(let i = 0 ; i < total_question_count - 1 ; i++) {
        for(let j = 0 ; j < total_question_count - 1; j++) {
            let random = Math.round(Math.random() * 1);
            if(random == 1) {
                // Swap current question with next
                let temp = question_set[j];
                question_set[j] = question_set[j+1];
                question_set[j+1] = temp;
            }
        }
    }
}

function startQuiz(e) {
    questions_container.classList.remove("hide");
    start_container.classList.add("hide");
    showQuestion(questions[question_index++]);
}

function clearQuestionState() {
    question.innerText = "";
    body_element.classList.remove("correct");
    body_element.classList.remove("wrong");
    
    while(buttons_grid.firstChild) {
        buttons_grid.removeChild(buttons_grid.lastChild);
    } 
}

function setNextQuestion() {
    if(question_index < total_question_count) {
        clearQuestionState();
        showQuestion(questions[question_index++]);
    } else {
        question.innerText = total_score;
    }
}

function selectCorrectAnswer() {
    body_element.classList.add("correct");
    total_score++;
    window.setTimeout(setNextQuestion, 2200);
}

function selectWrongAnswer() {
    body_element.classList.add("wrong");
    window.setTimeout(setNextQuestion, 2200);
}

function showQuestion(question_element) {
    // Sets current question number
    question_number.innerText = `Question ${question_index}`;

    // Sets current question
    question.innerText = question_element.question;

    // Generates individual choices
    question_element.answers.forEach(answer => {
        const answer_button = document.createElement('button');
        answer_button.innerText = answer.text;
        answer_button.classList.add('btn-choice');
        answer_button.classList.add('btn');

        if(answer.correct) {
            answer_button.dataset.correct = answer.correct;
            answer_button.addEventListener('click', selectCorrectAnswer);
        } else {
            answer_button.addEventListener('click', selectWrongAnswer);

        }
        buttons_grid.appendChild(answer_button);
    });

}

const questions = 
[
    {
        "question": "What does CPU stand for?",
        "answers": [
            {"text": "Central Processing Unit", "correct": true},
            {"text": "Computer Personal Unit", "correct": false},
            {"text": "Central Peripheral Unit", "correct": false},
            {"text": "Core Processing Utility", "correct": false}
        ]
    },
    {
        "question": "Which of the following is an example of an input device?",
        "answers": [
            {"text": "Keyboard", "correct": true},
            {"text": "Monitor", "correct": false},
            {"text": "Speaker", "correct": false},
            {"text": "Printer", "correct": false}
        ]
    },
    {
        "question": "What is the main function of an operating system?",
        "answers": [
            {"text": "Manages hardware and software resources", "correct": true},
            {"text": "Acts as a search engine", "correct": false},
            {"text": "Provides power to the computer", "correct": false},
            {"text": "Stores all files permanently", "correct": false}
        ]
    },
    {
        "question": "Which file extension is commonly used for an image file?",
        "answers": [
            {"text": ".jpg", "correct": true},
            {"text": ".exe", "correct": false},
            {"text": ".txt", "correct": false},
            {"text": ".mp3", "correct": false}
        ]
    },
    {
        "question": "What is the purpose of a firewall in computing?",
        "answers": [
            {"text": "To block unauthorized access to a network", "correct": true},
            {"text": "To store backup files", "correct": false},
            {"text": "To speed up the internet connection", "correct": false},
            {"text": "To fix hardware issues", "correct": false}
        ]
    },
    {
        "question": "Which of the following is NOT an example of an operating system?",
        "answers": [
            {"text": "Microsoft Office", "correct": true},
            {"text": "Windows", "correct": false},
            {"text": "Linux", "correct": false},
            {"text": "macOS", "correct": false}
        ]
    },
    {
        "question": "What does HTTP stand for?",
        "answers": [
            {"text": "Hypertext Transfer Protocol", "correct": true},
            {"text": "High-Tech Transmission Process", "correct": false},
            {"text": "Hyperlink and Text Transfer Program", "correct": false},
            {"text": "Home Technology Transfer Protocol", "correct": false}
        ]
    },
    {
        "question": "Which of these storage devices has the largest capacity?",
        "answers": [
            {"text": "Hard Disk Drive (HDD)", "correct": true},
            {"text": "CD-ROM", "correct": false},
            {"text": "USB Flash Drive", "correct": false},
            {"text": "Floppy Disk", "correct": false}
        ]
    },
    {
        "question": "Which programming language is primarily used for web development?",
        "answers": [
            {"text": "JavaScript", "correct": true},
            {"text": "Python", "correct": false},
            {"text": "C++", "correct": false},
            {"text": "Swift", "correct": false}
        ]
    },
    {
        "question": "Which key combination is used to copy text on a Windows computer?",
        "answers": [
            {"text": "Ctrl + C", "correct": true},
            {"text": "Ctrl + V", "correct": false},
            {"text": "Ctrl + X", "correct": false},
            {"text": "Ctrl + Z", "correct": false}
        ]
    },
    {
        "question": "Who is the Guinness World Record holder for fastest man alive?",
        "answers": [
            {"text": "Usain Bolt", "correct": true},
            {"text": "Carl Lewis", "correct": false},
            {"text": "Tyson Gay", "correct": false},
            {"text": "Yohan Blake", "correct": false}
        ]
    }
]


// function setNextQuestion(question)