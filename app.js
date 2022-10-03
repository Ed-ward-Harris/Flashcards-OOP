const card = document.querySelector("#card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const right = document.querySelector(".contright");
const left = document.querySelector(".contleft");
const counter = document.querySelector(".counter");

const data = 'https://ed-ward-harris.github.io/data/flashcard-data.json';
const cards = [];

let flipped = false;
let count = 0;


fetch(data)
    .then(response => response.json())
    .then(questions => cards.push(...questions))
    .then(addNextCard);

function resetCard() {
  card.classList.remove("flipped");
}

function getNextCard() {
    if (count < cards.length) {
      addNextCard();
    } 
  }

function addNextCard(){
    resetCard();
    front.innerHTML = `<p>${cards[count].question}</p>`;
    back.innerHTML = `<p>${cards[count].answer}</p>`;
    counter.innerHTML = `<p>${[count + 1]} / ${cards.length}</p>`;
    count++;
}

function getPrevCard() {
    if (count > 1) {
      resetCard();
      front.innerHTML = `<p>${cards[count - 2].question}</p>`;
      back.innerHTML = `<p>${cards[count - 2].answer}</p>`;
      counter.innerHTML = `<p>${[count - 1]} / ${cards.length}</p>`;
      count--;
    }
  }

function toggleSide() { //flips card, adds class dependant on state
    flipped = !flipped;
    if (flipped) {
        card.classList.add("flipped");
    }
    else {
        card.classList.remove("flipped");
    }
}

right.addEventListener("click", getNextCard);
left.addEventListener("click", getPrevCard);
card.addEventListener("click", toggleSide);
