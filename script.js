const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which is the largest country?',
    answers: [
        { text: 'Russia', correct: true },
        { text: 'Canada', correct: false },
        { text: 'China', correct: false },
        { text: 'USA', correct: false }
    ]
  },
  {
    question: 'What is the capital of Australia?',
    answers: [
      { text: 'Camberra', correct: true },
      { text: 'Sydney', correct: false },
      { text: 'Brisbane', correct: false },
    ]
  },
  {
    question: 'Which is the largest ocean?',
    answers: [
      { text: 'Atlantic', correct: false },
      { text: 'Pacific', correct: true },
      { text: 'Indian', correct: false },
      { text: 'Arctic', correct: false }
    ]
  },
  {
    question: 'Which is the best programming language?(according to me)',
    answers: [
      { text: 'PHP', correct: true },
      { text: 'the one with the elephant in the logo', correct: true },
      { text: 'Java', correct: false },
        { text: 'Python', correct: false } 
    ]
  },
  {
    question: 'Are you enjoying this quiz?',
    answers: [
        { text: 'Yes', correct: true },
        { text: 'No', correct: false },
        { text: 'Maybe', correct: false },
        { text: 'I don\'t know', correct: false }
    ]
  },
  {
    question: 'Which is the greatest singer of all time?(according to me)',
    answers: [
        {text: 'Taylor Swift', correct: false},
        {text: 'Ariana Grande', correct: false},
        {text: 'Justin Bieber', correct: false},
        {text: 'Ed Sheeran', correct: false}
  ]}
]
