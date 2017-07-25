var Best=document.querySelector('#Best');
var score=document.querySelector('#score');
var tryagain=document.querySelector('#again');
var start=document.querySelector('#start');
var harder=document.querySelector('#harder');
start.onclick=play;
tryagain.onclick=play;
var easier=document.querySelector('#easier');
var Goalwaittime=1000;
var Goal;
var Goalid;
var Player;
var flushid;
var deterenemyid;
var flushinterval=10;
var deterenemyinterval=flushinterval*10;
function beginpara(){
    n_max=7;
    n_min=2;
    n=7;
    smboxsize=70;
    boxsize=smboxsize*n;
    goalr=0.25*smboxsize;
    enemynum=10;
    flushinterval=10;
    deterenemyinterval=flushinterval*10;
    Goalwaittime=1000;
    enemyspeed=playerspeed*5;
}

function play(){
   if(n===n_max)
     beginpara();
   start.style.visibility='hidden';
   score.textContent=0; 
   var Bestgrade=localStorage.getItem('Best');
   if(Bestgrade){
       Best.textContent='Best: '+Bestgrade;
   } 
   else Best.textContent='Best:'+' 0';
   Gamestate=gamestate.on;
   enemylist=[];
   Player=new player(0,0);
   Goal=undefined;
   if(Goalid)
      window.clearTimeout(Goalid);
   Goalid=undefined;
   tryagain.style.visibility='hidden';
   goon();
}

function eat(p,g){
    var deltx=p.x-g.x;
    var delty=p.y-g.y;
    return Math.sqrt(deltx*deltx+delty*delty)<2*goalr;
}

function flush(){
    Player.flushself();
    if(Goal){
        Goalid=undefined;
        Goal.flush();
        if(eat(Player,Goal)){
        score.textContent=Number(score.textContent)+n_max-n+1;
        Goal=undefined;
        }
    }
    enemylist.forEach((element)=>{
        element.flush();
        if(eat(element,Player))
            gameover();
    })
    if(!Goal&&!Goalid){
        Goalid=window.setTimeout(()=>{
            do{
                var x=Math.floor(Math.random()*n);
                var y=Math.floor(Math.random()*n);
            }while (x===Player.x_n&&y===Player.y_n);
            Goal=new goal(x,y);
        },Goalwaittime);
    }
}

const gamestate={
    end :0,
    on: 1,
};
var Gamestate;

function gameover(){
    Gamestate=gamestate.end;
    tryagain.style.visibility='visible';
    var Bestgrade=localStorage.getItem('Best');
    if(Bestgrade<Number(score.textContent))
        localStorage.setItem('Best',Number(score.textContent));
}

function goon(){
    if(!flushid)
        flushid=window.setInterval(flush,flushinterval);
    if(!deterenemyid)
        deterenemyid=window.setInterval(deterenemy,deterenemyinterval);
}

function continuedraw() {
    drawbackground();
    ctx.save();
    drawbox();
    enemylist.forEach((enemy) => {
        enemy.draw();
    })
    if(Goal)
        Goal.draw();
    if(Player)
        Player.draw();
    ctx.restore();
    requestAnimationFrame(continuedraw);
}
continuedraw();
harder.onclick=()=>{
    if(n>n_min){
        easier.style.visibility='visible';
        n-=1;
        boxsize=smboxsize*n;
        enemynum*=0.9;
        enemyspeed*=1.1;
        deterenemyinterval*=1.2;
        play();
    }
    else if(n==n_min){
        harder.style.visibility='hidden';
    }
}
easier.onclick=()=>{
    if(n<n_max){
        harder.style.visibility='visible';
        n+=1;
        boxsize=smboxsize*n;
        enemynum/=0.9;
        enemyspeed/=1.1;
        deterenemyinterval/=1.2;
        play();
    }
    else if(n==n_max){
        easier.style.visibility='hidden';
    }
}
