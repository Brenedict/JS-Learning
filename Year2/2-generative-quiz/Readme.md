# Generative Quiz Application 🎯

This is a **dynamic quiz application** that generates questions based on various topics. Users can select a quiz category and test their knowledge while receiving real-time feedback.

## Features 🚀
- Multiple quiz categories to choose from.
- Quiz options and questions are loaded dynamically from **separate JSON files**.
- Real-time feedback highlighting correct answers.
- Final score evaluation with the option to restart.

---

## Screenshots 📸

### 1. Home Page 🏠
The homepage where users can begin by selecting a quiz category.

![HOME](https://github.com/user-attachments/assets/a69b5980-dcd4-40ba-bf18-63fb66c3fb61)

---

### 2. Quiz Options Dropdown 📚
Dropdown menu displaying available quiz categories.

![HOME-OPTIONS](https://github.com/user-attachments/assets/2967890f-e42f-4892-94c4-24a21018137f)

---

### 3. Quiz Interface ❓
A dynamically generated question with multiple choice options.

![QUIZ](https://github.com/user-attachments/assets/46e7ad79-2056-46dc-b960-f7012d630af1)

---

### 4. Correct Option Highlight ✅
Highlights the correct answer after a selection is made.

![CORRECT-OPTION](https://github.com/user-attachments/assets/39d857ad-baad-45d7-a811-09d4e8d80e09)

---

### 5. Quiz Score and Evaluation 📊
Displays the user's score with details on which questions were answered correctly and provides an option to restart.

![SCORE](https://github.com/user-attachments/assets/13df2797-13e6-4678-a1d2-9b05dd24b52c)

---

## How It Works ⚡
1. Select a quiz category from the dropdown.
2. Questions and correct answers are dynamically loaded from the respective **JSON files**.
3. Answer each question to the best of your knowledge.
4. Receive immediate feedback after each question.
5. View your score and restart if desired.

## Getting Started 🛠️
To run this project locally:
1. Clone the repository.
2. Open `index.html` in your browser.
3. Start exploring the quiz!

---

## JSON Structure 📄
Each quiz category is stored in its own JSON file in the following format:
```json
[
  {
    "question": "What is the capital of France?",
    "options": ["Paris", "Berlin", "Rome", "Madrid"],
    "answer": "Paris"
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Earth", "Mars", "Jupiter", "Venus"],
    "answer": "Mars"
  }
]
```
