let timer = 30;
let countdown;

let score = 0;

let currentquestion = 0
let questions = [
  {
    question: "What is a function?",
    choices: ["a", "b", "c", "d"],
    answer: "b"
  },
  {
    question: "What is a another question?",
    choices: ["a", "b", "c", "d"],
    answer: "b"
  },
  {
    question: "What is a javascript question?",
    choices: ["a", "b", "c", "d"],
    answer: "b"
  },
  {
    question: "What is a the last question?",
    choices: ["a", "b", "c", "d"],
    answer: "b"
  },
]

function displayQuestion() {
document.getElementById('question-text').innerText = questions[currentquestion].question
document.getElementById('btn1').innerText = questions[currentquestion].choices[0]
document.getElementById('btn2').innerText = questions[currentquestion].choices[1]
document.getElementById('btn3').innerText = questions[currentquestion].choices[2]
document.getElementById('btn4').innerText = questions[currentquestion].choices[3]
}

function startQuiz() {
	document.getElementById('start-container').style.display = 'none';
	document.getElementById('quiz-form').style.display = 'block';
  displayQuestion()
	countdown = setInterval(function() {
		timer--;
		document.getElementById('timer').textContent = timer + ' seconds remaining';
		if (timer <= 0) {
			clearInterval(countdown);
			document.getElementById('timer').textContent = 'Time is up!';
      displayScoringScreen();
		}
	}, 1000);
}

function checkAnswer(event) {
console.log(event)
let selected = event.target.innerText
let correct = questions[currentquestion].answer
if (selected !== correct){
timer -= 5}
else {
  score += 5
}
console.log(score)

if (currentquestion === questions.length - 1){
  document.getElementById('quiz-form').style.display = 'none';
  clearInterval(countdown);
  displayScoringScreen();
}

currentquestion++
displayQuestion()
}

document.getElementById('btn1').addEventListener('click', checkAnswer)
document.getElementById('btn2').addEventListener('click', checkAnswer)
document.getElementById('btn3').addEventListener('click', checkAnswer)
document.getElementById('btn4').addEventListener('click', checkAnswer)


// funtion that displays scoring-screen element
function displayScoringScreen() {
  document.getElementById('quiz-form').style.display = 'none';
  document.getElementById('scoring-screen').style.display = 'block';
}

// function that displays highscores-screen element
function displayHighScoreScreen() {
  document.getElementById('scoring-screen').style.display = 'none';
  document.getElementById('highscore-screen').style.display = 'block';
}

// function that saves score to local storage
function saveScore() {
  // get value of input box and save it to a variable
  let initials = document.getElementById('initials').value;
  // create object to save both initials and score
  let scoreObj = {
    initials: initials,
    score: score
  }
  // save to local storage
  localStorage.setItem('highscore', JSON.stringify(scoreObj));
}

// function that retrieves scores from local storage and displays them on highscores-screen
function displayHighScores() {
  // get scores from local storage
  let scoreObj = JSON.parse(localStorage.getItem('highscore'));
  // create li tag for each score
  let li = document.createElement('li');
  // display on page
  li.textContent = scoreObj.initials + ' - ' + scoreObj.score;
  document.getElementById('highscores-list').prependChild(li);
}

// function that calls saveScore() and displayHighScoreScreen() when form is submitted
function handleFormSubmit(event) {
  event.preventDefault();
  saveScore();
  displayHighScoreScreen();
  displayHighScores();
}


// function that clears scores from local storage and highscores-screen
function clearHighScores() {
  // clear local storage
  localStorage.clear();
  // clear highscores list
  document.getElementById('highscores-list').innerHTML = '';
}

// function that resets the quiz
function resetQuiz() {
  timer = 30;
  score = 0;
  currentquestion = 0;
  displayQuestion();
  document.getElementById('highscores-screen').style.display = 'none';
  document.getElementById('start-container').style.display = 'block';
}