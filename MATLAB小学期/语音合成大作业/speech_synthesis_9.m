speech_synthesis_8();
a1 =1.3789;
a2 =-0.9506;
b =  1;
a = [1 -a1 -a2];
s=filter(b,a,x);
pause(2);
sound(s);
subplot(2,1,2)
plot(s(1:1000))
title('����1�����˲�����Ĳ���');
subplot(2,1,1)
plot(x(1:1000))
title('�ڣ�8�����еĲ���');