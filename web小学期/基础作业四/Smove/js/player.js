function playerposition(x){
    return -boxsize/2+smboxsize*(x+0.5);
}
function player(x_n,y_n){
    this.x_n=x_n;
    this.y_n=y_n;
    this.x=playerposition(x_n);
    this.y=playerposition(y_n);  
}
player.prototype.draw=function(){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.fillStyle='gold';
    ctx.arc(0,0,goalr,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
player.prototype.flushself=function(){
    this.x=playerposition(this.x_n);
    this.y=playerposition(this.y_n);
}
player.prototype.flushpos=function (key){
    switch(key){
        case 'up':
          if(this.y_n!==0) this.y_n-=1;
          break;
        case  'down':
          if(this.y_n!==n-1) this.y_n+=1;
          break;
        case  'left':
          if(this.x_n!==0) this.x_n-=1;
          break;
        case  'right':
          if(this.x_n!==n-1) this.x_n+=1;
          break;
        default:break;
    }
}

window.onkeydown=(event)=>{
    if(Gamestate===gamestate.on){
         switch(event.keyCode){
            case 87:
            case 38:
              Player.flushpos('up');
              break;
            case 83:
            case 40:
              Player.flushpos('down');
              break;
            case 65:
            case 37:
              Player.flushpos('left');
              break;
            case 68:
            case 39:
              Player.flushpos('right');
              break;
        }
    }
}
        
