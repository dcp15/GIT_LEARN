x=zeros(8000,1);
y=1;
while y<8000
  PT=80+5*mod(floor(y/80),50);
  x(y)=1;
  y=y+PT; 
end
plot(x(1:1000));
title('µÚ°ËÌâÍ¼')
sound(x);