function enemy(x,y,v_x,v_y){
var v=Math.sqrt(v_x*v_x+v_y*v_y);
this.x=x;
this.y=y;
var per=enemyspeed/v;
v_x=v?v_x*per:0;
v_y=v?v_y*per:0;
this.v_x=v_x;
this.v_y=v_y;
this.angle=Math.atan2(v_y,v_x);
}

enemy.prototype.draw=function(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.lineWidth=goalr/20;
    ctx.strokeStyle='black';
    ctx.beginPath();
    ctx.fillStyle='#4f4f4f';
    ctx.arc(0,0,goalr,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

const falsetime=1;
enemy.prototype.flush=function(){
    if(Gamestate===gamestate.on){
        this.x+=this.v_x*falsetime;
        this.y+=this.v_y*falsetime;
    }
}

var enemylist=[];
function cleanenemy(){
    enemylist.forEach((e,index)=>{
        if(e.x>width/2||e.x<-width/2||e.y>height/2||e.y<-height/2)
            enemylist.splice(index,1); 
    })
}

function addenemy(){
    var x,y;
    if(Math.random()<0.5){
        x=Math.random()<0.5?-width/2:width/2;
        y=(Math.random()-0.5)*height;
    }
    else{
        x=(Math.random()-0.5)*width;
        y=(Math.random<0.5)?-height/2:height/2;
    }
    var v_x ,v_y;
    v_x=(Math.random()-0.5)*boxsize-x;
    v_y=(Math.random()-0.5)*boxsize-y;
    let newenemy=new enemy(x,y,v_x,v_y);
    enemylist.push(newenemy);
}
var enemynum=10;

function deterenemy(){
    cleanenemy();
    if(enemylist.length<enemynum)
        addenemy();
}