
a1 =1.3789;
a2 =-0.9506;
b =  1;
a = [1 -a1 -a2];
figure 
subplot(2,2,1)
zplane(b,a);
title('�㼫��ͼ');
[h,w]=freqz(b,a,2000);
subplot(2,2,2)
plot(w/pi,abs(h));
xlabel('w/\pi');
title('Ƶ����Ӧ');
subplot(2,2,3)
impz(b,a,100);
title('��λ��ֵ��Ӧ');
subplot(2,2,4);
n=zeros(1,199)';
n=[1;n];
x=linspace(0,199,200)';
y=filter(b,a,n);
hold on
plot(x,y);
title('filter���Ƶĵ�λ��ֵ��Ӧ');
tra=tf(b,a);
[z,p,k]=tf2zp(b,a);