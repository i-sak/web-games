const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = "cactus.png";
var img2 = new Image();
img2.src = "dromedary.png";

let dino = {
    x : 10,
    y : 200,    // 등장 좌표 
    width : 50,
    height : 50,    // size
    draw() {
        ctx.fillStyle = 'green';
        ctx.drawImage(img2, this.x, this.y, 50, 50);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// 그리기 완성
dino.draw()



// javascript class
class Cactus {
    constructor () {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.drawImage(img1, this.x, this.y, 50, 50);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let cactus = new Cactus();
cactus.draw();

// 애니메이션을 만드려면 1초에 60번 x++ 해줘야 한다.

let timer = 0;
let cactuses = [];
var 점프타이머 = 0;
var 점프중 = false;
var animaion;
function frameAnimation() {
    animaion = requestAnimationFrame(frameAnimation)
    timer++;

    //clear
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // dino.x++;
    
    // 120 frame에 한 번 씩 생성
    if (timer % 200 === 0) {
        let cactus = new Cactus();
        cactuses.push(cactus);
    }

    cactuses.forEach((a, i, o)=>{
        // x좌표가 0미만이면 제거
        if (a.x < 0) {
            // 제거해라
            o.splice(i, 1);
        }

        a.x -= 2;

        // 실시간 충돌을 검사해야 한다.
        출돌하냐(dino, a);

        a.draw();
    })
    
    if (점프중 == true) {
        dino.y-= 1.3;
        점프타이머++;
    }
    if(점프타이머 > 100) {
        점프중 = false;
        점프타이머 = 0;
    }
    if (점프중 == false) {
        if (dino.y < 200) {
            dino.y+= 1.3;
        }
    }

    dino.draw();
}
frameAnimation();

// 충돌 체크하기
function 출돌하냐(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if(x축차이 < 0 && y축차이< 0) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animaion)
    }
}


document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        점프중 = true;
    }
})
