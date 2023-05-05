/**
 * canvas
 */
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// size
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// style
ctx.fillStyle = '#12bbFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 캐릭터 js object
let image1 = new Image();
image1.src = "leonardo.png";
let image2 = new Image();
image2.src = "villain.png";

let character = {
    x : 10,         // x 좌표
    y : 200,        // y 좌표
    width : 50,     // 캐릭터 너비
    height : 50,    // 캐릭터 높이
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //drawOnImage(image1, this.x, this.y, this.width, this.height);
        ctx.drawImage(image1, this.x, this.y, this.width, this.height);
    }
}
character.draw();

// image load 후 draw
function drawOnImage(image,x,y,w,h) {
    image.onload = function() {
        ctx.drawImage(image, x, y, w, h);
    }
}

// villain
class Villain {
    constructor () {
        this.x = canvas.width - 100;//600;
        this.y = Math.floor((Math.random() * 1000)) + 1; // 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        if ( this.y <= 100 ) this.y += 200;
        else if (this.y >= canvas.height -100 ) this.y -= 500;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // drawOnImage(image2,this.x, this.y, this.width, this.height);
        ctx.drawImage(image2,this.x, this.y, this.width, this.height);
    }
}
//let villain = new Villain();
//villain.draw();

/**
 * FPS animation
 */
let timer = 0;
let villains = [];
let animation;
let up, down, left, right;
function frameAnimation() {
    animation = requestAnimationFrame(frameAnimation)
    timer ++;

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#12bbFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (timer % 30 === 0) {
        let villainNew = new Villain();
        villains.push(villainNew);
    }
    villains.forEach((object, index, array) => {
        
        if (object.x < 0) {
            array.splice(index, 1);
        }
        object.x -= 2;
        
        // 실시간 충돌 감지
        checkCollision(character, object);

        object.draw();
    })

    if (up) {
        up = false;
        character.y -= 20;
    } 
    if (down) {
        down = false;
        character.y += 20;
    }
    if(left) {
        left = false;
        character.x -= 20;
    }
    if (right) {
        right = false;
        character.x += 20;
    }

    character.draw();
    //if(timer == 70) cancelAnimationFrame(animation);
}
frameAnimation();

/**
 * key event
 */
document.addEventListener('keydown', function(e) {
    if (e.code == 'ArrowUp') {
        up = true;
    } else if ( e.code == 'ArrowDown' ) {
        down = true;
    } else if (e.code == 'ArrowLeft' ) {
        left = true;
    } else if (e.code == 'ArrowRight') {
        right = true;
    }
})

/**
 * Check Collision
 */
function checkCollision(character, villain) {

    let collsion = false;
    if (
           (
               (villain.x <= character.x && character.x <= villain.x + 50 )
               ||
               (villain.x <= character.x + 50 && character.x + 50 <= villain.x + 50 )
           )
       &&
           (
               (villain.y <= character.y && character.y <= villain.y + 50 )
               ||
               (villain.y <= character.y + 50 && character.y + 50 <= villain.y + 50 )
           )
    )
    {
       collsion = true;
    }

    if ( collsion ) {
        ctx.fillStyle = "blue";
        ctx.fillRect(villain.x-50, villain.y-50, villain.width+100, villain.height+100)
        ctx.fillStyle = "yellow";
        ctx.fillRect(character.x-50, character.y-50, character.width+100, character.height+100)
        cancelAnimationFrame(animation);
    }
}