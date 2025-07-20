const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hot Mail", correct: false },
      { text: "How To Make Landing-page", correct: false },
      { text: "High Text Machine Language", correct: false },
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Lisbon", correct: false },
    ]
  },
  {
    question: "Which is the smallest planet in our solar system?",
    answers: [
      { text: "Mercury", correct: true },
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  resultContainer.classList.add("hide");
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    const li = document.createElement("li");
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) score++;
  Array.from(answerButtons.children).forEach(li => {
    const btn = li.firstChild;
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.style.background = "#4caf50";
    } else {
      btn.style.background = "#f44336";
    }
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  clearInterval(timer);
  resultContainer.classList.remove("hide");
  resultContainer.innerHTML = <h2>Your Score: ${score} / ${questions.length}</h2>;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
});

startQuiz();
