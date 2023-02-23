var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var playerHeight = 20;
var playerWidth = 20;
var playerX = 20;
var offsetBottom = canvas.height - 130;
var playerY = canvas.height - playerHeight - offsetBottom;

var jumpLimit = 32;
var jumpUpSpeed = 2;
var jumpDownSpeed = 2.5;
var isJumping = 0;
var dy = 0;

var block;
var blockX = canvas.width;
var blockWidth = getRandomIntInclusive(15, 25);
var blockHeight = getRandomIntInclusive(20, 40);
var blockY = canvas.height - blockHeight - offsetBottom;
var blockXSpeed = -2;

addEventListener("keydown", keyPressHandler);

function startGame() {
  drawPlayer();
}

function drawPlayer() {
  //   console.log("drawPlayer called");
  if (playerY > canvas.height - playerHeight - offsetBottom) {
    // console.log("height too small", dy);
    playerY = canvas.height - playerHeight - offsetBottom;
    stopJump();
  }
  playerY += dy;
  ctx.fillStyle = "#191919";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function makeJump() {
  if (isJumping === 0) {
    // console.log("make jump called", isJumping);
    isJumping = 1;
    dy = -jumpUpSpeed;
  }
}

function moveDown() {
  if (isJumping === 1) {
    isJumping = -1;
    dy = jumpDownSpeed;
  }
}

function stopJump() {
  dy = 0;
  isJumping = 0;
}

function checkJumpLimit() {
  if (isJumping === 1 && playerY < jumpLimit) {
    moveDown();
  }
}

function keyPressHandler(e) {
  if (e.keyCode === 38) {
    // console.log("Arrow key pressed");
    makeJump();
  }
}

function createLane() {
  ctx.moveTo(0, 130);
  ctx.lineTo(canvas.clientWidth, 130);
  //   ctx.lineWidth = 1;
  ctx.strokeStyle = "grey";
  ctx.stroke();
}
function updateCanvas() {
  requestAnimationFrame(updateCanvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createLane();
  checkJumpLimit();
  drawPlayer();
  drawBlocks();
  detectCollision();
}

function drawBlocks() {
  if (blockX < -blockWidth) {
    blockX = canvas.width;
    blockWidth = getRandomIntInclusive(15, 25);
    blockHeight = getRandomIntInclusive(20, 40);
    blockY = canvas.height - blockHeight - offsetBottom;
  }
  ctx.fillStyle = "green";
  ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
  blockX += blockXSpeed;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function detectCollision() {
  let brickLeft = blockX;
  let brickRight = brickLeft + blockWidth;
  let brickTop = blockY;
  let brickBottom = 130;

  if (
    playerX + playerWidth >= brickLeft &&
    playerX + playerWidth <= brickRight &&
    playerY + playerHeight >= brickTop &&
    playerY + playerHeight <= brickBottom
  ) {
    alert("GAME OVER MAN");
    document.location.reload();
  }
}

updateCanvas();
// dinosaur
// jumps (imitate gravity)

// attacking blocks
// move to the dinosaur

// collision dettection

// infinite regeneration of attacking blocks
