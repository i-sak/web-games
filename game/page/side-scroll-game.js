// canvas
const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// size
canvas.width = 1200; // window.innerWidth - 100;
canvas.height = 500; //window.innerHeight - 100;

// style
context.fillStyle = "#113355";
context.fillRect(0,0,canvas.width, canvas.height);

