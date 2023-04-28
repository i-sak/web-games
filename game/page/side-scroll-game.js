/**
 * Canvas
 */

// canvas
const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// size
canvas.width = 800; // window.innerWidth - 100;
canvas.height = 400; //window.innerHeight - 100;

// style
context.fillStyle = "#0099FF";
context.fillRect(0,0,canvas.width, canvas.height);

/**
 * Character
 */
let image1 = new Image();
image1.src = "hero-bazooka.png";


// button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    console.log("게임 시작!");

    togglePlayStatus();
    startGame();

});

/**
 * Status
 */
let play = false;

const togglePlayStatus = () => {
    play = !play;
    console.log("play : " + play)
}

/**
 * Start game
 */
const startGame = () => {
    if (play) {
        drawImage1();
    }
}

/**
 * Draw
 */
const drawImage1 = () => {
    context.drawImage(image1, 10, 175, 50, 50);
}

