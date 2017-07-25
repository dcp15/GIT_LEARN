function goalposition(x){
    return -boxsize/2+smboxsize*(x+0.5);
}
function goal(x,y){
    this.x=goalposition(x);
    this.y=goalposition(y);
    this.angle=Math.random()*2*Math.PI;
}
goal.prototype.draw=function(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle='#ff2d2d';
    ctx.fillRect(-goalr,-goalr,2*goalr,2*goalr);
    ctx.restore();
}

goal.prototype.flush=function(){
    var goalrospeed=0.5*Math.PI;
    this.angle+=goalrospeed;
}
