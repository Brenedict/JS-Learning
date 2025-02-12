const body_element = document.body;

const questions_container = document.getElementById('questions-container');
const start_container = document.getElementById('start-container');
const questionnaires_select = document.getElementById('questionnaires-select');

const question = document.getElementById('question');
const buttons_grid = document.getElementById('buttons-grid');

const question_number = document.getElementById("question-number");
const question_results_container = document.getElementById("question-results-container");
const questionnaire_name = document.getElementById('questionnaire-name');

const end_container = document.getElementById("end-container");
const score = document.getElementById("score");
const score_percentage = document.getElementById("score-percentage");

const correctAudio = new Audio("audio/correct.mp3");
const incorrectAudio = new Audio("audio/incorrect.mp3");

var total_question_count = 0;
var question_index = 0;
var total_score = 0;

// Records all correct/incorrect marks
var quiz_marks_record = [];

// Holds the questions stored within the json files
let questions = [];

// Ensures the correct question set is fetch upon loading/reloading of the window
window.onload = ( ) => {
    fetch(`questions/${questionnaires_select.options[questionnaires_select.selectedIndex].value}.json`)
        .then( response => response.json())
        .then( json => {
            questions = json;
            total_question_count = questions.length;
            shuffleQuestionSet(questions);  
            console.log(questions);
        })

        .catch( error => console.error("error loading json: " + error));

};

// Detects change on the select tag and changes the question set accordingly
questionnaires_select.addEventListener("change", ( ) => {
    let jsonFile = `questions/${questionnaires_select.value}.json`;
    fetch(jsonFile)
        .then( response => response.json())
        .then( json => {
            questions = json;
            total_question_count = questions.length;
            shuffleQuestionSet(questions);
            console.log(questions);  
        })
        .catch( error => console.error("error loading json: " + error));
});

function shuffleQuestionSet(question_set) {
    for(let i = 0 ; i < total_question_count - 1 ; i++) {
        for(let j = 0 ; j < total_question_count - 1; j++) {
            let random = Math.round(Math.random() * 3);
            if(random >= 1) {
                // Swap current question with next
                let temp = question_set[j];
                question_set[j] = question_set[j+1];
                question_set[j+1] = temp;
            }
        }
    }

    for(let i = 0 ; i < total_question_count ; i++) {
        shuffleAnswerSet(question_set[i].answers);
    }
}

function shuffleAnswerSet(answer_set) {
    for(let i = 0 ; i < answer_set.length - 1 ; i++) {
        for(let j = 0 ; j < answer_set.length - 1; j++) {
            let random = Math.round(Math.random() * 3);
            if(random >= 1) {
                // Swap current question with next
                let temp = answer_set[j];
                answer_set[j] = answer_set[j+1];
                answer_set[j+1] = temp;
            }
        }
    }
}

function startQuiz() {
    questions_container.classList.remove("hide");
    start_container.classList.add("hide");

    // Updates the name of the questionnaire to correspond with the selected on
    questionnaire_name.innerText = questionnaires_select.options[questionnaires_select.selectedIndex].innerText;
    showQuestion(questions[question_index++]);
}

function endQuiz() {
    end_container.classList.remove("hide");
    questions_container.classList.add("hide");

    // DOM Manipulation for score portion
    score.innerText = `YOU SCORED: ${total_score}/${total_question_count}`;
    score_percentage.innerText = `${(total_score/total_question_count*100).toFixed(2)}%`;

    generateQuizReview(questions, quiz_marks_record);
}

function clearQuestionState() {
    question.innerText = "";
    body_element.classList.remove("correct");
    body_element.classList.remove("wrong");
    
    // Removes the button choices
    while(buttons_grid.firstChild) {
        buttons_grid.removeChild(buttons_grid.lastChild);
    } 
}

function setNextQuestion() {
    if(question_index < total_question_count) {
        clearQuestionState();
        showQuestion(questions[question_index++]);
    } 

    // Tracks if the quiz is already supposed to end
    else endQuiz();     
}

function displayCorrectAnswersCSS() {
    // Updates CSS of the button choices after choosing an answer
    buttons_grid.childNodes.forEach(node => {
        if(node.nodeName === "BUTTON") {
            if(node.dataset.correct === "true") {
                node.classList.add("show-correct");
            }
            else {
                node.classList.add("show-incorrect");
            }

            // Disables the buttons
            node.disabled = true;
            node.style.pointerEvents = "none";
        }
    });
}

function selectCorrectAnswer() {
    displayCorrectAnswersCSS();
    
    correctAudio.play();

    // Next question delay
    window.setTimeout(setNextQuestion, 2000);

    total_score++;

    // Marks the current question to be "correct"
    quiz_marks_record[question_index-1] = true;
}

function selectWrongAnswer() {
    displayCorrectAnswersCSS();

    incorrectAudio.play();

    // Next question delay
    window.setTimeout(setNextQuestion, 2000);

    // Marks the current question to be "incorrect"
    quiz_marks_record[question_index-1] = false;
}

function showQuestion(question_element) {
    // Sets current question number
    question_number.innerText = `Question ${question_index} / ${total_question_count}`;

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
            answer_button.dataset.correct = answer.correct;
            answer_button.addEventListener('click', selectWrongAnswer);
        }

        buttons_grid.appendChild(answer_button);
    });
   
}

function generateQuizReview(question_set, quiz_marks_record) {
    let i = 0;

    // Creates individual records of correct/incorrect marks gotten per question
    question_set.forEach(item => {
        let question_entry = document.createElement('div');

        let mark = quiz_marks_record[i] === true ? "Correct" : "Wrong";

        question_entry.innerText = `Question ${i+1}: ${mark}`;
        question_entry.classList.add("question-entry");
        
        // Differentiates css designs based on marks
        if(quiz_marks_record[i] === true) {
            question_entry.classList.add("question-entry-correct");
        }
        
        question_results_container.appendChild(question_entry);

        i++;
    });
}
