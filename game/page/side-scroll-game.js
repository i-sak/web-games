// canvas
const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// size
canvas.width = 800; // window.innerWidth - 100;
canvas.height = 400; //window.innerHeight - 100;

// style
context.fillStyle = "#0099FF";
context.fillRect(0,0,canvas.width, canvas.height);


// button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    console.log("게임 시작!");
    // TODO: 게임 시작 로직 추가
});