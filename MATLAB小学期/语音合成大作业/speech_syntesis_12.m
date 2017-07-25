% clear all;
% w=150*2*pi;
% omg=w/8000;
% a1 =1.3789;
% a2 =-0.9506;
% b =  1;
% a = [1 -a1 -a2];
% [z,p,k]=tf2zp(b,a);
% for n=1:2
% if(angle(p(n))>0);
%     p(n)=p(n)*exp(1i*omg);
% elseif(angle(p(n))<0);
%     p(n)=p(n)*exp(-1i*omg);
% else
%     p(3)=p(1)*exp(-li*omg);
%     p(4)=p(2)*exp(-li*omg);
%     p(1)=p(1)*exp(li*omg);
%     p(2)=p(2)*exp(li*omg);
% end
% end
% [b,a]=zp2tf(z,p,k);
% a=[-a(2),-a(3)];
omg=2;
p=[2+1i,2-1i,1,2];
      p_length=length(p);
      for con=1:p_length
        if(angle(p(con))>0);
            p(con)=p(con)*exp(1i*omg);
        elseif(angle(p(con))<0);
            p(con)=p(con)*exp(-1i*omg);
        else
            p
            p(length(p)+1)=p(con)*exp(-1i*omg);
            p(con)=p(con)*exp(1i*omg);
            p
        end
      end

