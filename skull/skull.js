const output = document.getElementById('output');
const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let questionsOrder, currentQuestionIndex; 

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', setNextQuestion);


function startQuiz(e) {
  e.preventDefault();

  questionsOrder = questions;
  currentQuestionIndex = 0;

  quizContainer.style="display: initial !important";
  questionContainer.style="display: initial !important";

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questionsOrder[currentQuestionIndex]);

  currentQuestionIndex++;

  if (currentQuestionIndex == questionsOrder.length) {
    nextButton.style = "display: none";
  }
}

function showQuestion(question) {
  questionElement.innerHTML = `
    <h3> ${question.question} </h3>
    <figure>
      <img class="mb-4 mt-4" src="../images/skull-size.PNG" alt="Skull size">
      <figcaption style="text-align: center">Image via https://naturalhistory.si.edu/</figcaption>
    </figure>`;

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add("btn");
    button.classList.add("btn-light");
    button.classList.add("col-4");
    button.classList.add("mr-4");
    button.classList.add("mb-4");

    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.target;
  let parentQuestion = selectedButton.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling;
  let initialQuestion = parentQuestion.innerText;

  chosenAnswers.push(`${initialQuestion} ${selectedButton.innerText}. `);

  const finalResults = document.createElement('p');
  finalResults.innerText = chosenAnswers;

  if (selectedButton.innerText == 'Chosen answers') {
    answerButtonsElement.appendChild(finalResults);
  }
}

const questions = [
  {
    question: 'How big is the skull?',
    answers: [
      { text: 'First skull', ancestry: 'European'},
      { text: 'Second skull', ancestry: 'American'},
      { text: 'Third skull', ancestry: 'African'},
      { text: 'Much smaller/bigger', ancestry: 'Unknown'}
    ]
  },
    {
    question: `What's the shape of the face?`,
    answers: [
      { text: 'Long and narrow', ancestry: 'European'},
      { text: 'Wide and short', ancestry: 'American'},
      { text: 'Prognathism, mouth projection', ancestry: 'African'},
      { text: 'None of these', ancestry: 'Unknown'}
    ]
  },
  {
    question: `What's the shape of the orbits?`,
    answers: [
      { text: 'Sloping & rounded', ancestry: 'European'},
      { text: 'Rounded', ancestry: 'American'},
      { text: 'Rectangular', ancestry: 'African'},
      { text: 'None of these', ancestry: 'Unknown'}
    ]
  },
  {
    question: `How does the nasal opening look?`,
    answers: [
      { text: 'Narrow and high', ancestry: 'European'},
      { text: 'Flared at the base', ancestry: 'American'},
      { text: 'Wide, with smooth border', ancestry: 'African'},
      { text: 'None of these', ancestry: 'Unknown'}
    ]
  },
  {
    question: `Anything else stands out?`,
    answers: [
      { text: 'Sharp inferior nasal border', ancestry: 'European'},
      { text: 'Large teeth with shovel shaped incisors', ancestry: 'American'},
      { text: 'Large teeth, wrinkling of molars', ancestry: 'African'},
      { text: 'Nothing much', ancestry: 'Unknown'}
    ]
  },
  {
    question: `Click to see your chosen answers`,
    answers: [{text: 'Chosen answers'}]
  }
]


let chosenAnswers = [
  
]


