const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".container-clouds");
const tree1 = document.querySelector(".tree-1");
const tree2 = document.querySelector(".tree-2");
const birds = document.querySelector(".birds");
const gameOver = document.querySelector(".container-game-over");
const backgroundMusic = document.getElementById("backgroundMusic");

const startTime = Date.now();
let intervalID = null;

const playBackgroundMusic = () => {
  backgroundMusic.play();
};

document.addEventListener("keydown", () => {
  playBackgroundMusic();
});

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

document.body.addEventListener("touchstart", () => {
  playBackgroundMusic();
  jump();
});

const updateTimer = () => {
  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  const timerValueElement = document.getElementById("timerValue");
  timerValueElement.textContent = elapsedTime;
};

intervalID = setInterval(updateTimer, 1000);
playBackgroundMusic();

const loop = setInterval(() => {
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  const pipePosition = pipe.offsetLeft;
  const cloudsPosition = clouds.offsetLeft;
  const tree1Position = tree1.getBoundingClientRect();
  const tree2Position = tree2.getBoundingClientRect();
  const birdsPosition = birds.getBoundingClientRect();
  const birdsTransform = window.getComputedStyle(birds).transform;
  const matrix = new DOMMatrix(birdsTransform);
  const rotationInRadians = Math.atan2(matrix.b, matrix.a);

  if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    tree1.style.animation = "none";
    tree1.style.left = `${tree1Position.left}px`;

    tree2.style.animation = "none";
    tree2.style.left = `${tree2Position.left}px`;

    birds.style.animation = "none";
    birds.style.left = `${birdsPosition.left}px`;
    const rotationInDegrees = rotationInRadians * (180 / Math.PI);
    birds.style.transform = `translateX(0vw) rotate(${rotationInDegrees}deg)`;

    gameOver.style.display = "flex";

    clearInterval(intervalID);
    intervalID = null;

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", jump, playBackgroundMusic);
