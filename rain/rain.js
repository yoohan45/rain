const canvas = document.getElementById('Rain');
const ctx = canvas.getContext('2d');

let player;
let keys={};

document.addEventListener('keypress', function(evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function(evt){
    keys[evt.code] = false;
});




//Player Class 생성
class Player{
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dx = 0;
    }

    Draw(){
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();

    }

    MoveAnimation(){

    }

}



function Start() {
    

    player = new Player(canvas.width/2-20, canvas.height-90, 40, 65, 'black');
    requestAnimationFrame(Update);
}

function Update(){
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.Draw();
    
}
Start();