/**
 * Color 공통 컬러
 */
const colorBackground = "#0099FF";

/**
 * Common 공통 숫자
 */
const commonInt1 = 1;
const commonInt2 = 2;
const commonInt3 = 3;
const commonInt4 = 4;
const commonInt5 = 5;


/**
 * Canvas
 */
const canvasWidth = 800;
const canvasHeight = 400;

// canvas
const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// size
canvas.width = canvasWidth; // window.innerWidth - 100;
canvas.height = canvasHeight; //window.innerHeight - 100;

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
 * Effect
 */
let cannonEffect = {
    width : 10,
    height : 20,
    boom : true,
    draw() {
        if (this.boom) {
            // x, y, width, height
            context.fillStyle = "yellow";
            context.fillRect(here.x - 10, here.y + 5, 10, 20);
            context.fillStyle = "red";
            context.fillRect(here.x - 15, here.y + 5, 10, 20);

            context.fillStyle = "yellow";
            context.fillRect(here.x -20, here.y + 5, 10, 20);
            context.fillStyle = "red";
            context.fillRect(here.x - 30, here.y + 5, 10, 20);

            context.fillStyle = "yellow";
            context.fillRect(here.x + 50, here.y + 10, 10, 10);
        }
        this.boom = false;
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
    cannonEffect.draw();
}

/**
 * Key event
 */
document.addEventListener("keypress", function(e) {
    console.log("key code : "+e.code);
    
    if (!play) {

    } else {
        if ( e.code == 'Space' ) {
            e.preventDefault(); // scroll
            let cannonball = new Cannonball(here.x, here.y+15);
            cannonballs.push(cannonball);
            cannonEffect.boom = true;
        } else if ( e.code == "KeyW" ) {
            if(here.y > 0) here.y -= commonInt5;
        } else if ( e.code == "KeyS" ) {
            if (here.y < canvasHeight - here.height) here.y += commonInt5;
        } else if ( e.code == "KeyA" ) {
            if(here.x > 0) here.x -= commonInt5;
        } else if ( e.code == "KeyD" ) {
            if(here.x < canvasWidth - here.width) here.x += commonInt5;
        }
    }

}); 

document.addEventListener("keyup", function(e) {
    if (!play) return;
    console.log("key code : "+e.code);

    let distance = commonInt3;

    if ( e.code == "KeyW" ) {
        if(here.y > 0) here.y -= distance;
    } else if ( e.code == "KeyS" ) {
        if (here.y < canvasHeight - here.height) here.y += distance;
    } else if ( e.code == "KeyA" ) {
        if(here.x > 0) here.x -= distance;
    } else if ( e.code == "KeyD" ) {
        if(here.x < canvasWidth - here.width) here.x += distance;
    }

})
document.addEventListener("keydown", function(e) {
    if (!play) return;
    console.log("key code : "+e.code);

    let distance = commonInt3;

    if ( e.code == "KeyW" ) {
        if(here.y > 0) here.y -= distance;
    } else if ( e.code == "KeyS" ) {
        if (here.y < canvasHeight - here.height) here.y += distance;
    } else if ( e.code == "KeyA" ) {
        if(here.x > 0) here.x -= distance;
    } else if ( e.code == "KeyD" ) {
        if(here.x < canvasWidth - here.width) here.x += distance;
    }
})
