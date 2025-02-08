const body_element = document.body;

const questions_container = document.getElementById('questions-container');
const start_container = document.getElementById('start-container');



const question = document.getElementById('question');
const buttons_grid = document.getElementById('buttons-grid');

var total_question_count = 0;
var question_index = 0;
var total_score = 0;

window.onload = ( ) => {
    questions.forEach(item => {
        total_question_count++;
    });        

    console.log(total_question_count);
};

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
    setNextQuestion();
}

function selectWrongAnswer() {
    body_element.classList.add("wrong");
    setNextQuestion();
}

function showQuestion(question_element) {
    question.innerText = question_element.question;
    question_element.answers.forEach(answer => {
        const answer_button = document.createElement('button');
        answer_button.innerText = answer.text;
        answer_button.classList.add('btn');
        
        console.log(answer)
        if(answer.correct) {
            answer_button.dataset.correct = answer.correct;
            answer_button.addEventListener('click', selectCorrectAnswer);
        } else {
            answer_button.addEventListener('click', selectWrongAnswer);

        }
        buttons_grid.appendChild(answer_button);
    });

}

const questions = [
    {
        question: "How are you?",
        answers: [
            {text: 'Great', correct: true},
            {text: 'Good', correct: false},
            {text: 'Okay', correct: false},
            {text: 'Terrible', correct: false},            
        ]
    },
    {
        question: "Which subject sucks?",
        answers: [
            {text: 'Computer Programming 1', correct: true},
            {text: 'LDDCC', correct: true},
            {text: 'Modeling and Simulation', correct: true},
            {text: 'Intro to Computing', correct: false},            
        ]
    }
]


// function setNextQuestion(question)