const output = document.getElementById('output');
const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('startBtn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let questionsOrder, currentQuestionIndex; 

startButton.addEventListener('click', startQuiz);

function startQuiz(e) {
  e.preventDefault();

  questionsOrder = questions;
  currentQuestionIndex = 0;

  quizContainer.style="display: initial !important";
  questionContainer.style="display: initial !important";

  setNextQuestion();
}

function setNextQuestion() {
  showQuestion(questionsOrder[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerHTML = `
    <h3> ${question.question} </h3>
    <figure>
      <img class="mb-4 mt-4" src="../images/skull-size.PNG" alt="Skull size">
      <figcaption style="text-align: center">Image via https://naturalhistory.si.edu/</figcaption>
    </figure>`;
}

function selectAnswer() {


}

const questions = [
  {
    question: 'How big is the skull?',
    answers: [
      { text: 'Like option 1', },
      { text: 'Like option 2', },
      { text: 'Like option 3', },
      { text: 'Much smaller/bigger', }
    ]
  }
]




