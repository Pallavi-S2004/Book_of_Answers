const flipSound = new Audio('flip.mp3');

let answers = [];
let currentAnswer = '';
let flipDirection = true;  // true → right, false → left

fetch('answers.json')
  .then(response => response.json())
  .then(data => {
    answers = data;
  });

document.getElementById('revealBtn').addEventListener('click', () => {
  const button = document.getElementById('revealBtn');
  const card = document.getElementById('bookCard');
  const cardInner = document.getElementById('bookCardInner');

  if (answers.length === 0) return;

  // Pick a new, non-repeating answer
  let newAnswer = currentAnswer;
  while (newAnswer === currentAnswer && answers.length > 1) {
    newAnswer = answers[Math.floor(Math.random() * answers.length)];
  }
  currentAnswer = newAnswer;
  document.getElementById('answerText').innerText = currentAnswer;

  flipSound.play();
  // Hide button during flip
  button.style.display = "none";

  // Flip direction control (Y axis only: left ↔ right)
  if (flipDirection) {
    cardInner.style.transform = "rotateY(180deg)";
  } else {
    cardInner.style.transform = "rotateY(-180deg)";
  }

  flipDirection = !flipDirection;  // Switch direction for next click

  // Reset flip after delay & show button again
  setTimeout(() => {
    cardInner.style.transform = "rotateY(0deg)";
    button.style.display = "inline-block";
  }, 2000);
});
function createStars(count) {
  const starsContainer = document.querySelector('.stars');

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Random size (1px to 3px)
    const size = Math.random() * 2 + 1; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random animation duration (1s to 5s)
    const duration = Math.random() * 4 + 1;
    star.style.animationDuration = `${duration}s`;

    // Random animation delay (0s to 5s)
    const delay = Math.random() * 5;
    star.style.animationDelay = `${delay}s`;

    starsContainer.appendChild(star);
  }
}

// Create 50 random stars
createStars(50);
