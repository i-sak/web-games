/**
 * Color
 */
colorBackground = "#0099FF";


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
context.fillStyle = colorBackground;
context.fillRect(0,0,canvas.width, canvas.height);

/**
 * Character
 */
let heroImage = new Image();
heroImage.src = "hero-bazooka.png";
let here = {
    x : 10,
    y : 175,
    width : 50,
    height : 50,
    draw() {
        drawImage1();
    }
}

let cannonballs = [];

// button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    console.log("게임 시작!");

    togglePlayStatus();
    startGame();
    frameAnimation(); // loop fps
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
    context.drawImage(heroImage, here.x, here.y, here.width, here.height);
}

/**
 * Cannonball
 */
class Cannonball {
    constructor(x, y) {
        this.x = x;
        this.y = y;    
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.fillStyle = "#ff0000";
        context.fill();
        context.stroke();
    }
}


/**
 * FPS Animation (loop)
 */
function frameAnimation() {
    animation = requestAnimationFrame(frameAnimation);
    // console.log(animation);
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = colorBackground;
    context.fillRect(0,0,canvas.width, canvas.height);


    cannonballs.forEach((object, index, array) => {
        if (object.x > 800) {
            array.splice(index, 1);
        }
        object.x += 5;

        object.draw();
    })
    // console.log(cannonballs.length)

    here.draw();

}


/**
 * Key event
 */
document.addEventListener("keypress", function(e) {
    
    if (!play) return;

    if ( e.code == 'Space' ) {
        e.preventDefault(); // scroll
        let cannonball = new Cannonball(here.x, here.y+15);
        cannonball.draw();
        cannonballs.push(cannonball);
    }

}); 