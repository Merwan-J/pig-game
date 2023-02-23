const player1Area = document.getElementsByClassName("p1-area")[0];
const player2Area = document.getElementsByClassName("p2-area")[0];
const rollBtn = document.getElementsByClassName("dice-btn");
const holdBtn = document.getElementsByClassName("hold-btn");
const newGameBtn = document.getElementsByClassName("new-game-btn");
const player1Current = document.getElementById("player1-current");
const player2Current = document.getElementById("player2-current");
const player1Total = document.getElementById("player1-total");
const player2Total = document.getElementById("player2-total");
const dice = document.getElementById("dice");

newGameBtn[0].addEventListener("click", newGame);
rollBtn[0].addEventListener("click", roll);
holdBtn[0].addEventListener("click", hold);

const imageMap = new Map([
  [1, "dice-1.png"],
  [2, "dice-2.png"],
  [3, "dice-3.png"],
  [4, "dice-4.png"],
  [5, "dice-5.png"],
  [6, "dice-6.png"],
]);

var turn = 1;
var gameNotOver = true;
dice.style.visibility = "hidden";

function newGame(e) {
  dice.style.visibility = "hidden";
  player1Current.innerHTML = 0;
  player1Total.innerHTML = 0;
  player2Current.innerHTML = 0;
  player2Total.innerHTML = 0;

  player2Area.classList.remove("active");
  if (!gameNotOver) {
    player1Area.classList.remove("winner");
    player2Area.classList.remove("winner");
  }

  player1Area.classList.add("active");
  gameNotOver = true;
  turn = 1;
}

function roll(e) {
  if (gameNotOver) {
    let randomNum = Math.floor(Math.random() * 6 + 1);
    if (dice.style.visibility === "hidden") {
      dice.style.visibility = "visible";
    }

    dice.src = `/img/${imageMap.get(randomNum)}`;

    if (randomNum === 1) {
      if (turn === 1) {
        player1Current.innerHTML = 0;
      } else {
        player2Current.innerHTML = 0;
      }
      changeTurn();
    } else {
      if (turn === 1) {
        player1Current.innerHTML =
          parseInt(player1Current.innerHTML) + randomNum;
      } else {
        player2Current.innerHTML =
          parseInt(player2Current.innerHTML) + randomNum;
      }
    }
  }
}

function hold(e) {
  if (turn == 1) {
    player1Total.innerHTML =
      parseInt(player1Total.innerHTML) + parseInt(player1Current.innerHTML);
    player1Current.innerHTML = 0;
  } else {
    player2Total.innerHTML =
      parseInt(player2Total.innerHTML) + parseInt(player2Current.innerHTML);
    player2Current.innerHTML = 0;
  }
  checkForWinner();
  if (gameNotOver) {
    changeTurn();
  }
}

function changeTurn() {
  if (turn === 1) {
    turn = 2;
    player1Area.classList.remove("active");
    player2Area.classList.add("active");
  } else {
    turn = 1;
    player2Area.classList.remove("active");
    player1Area.classList.add("active");
  }
}

function checkForWinner() {
  if (parseInt(player1Total.innerHTML) >= 100) {
    gameNotOver = false;
    player1Area.classList.add("winner");
  } else if (parseInt(player2Total.innerHTML) >= 100) {
    gameNotOver = false;
    player2Area.classList.add("winner");
  }
}
