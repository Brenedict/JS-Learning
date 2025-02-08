const valueCounter = document.getElementById("people-count");

let count = 0;

function increment() {
    count += 1;
    valueCounter.textContent = count;
}

function decrement() {
    if (count > 0) {
        count -= 1;
        valueCounter.textContent = count;
    }
}