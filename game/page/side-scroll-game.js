/**
 * Color 공통 컬러
 */
const colorBackground = "#16702B";

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
 * image
 */
let heroImage = new Image();
heroImage.src = "hero-bazooka.png";
let enemyImage = new Image();
enemyImage.src = "enemy.png";

/**
 * Variable
 */
let play = false; // Status

let cannonballs = [];
let enemys = [];
let timer = 0;

/**
 * Character
 */
let hero = {
    x : 10,
    y : 175,
    width : 50,
    height : 50,
    power : 2,
    draw() {
        drawImage1();
    }
}


// button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    console.log("게임 시작!");

    togglePlayStatus();
    startGame();
    frameAnimation(); // loop fps
});


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
    context.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
}

/**
 * Cannonball
 */
class Cannonball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
    }
    draw() {
        context.beginPath();
        context.arc(this.x + 50, this.y, this.radius, 0, Math.PI * 2);
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
            context.fillRect(hero.x - 10, hero.y + 7, 10, 10);
            context.fillStyle = "red";
            context.fillRect(hero.x - 15, hero.y + 7, 10, 10);

            context.fillStyle = "yellow";
            context.fillRect(hero.x -20, hero.y + 7, 10, 10);
            context.fillStyle = "red";
            context.fillRect(hero.x - 30, hero.y + 7, 10, 10);

            context.fillStyle = "yellow";
            context.fillRect(hero.x + 50, hero.y + 10, 10, 10);
        }
        this.boom = false;
    }
}

/**
 * Enemy
 */
class Enemy {
    constructor () {
        this.x = canvasWidth - 50;
        this.y = canvasHeight - Math.floor( ( (Math.random() * (canvasHeight - 50) ) + 50))
        this.width = 50;
        this.height = 50;
        this.damage = 0;    // 50; die 조건
    }
    draw() {
        if (!play) return;

        context.drawImage(enemyImage, this.x, this.y, this.width, this.height);
        
        // hp bar
        context.fillStyle = "red";
        context.fillRect(this.x, this.y - 10, this.width - this.damage, this.height - 40);
    }
}

// Check Collision
// 총알이 나가는 중에 충돌 체크
function checkCollision(object, objects) {
    let collision = false;
    objects.forEach(function(arrayObject, index) {
        if 
        (
            (object.x + (object.radius * 2) > arrayObject.x - (arrayObject.width / 2))
            &&
            (object.x + (object.radius * 2) < arrayObject.x + (arrayObject.width / 2 ) - 10)
            &&
            ((object.y > arrayObject.y ) && (object.y < arrayObject.y + arrayObject.height)) 
        )
        {
            context.fillStyle = "blue";
            context.fillRect(object.x + (object.radius * 2) + 5, object.y - 5, 20, 10);
            // alert(object.y + "  " + arrayObject.y)
            enemys[index].damage += hero.power;

            if (enemys[index].damage >= 50) {   // 누적 데미지 
                enemys.splice(index, 1);
            }

            collision = true;
        }

    })
    return collision;
}



/****************************************************************************************************
 * FPS Animation (loop)
 */
function frameAnimation() {
    animation = requestAnimationFrame(frameAnimation);
    // console.log(animation);
    timer ++;

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = colorBackground;
    context.fillRect(0,0,canvas.width, canvas.height);

    if (timer % 200 === 1) {
        let createdEnemy = new Enemy();
        enemys.push(createdEnemy);
    }
    
    enemys.forEach((object, index, array) => {

        if (object.x < 0) {
            array.splice(index, 1);
        }
        object.x -= 1;
        object.draw();
    })

    // 내가 쏘는 대포알
    cannonballs.forEach((object, index, array) => {
        if (object.x > 800) {
            array.splice(index, 1);
        }
        object.x += 10;
        
        // 실시간 충돌 감지 : 총알과 적의 충돌 감지
        let collision = checkCollision(object, enemys);

        object.draw();

        if (collision) {
            array.splice(index, 1);

        }


    })
    
    hero.draw();
    cannonEffect.draw();
}
// ****************************************************************************************************


/**
 * Key event
 */
document.addEventListener("keypress", function(e) {
    console.log("key code : "+e.code);
    
    if (!play) {

    } else {
        if ( e.code == 'Space' ) {
            e.preventDefault(); // scroll
            let cannonball = new Cannonball(hero.x, hero.y+15);
            cannonballs.push(cannonball);
            cannonEffect.boom = true;
        } else if ( e.code == "KeyW" ) {
            if(hero.y > 0) hero.y -= commonInt5;
        } else if ( e.code == "KeyS" ) {
            if (hero.y < canvasHeight - hero.height) hero.y += commonInt5;
        } else if ( e.code == "KeyA" ) {
            if(hero.x > 0) hero.x -= commonInt5;
        } else if ( e.code == "KeyD" ) {
            if(hero.x < canvasWidth - hero.width) hero.x += commonInt5;
        }
    }

}); 

document.addEventListener("keyup", function(e) {
    if (!play) return;
    console.log("key code : "+e.code);

    let distance = commonInt3;

    if ( e.code == "KeyW" ) {
        if(hero.y > 0) hero.y -= distance;
    } else if ( e.code == "KeyS" ) {
        if (hero.y < canvasHeight - hero.height) hero.y += distance;
    } else if ( e.code == "KeyA" ) {
        if(hero.x > 0) hero.x -= distance;
    } else if ( e.code == "KeyD" ) {
        if(hero.x < canvasWidth - hero.width) hero.x += distance;
    }

})
document.addEventListener("keydown", function(e) {
    if (!play) return;
    console.log("key code : "+e.code);

    let distance = commonInt3;

    if ( e.code == "KeyW" ) {
        if(hero.y > 0) hero.y -= distance;
    } else if ( e.code == "KeyS" ) {
        if (hero.y < canvasHeight - hero.height) hero.y += distance;
    } else if ( e.code == "KeyA" ) {
        if(hero.x > 0) hero.x -= distance;
    } else if ( e.code == "KeyD" ) {
        if(hero.x < canvasWidth - hero.width) hero.x += distance;
    }
})
