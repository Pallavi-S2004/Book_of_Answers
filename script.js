let answers = [];
let isFlipped = false;

// Load answers from JSON
fetch('answers.json')
  .then(response => response.json())
  .then(data => {
    answers = data;
  })
  .catch(error => console.error('Error loading answers:', error));

document.getElementById('ask-button').addEventListener('click', function() {
  if (answers.length === 0) return;

  const randomIndex = Math.floor(Math.random() * answers.length);
  const answer = answers[randomIndex];

  const card = document.getElementById('card');
  const answerBoxes = card.querySelectorAll('#answer');

  // Update both sides before/after flip
  if (!isFlipped) {
    answerBoxes[1].innerText = answer; // Back side
  } else {
    answerBoxes[0].innerText = answer; // Front side
  }

  card.classList.toggle('flipped');
  isFlipped = !isFlipped;
});
