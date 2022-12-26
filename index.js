let obstacleList = [
  // ground11, ground12, ground13, ground14, ground15,
  // ground21, ground22, ground23, ground24, ground25,
  // ground31, ground32, ground33, ground34, ground35,
  // ground41, ground42, ground43, ground44, ground45,
  // ground51, ground52, ground53, ground54, ground55,

  // [-5, 0, -5], [-2.5, 0, -5], [0, 0, -5], [2.5, 0, -5], [5, 0, -5],
  // [-5, 0, -2.5], [-2.5, 0, -2.5], [0, 0, -2.5], [2.5, 0, -2.5], [5, 0, -2.5],
  // [-5, 0, 0], [-2.5, 0, 0], [0, 0, 0], [2.5, 0, 0], [5, 0, 0],
  // [-5, 0, 2.5], [-2.5, 0, 2.5], [0, 0, 2.5], [2.5, 0, 2.5], [5, 0, 2.5],
  // [-5, 0, 5], [-2.5, 0, 5], [0, 0, 5], [2.5, 0, 5], [5, 0, 5],

  // [
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  // ],

  [
    [0, 0, 2, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 2, 1, 3, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 2, 1, 1, 0],
    [0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 2, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 3, 0, 0, 0],
  ],
  [
    [2, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 3],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [2, 0, 3, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
  ],
  [
    [2, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 3],
  ],
  [
    [0, 0, 1, 1, 2],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [3, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 2, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 3],
  ],
  [
    [0, 2, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 3, 0, 0],
  ],
];

// user interface list
let titleUI = document.getElementById("title");
let stepListUI = document.getElementById("stepListUI");
let startButtonUI = document.getElementById("startButtonUI");
let turnLeftButtonUI = document.getElementById("turnLeftButtonUI");
let turnRightButtonUI = document.getElementById("turnRightButtonUI");
let moveForwardButtonUI = document.getElementById("moveForwardButtonUI");
let undoButtonUI = document.getElementById("undoButtonUI");
let resetButtonUI = document.getElementById("resetButtonUI");
let moveButtonUI = document.getElementById("moveButtonUI");
let replayButtonUI = document.getElementById("replayButtonUI");
let processingButtonUI = document.getElementById("processingButtonUI");
let scoreUI = document.getElementById("scoreUI");

// chicken
let chicken = document.getElementById("chicken");

// variable list
let play = false;
let score = 0;
let currentObstacle = 0;
let step = [];

startButtonUI.addEventListener("click", startGame);

function startGame() {
  if (!play) {
    console.log("Game Started");
    play = true;
    score = 0;
    currentObstacle = 0;
    step = [];

    scoreUI.classList.add("hidden");

    playAudio("buttonClickAudio");

    startButtonUI.classList.add("hidden");
    hideInGameUI(false);

    // shuffle(obstacleList);
    obstacleGenerator();
  }
}

function obstacleGenerator() {
  let obstacle = obstacleList[currentObstacle];
  for (let i = 0; i < obstacle.length; i++) {
    for (let j = 0; j < obstacle[i].length; j++) {
      let ground = document.getElementById(`ground${i + 1}${j + 1}`);
      if (obstacle[i][j] >= 1) {
        ground.setAttribute("visible", "true");
        if (obstacle[i][j] == 2) {
          chickenPositioner(ground);
        }
      } else {
        ground.setAttribute("visible", "false");
      }
    }
  }
}

function chickenPositioner(ground) {
  let groundPosition = ground.getAttribute("position");
  let chickenPosition = {
    x: groundPosition.x,
    y: 1.3,
    z: groundPosition.z,
  };
  chicken.setAttribute("position", chickenPosition);
  chicken.setAttribute("rotation", { x: 0, y: 0, z: 0 });
}

moveButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    if (step.length > 0) {
      chicken.removeAttribute("animation");
      hideInGameUI(true);
      processingButtonUI.classList.remove("hidden");
      let interval = setInterval(function () {
        playAudio("stepAudio");
        let currentStep = step.shift();
        if (currentStep == "turnLeft") {
          let chickenRotation = chicken.getAttribute("rotation");
          chickenRotation.y += 90;
          chicken.setAttribute("rotation", chickenRotation);
        } else if (currentStep == "turnRight") {
          let chickenRotation = chicken.getAttribute("rotation");
          chickenRotation.y -= 90;
          chicken.setAttribute("rotation", chickenRotation);
        } else if (currentStep == "moveForward") {
          let chickenRotation = chicken.getAttribute("rotation");
          let chickenPosition = chicken.getAttribute("position");
          chickenRotation.y = ((chickenRotation.y % 360) + 360) % 360;
          if (chickenRotation.y == 0) {
            chicken.setAttribute("animation", {
              property: "position",
              to: `${chickenPosition.x} 1.3 ${chickenPosition.z + 2.5}`,
              dur: 800,
              easing: "easeOutQuad",
            });
            chickenPosition.z += 2.5;
          } else if (chickenRotation.y == 90) {
            chicken.setAttribute("animation", {
              property: "position",
              to: `${chickenPosition.x + 2.5} 1.3 ${chickenPosition.z}`,
              dur: 800,
              easing: "easeOutQuad",
            });
            chickenPosition.x += 2.5;
          } else if (chickenRotation.y == 180) {
            chicken.setAttribute("animation", {
              property: "position",
              to: `${chickenPosition.x} 1.3 ${chickenPosition.z - 2.5}`,
              dur: 800,
              easing: "easeOutQuad",
            });
            chickenPosition.z -= 2.5;
          } else if (chickenRotation.y == 270) {
            chicken.setAttribute("animation", {
              property: "position",
              to: `${chickenPosition.x - 2.5} 1.3 ${chickenPosition.z}`,
              dur: 800,
              easing: "easeOutQuad",
            });
            chickenPosition.x -= 2.5;
          }
          chicken.setAttribute("position", chickenPosition);
        }
        stepListUI.removeChild(stepListUI.childNodes[0]);
        if (step.length == 0) {
          clearInterval(interval);
        }
        let temporaryPosition = getCurrentPosition();
        console.log(temporaryPosition);
        if (temporaryPosition == 0 || temporaryPosition == undefined) {
          clearInterval(interval);
          //alert("Game Over 1");
          gameOver();
        }
      }, 1000);
      setTimeout(function () {
        gameOverCheck();
      }, 1000 * step.length);
    }
  }
});

