const buttonNo = document.getElementById("button-no");
const buttonYes = document.getElementById("button-yes");
const title = document.getElementById("question-title");
const alerts = ["BAWAL NGA MAG NO💔💔💔", "Di pwede", "Ako na to oh", "Ang sakit mo naman", "Mag yes ka na kasi"];
let count = 0;

function answerNo() {
    const axis = ["-", "+"];
    let xaxis = axis[Math.floor(Math.random()*2)];
    let yaxis = axis[Math.floor(Math.random()*2)];
    let xpos = Math.floor(Math.random()*250);
    let ypos = Math.floor(Math.random()*250);
    buttonNo.style.translate = `${xaxis}${xpos}px ${yaxis}${ypos}px`;
    
    let alertrand = Math.floor(Math.random()*5);
    count++

    if (count >= 5 && count%2 == 1) {
        alert(alerts[alertrand]);
    }
}

function answerYes() {
    
}

