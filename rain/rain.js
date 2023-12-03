const canvas = document.getElementById('Rain');
const ctx = canvas.getContext('2d');

let Rect= false;
let player;
let gameSpeed;
let obstacles = [];
let straight_obstacles=[];
let score;
let scoreText;
let highscore;
let keys={};
let hpText;
let rain = true;
let count =0;
let bouncy = false;

document.addEventListener('keypress', function(evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function(evt){
    keys[evt.code] = false;
});




//Player Class 생성
class Player{
    constructor(x, y, w, h, c, hp){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.hp = hp;

        
    }

    Draw(){
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();

    }

    MoveAnimation(){
        if (keys['KeyA'])
        {
            this.x-=5;
        }
        if (keys['KeyD'])
        {
            this.x+=5;
        }
        

        this.Draw();

    }

}

class Text{
    constructor(t, x, y, a, c, s)
    {
        this.t = t;
        this.x = x;
        this.y = y;
        this.a = a;
        this.c = c;
        this.s = s;
    }
    Draw()
    {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s +"px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}


class Obstacle{
    constructor(x, y, w, h, c, v){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.v = v;

        this.dy=gameSpeed;

    }

    Update(){
        if(this.v == "ba")
        {
            this.y += this.dy;
             this.Draw();
             this.dy = gameSpeed;
        }
        if(this.v == "s"&&Rect==true)
        {
            this.h += this.dy*4;
            this.Draw();
            this.dy = gameSpeed;
            Rect=false;
        }
        else if(this.v=="s" && Rect==false){
            this.Draw();
        }
    }

    Draw(){
        
        
        if(this.v == "s"&&Rect==true)
        {
            ctx.beginPath();
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        }
        else if(this.v=="s" && Rect==false){
            ctx.beginPath();
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.closePath();
            setTimeout(()=> {

                Rect=true;
            this.Update();}, 500);
        }
        else if(this.v != "s"){
            ctx.beginPath();
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        }

    }

    
}

function spawObstacle(){
    let x = Randomint(0, canvas.width-20);
    let basic_ob = new Obstacle(x, -40, 20, 40, 'blue', "ba");
    let straight_ob = new Obstacle(x, 0, 70, 10, "red", "s");
    let bouncy_ob = new Obstacle(x, -40, 20, 40, 'blue', "b");
    if(rain==true&&bouncy==true)
    {

    }
    else if(rain==true)
    {
        obstacles.push(basic_ob);
    }
    else if(rain==false){
        straight_obstacles.push(straight_ob);
    }

}

function Randomint(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

let initialSpawnTimer = 70;
let SpawnTimer = initialSpawnTimer;


function Start() {
    gameSpeed = 10;
    ctx.font = "30px sans-serif";

    score = 30;
    highscore = 0;

    player = new Player(canvas.width/2-20, canvas.height-90, 40, 65, 'black', 3);
    scoreText = new Text("Score: " + score, 25, 30, "left", "black", "30");
    hpText = new Text("hp: "+ player.hp, 25, 60, 'left', 'black', "30");
    
    requestAnimationFrame(Update);
}

function Update(){
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreText.Draw();
    hpText.Draw();
    player.MoveAnimation();

    if(player.x + player.w >= canvas.width)
    {
        player.x=canvas.width-player.w;
    }
    if(player.x <= 0)
    {
        player.x = 0;
    }

    if(rain==true)
    {
        SpawnTimer--;
        if(SpawnTimer <= 0)
        {
            spawObstacle();

            SpawnTimer = initialSpawnTimer- gameSpeed*2;
            


        }
    }
    else{
        if(count<=10)
        {
            SpawnTimer--;
            if(SpawnTimer <= 0)
            {
                spawObstacle();
                count++;
                SpawnTimer = initialSpawnTimer- gameSpeed*0.5;


            }
        }
        else
        {
            rain=true;
            gameSpeed = 21.5;
        }
    }
    for(let i = 0; i<obstacles.length; i++)
    {
       let o = obstacles[i];
        o.Update();

        

        if(o.y + o.h > canvas.height-40)
        {
            obstacles.splice(i,1);
            i--;
            score++;
            
        }

        if(player.x< o.x+o.w&&
            player.x+player.w>o.x&&
            player.y<o.y+o.h&&
            player.y+player.h>o.y)
        {
            obstacles.splice(i,1);
            i--;
            player.hp--;


        }
        
        
       
    }

    for(let i = 0; i<straight_obstacles.length; i++)
    {
       let o = straight_obstacles[i];
        o.Update();

        

        if(o.y + o.h > canvas.height-40)
        {
            straight_obstacles.splice(i,1);
            i--;
            score++;
            
        }

        if(player.x< o.x+o.w&&
            player.x+player.w>o.x&&
            player.y<o.y+o.h&&
            player.y+player.h>o.y)
        {
            straight_obstacles.splice(i,1);
            i--;
            player.hp--;


        }
        
        
       
    }

    if(score==29||score==30)
    {
        rain=false;
    }

    if(score>=80)
    {
        bouncy=true;
    }
    

    hpText.t = "hp: " + player.hp;
    scoreText.t = "Score: " + score;
    scoreText.Draw();
    hpText.Draw();
    

}
Start();