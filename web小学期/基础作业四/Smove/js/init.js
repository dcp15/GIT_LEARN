var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
var width=window.innerWidth;
var height=window.innerHeight;
function drawbackground(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    var grd=ctx.createLinearGradient(0,0,0,window.innerHeight);
    
    
    grd.addColorStop(0,'#ECFFFF');
    grd.addColorStop(0.3,'#02C874');
    grd.addColorStop(0.75,'#02C874');
    grd.addColorStop(1,'#ECFFFF');
    
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);    
}

var n_max=7;
var n_min=2;
var n=7;
var smboxsize=70;
var boxsize=smboxsize*n;
var goalr=0.25*smboxsize;
function drawbox(){
    var r=0.5*smboxsize;
    ctx.translate(window.innerWidth/2,window.innerHeight/2);
    ctx.strokeStyle='white';
    ctx.lineWidth = boxsize/60;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-boxsize/2+r,-boxsize/2);
    for(var i=0;i<4;i++){
        ctx.arcTo(boxsize/2,-boxsize/2,boxsize/2,-boxsize/2+r,r);
        ctx.rotate(Math.PI/2);
    }
    ctx.closePath();
    ctx.stroke();
    for(var i=1;i<n;i++){
        ctx.beginPath();
        ctx.moveTo(-boxsize/2,-boxsize/2+i*smboxsize);
        ctx.lineTo(boxsize/2,-boxsize/2+i*smboxsize);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-boxsize/2+i*smboxsize,-boxsize/2);
        ctx.lineTo(-boxsize/2+i*smboxsize,boxsize/2);
        ctx.closePath();
        ctx.stroke();
    }
}


const playerspeed=0.2;
var enemyspeed=playerspeed*5;