function gameOverCheck() {
  if (play) {
    setTimeout(function () {
      console.log("Game Over Check");
      let currentPosition = getCurrentPosition();
      console.log(currentPosition);
      if (currentPosition == 3) {
        playAudio("successAudio");
        score++;
        console.log(score);
        currentObstacle++;
        if (currentObstacle < obstacleList.length) {
          setTimeout(function () {
            hideInGameUI(false);
            processingButtonUI.classList.add("hidden");
            obstacleGenerator();
          }, 1000);
        } else {
          //alert("Game Over 2");
          gameOver();
        }
      } else {
        //alert("Game Over 3");
        gameOver();
      }
    }, 1000);
  }
}

resetButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    step = [];
    stepListUI.innerHTML = "";
  }
});

undoButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    if (step.length > 0) {
      let currentStep = step.pop();
      if (currentStep == "turnLeft") {
        stepListUI.removeChild(
          stepListUI.childNodes[stepListUI.childNodes.length - 1]
        );
      } else if (currentStep == "turnRight") {
        stepListUI.removeChild(
          stepListUI.childNodes[stepListUI.childNodes.length - 1]
        );
      } else if (currentStep == "moveForward") {
        stepListUI.removeChild(
          stepListUI.childNodes[stepListUI.childNodes.length - 1]
        );
      }
    }
  }
});

turnLeftButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    step.push("turnLeft");
    stepListUI.innerHTML += `<img class="stepIcon" src="images/Turn Arrow.png" />`;
  }
});

turnRightButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    step.push("turnRight");
    stepListUI.innerHTML += `<img class="stepIcon reverse" src="images/Turn Arrow.png" />`;
  }
});

moveForwardButtonUI.addEventListener("click", function () {
  if (play) {
    playAudio("buttonClickAudio");
    step.push("moveForward");
    stepListUI.innerHTML += `<img class="stepIcon" src="images/Forward.png" />`;
  }
});

replayButtonUI.addEventListener("click", function () {
  if (!play) {
    playAudio("buttonClickAudio");
    replayButtonUI.classList.add("hidden");
    hideInGameUI(false);
    play = true;
    step = [];
    stepListUI.innerHTML = "";
    obstacleGenerator();
  }
});

function gameOver() {
  console.log("Game Over");

  if (score == obstacleList.length) {
    playAudio("winAudio");
    scoreUI.classList.remove("hidden");
    scoreUI.innerHTML = "Congratulations! You have completed the game!";
  } else {
    playAudio("loseAudio");
    scoreUI.classList.remove("hidden");
    scoreUI.innerHTML =
      "Aww, you lost! your score is " +
      score +
      ", your high score is " +
      localStorage.getItem("highScore") +
      ", try again!";
  }

  let highScore = localStorage.getItem("highScore");
  if (highScore == null) {
    localStorage.setItem("highScore", score);
  } else {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  }

  play = false;
  startButtonUI.classList.remove("hidden");
  processingButtonUI.classList.add("hidden");
  hideInGameUI(true);
}

function getCurrentPosition() {
  let x = 0;
  let z = 0;

  let chickenPosition = chicken.getAttribute("position");
  switch (chickenPosition.x) {
    case -5:
      x = 0;
      break;
    case -2.5:
      x = 1;
      break;
    case 0:
      x = 2;
      break;
    case 2.5:
      x = 3;
      break;
    case 5:
      x = 4;
      break;
  }

  switch (chickenPosition.z) {
    case -5:
      z = 0;
      break;
    case -2.5:
      z = 1;
      break;
    case 0:
      z = 2;
      break;
    case 2.5:
      z = 3;
      break;
    case 5:
      z = 4;
      break;
  }

  let obst = obstacleList[currentObstacle][z][x];
  return obst;
}

function hideInGameUI(hide) {
  if (hide) {
    turnLeftButtonUI.classList.add("hidden");
    turnRightButtonUI.classList.add("hidden");
    moveForwardButtonUI.classList.add("hidden");
    undoButtonUI.classList.add("hidden");
    resetButtonUI.classList.add("hidden");
    moveButtonUI.classList.add("hidden");
  } else {
    turnLeftButtonUI.classList.remove("hidden");
    turnRightButtonUI.classList.remove("hidden");
    moveForwardButtonUI.classList.remove("hidden");
    undoButtonUI.classList.remove("hidden");
    resetButtonUI.classList.remove("hidden");
    moveButtonUI.classList.remove("hidden");
  }
}

function shuffle(array) {
  console.log("shuffle called");
  array.sort(() => Math.random() - 0.5);
}

function playAudio(audioId) {
  var audio = document.getElementById(audioId);
  audio.play();
}

function pauseAudio(audioId) {
  var audio = document.getElementById(audioId);
  audio.pause();
}

function stopAudio(audioId) {
  var audio = document.getElementById(audioId);
  audio.currentTime = 0;
  audio.pause();
}

function changeVolume(audioId, volume) {
  var audio = document.getElementById(audioId);
  audio.volume = volume;
}
