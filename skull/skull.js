const output = document.getElementById('output');
const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const showResults = document.getElementById('show-results-btn');

let questionsOrder, currentQuestionIndex; 

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', setNextQuestion);
prevButton.addEventListener('click', setPreviousQuestion);
showResults.addEventListener('click', checkAncestry);


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

function setPreviousQuestion() {
  resetState();
  currentQuestionIndex--;

  showQuestion(questionsOrder[currentQuestionIndex]);
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
    button.ancestry = answer.ancestry;
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
  selectedButton.style="background-color: #28a745";

  let parentQuestion = selectedButton.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling;
  let initialQuestion = parentQuestion.innerText;

  chosenAnswers.push(`${initialQuestion} ${selectedButton.innerText}. `);
  ancestry.push(`${selectedButton.ancestry}`);

  const finalResults = document.createElement('p');
  finalResults.innerText = chosenAnswers;

  if (selectedButton.innerText == 'Chosen answers') {
    answerButtonsElement.appendChild(finalResults);
    showResults.style = "display: initial";
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

let chosenAnswers = [];
let ancestry = [];

function checkAncestry() {

  let european = ancestry.filter((anc) => anc == "European" ).length;
  let american = ancestry.filter((anc) => anc == "American" ).length;
  let african = ancestry.filter((anc) => anc == "African" ).length;

  let total = european+american+african;
  
  let eurPercentage = (european * 100)/total;
  let americanPercentage = (american * 100)/total;
  let africanPercentage = (african * 100)/total;

  if (chosenAnswers.length < 3 ) {
    output.innerHTML = `<h3 class="mt-4">You didn't answer enough questions. Please start again.</h3>`
  } else {
    let myChart = document.getElementById('myChart').getContext('2d');
    document.getElementById('ancestry-graph').style="display: initial";
    document.getElementById('quiz-container').style="display: none";

    var pieChart = new Chart(myChart, {
      type: 'pie',
      data: {
        labels: ['European', 'American', 'African'],
        datasets: [{
          label: '% chance of a match',
          data: [eurPercentage, americanPercentage, africanPercentage],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],

        }]
      },
    });
  }
}
