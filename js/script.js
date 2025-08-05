
let secretNumber;
let attempts;
let maxAttempts = 5;
let best = null;

const feedback = document.getElementById('feedback');
const roast = document.getElementById('roast');
const gameArea = document.getElementById('gameArea');
const guessInput = document.getElementById('guessInput');
const ding = document.getElementById('ding');
const buzz = document.getElementById('buzz');
const bestScore = document.getElementById('bestScore');
const attemptsInfo = document.getElementById('attemptsInfo');
const endMessage = document.getElementById('endMessage');

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  feedback.textContent = '';
  roast.textContent = '';
  endMessage.textContent = '';
  gameArea.classList.remove('hidden');
  guessInput.value = '';
  guessInput.focus();
  updateAttempts();
}

function submitGuess() {
  const guess = Number(guessInput.value.trim());
  guessInput.value = '';
  guessInput.focus();

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = 'Enter a number between 1 and 100!';
    buzz.play();
    return;
  }

  attempts++;
  updateAttempts();

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Correct! You guessed it in ${attempts} attempt(s)!`;
    roast.textContent = attempts === 1 ? "Okay... that was suspiciously good." : "Took you long enough.";
    ding.play();
    if (!best || attempts < best) {
      best = attempts;
      bestScore.textContent = `🏆 Best Score: ${best} attempt(s)`;
    }
    endGame("win");
  } else {
    buzz.play();
    feedback.textContent = guess < secretNumber
      ? '📉 Too low. Even your self-esteem is higher.'
      : '📈 Too high. Like your ego.';
    switch (attempts) {
      case 2:
        roast.textContent = '🤡 That second guess? Bold move.';
        break;
      case 3:
        roast.textContent = '🧠 Try using the thing inside your skull.';
        break;
      case 4:
        roast.textContent = '🥴 Last chance. No pressure or anything.';
        break;
    }
    if (attempts >= maxAttempts) {
      feedback.textContent = `💀 Game Over! The number was ${secretNumber}.`;
      roast.textContent = "Well that was embarrassing...";
      endGame("lose");
    }
  }
}

function updateAttempts() {
  attemptsInfo.textContent = `Attempts: ${attempts}/${maxAttempts}`;
}

function endGame(result) {
  if (result === "win") {
    endMessage.textContent = "👏 Victory! Feel free to rub it in everyone's face.";
  } else {
    endMessage.textContent = "💩 You lost. But hey, at least you're consistent.";
  }
}

guessInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    submitGuess();
  }
});
