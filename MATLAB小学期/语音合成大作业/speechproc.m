function speechproc()

    % ���峣��
    FL = 80;                % ֡��
    WL = 240;               % ����
    P = 10;                 % Ԥ��ϵ������
    s = readspeech('voice.pcm',100000);             % ��������s
    L = length(s);          % ������������
    FN = floor(L/FL)-2;     % ����֡��
    % Ԥ����ؽ��˲���
    exc = zeros(L,1);       % �����źţ�Ԥ����
    zi_pre = zeros(P,1);    % Ԥ���˲�����״̬
    s_rec = zeros(L,1);     % �ؽ�����
    zi_rec = zeros(P,1);
    % �ϳ��˲���
    exc_syn = zeros(L,1);   % �ϳɵļ����źţ����崮��
    s_syn = zeros(L,1);     % �ϳ�����
    % ����������˲���
    exc_syn_t = zeros(L,1);   % �ϳɵļ����źţ����崮��
    s_syn_t = zeros(L,1);     % �ϳ�����
    % ���ٲ�����˲����������ٶȼ���һ����
    exc_syn_v = zeros(2*L,1);   % �ϳɵļ����źţ����崮��
    s_syn_v = zeros(2*L,1);     % �ϳ�����

    hw = hamming(WL);       % ������
    
    % ���δ���ÿ֡����
    for n = 3:FN

        % ����Ԥ��ϵ��������Ҫ���գ�
        s_w = s(n*FL-WL+1:n*FL).*hw;    %��������Ȩ�������
        [A E] = lpc(s_w, P);            %������Ԥ�ⷨ����P��Ԥ��ϵ��
                                        % A��Ԥ��ϵ����E�ᱻ��������ϳɼ���������

        if n == 27
        % (3) �ڴ�λ��д���򣬹۲�Ԥ��ϵͳ���㼫��ͼ
        %(3)
        zplane(1,A);
        title('Ԥ��ϵͳ���㼫��ͼ');
        %(3)
        end
        
        s_f = s((n-1)*FL+1:n*FL);       % ��֡�����������Ҫ����������
        %(4)
        if n==3
            zi=zi_pre;
        end
        [e_n,zf]=filter(A,1,s_f,zi);
        zi=zf;
        % (4) �ڴ�λ��д������filter����s_f���㼤����ע�Ᵽ���˲���״̬
        exc((n-1)*FL+1:n*FL)=e_n;%�������õ��ļ���д������ 
        %(5)
        if n==3
            zi_1=zi_rec;
        end
        [s_n,zf_1]=filter(1,A,e_n,zi_1);
        zi_1=zf_1;
        % (5) �ڴ�λ��д������filter������exc�ؽ�������ע�Ᵽ���˲���״̬
        s_rec((n-1)*FL+1:n*FL) = s_n; %�������õ����ؽ�����д������
        
        % ע������ֻ���ڵõ�exc��Ż������ȷ
        s_Pitch = exc(n*FL-222:n*FL);
        PT = findpitch(s_Pitch);    % �����������PT����Ҫ�����գ�
        G = sqrt(E*PT);           % ����ϳɼ���������G����Ҫ�����գ�

       %(10)
      if n==3
           y=161;
           zi_2=zi_rec;
      end
      exc_n=zeros(FL,1);
      while(y<n*FL)
            exc_n(mod(y,FL)+1)=1;
            y=y+PT;
      end
      [s_syn_n,zf_2]=filter(1,A,exc_n,zi_2);
      zi_2=zf_2;
        % (10) �ڴ�λ��д�������ɺϳɼ��������ü�����filter���������ϳ�����  
        exc_syn((n-1)*FL+1:n*FL) =exc_n;%�������õ��ĺϳɼ���д������
        s_syn((n-1)*FL+1:n*FL) = s_syn_n;%�������õ��ĺϳ�����д������
      %(11)
      FL_v=2*FL;
      if n==3
         y1=321;
         zi_3=zi_rec;
      end
      exc_n_v=zeros(FL_v,1);
      while(y1<n*FL_v)
            exc_n_v(mod(y1,FL_v)+1)=1;
            y1=y1+PT;
      end
      [s_syn_n_v,zf_3]=filter(1,A,exc_n_v,zi_3);
      zi_3=zf_3;  
      
      % (11) ���ı�������ں�Ԥ��ϵ�������ϳɼ����ĳ�������һ��������Ϊfilter
        % ������õ��µĺϳ���������һ���ǲ����ٶȱ����ˣ�������û�б䡣
        exc_syn_v((n-1)*FL_v+1:n*FL_v) = exc_n_v; %�������õ��ļӳ��ϳɼ���д������
        s_syn_v((n-1)*FL_v+1:n*FL_v) = s_syn_n_v;  %�������õ��ļӳ��ϳ�����д������
      %(13)
      w=150*2*pi;
      omg=w/8000;
      [z,p,k]=tf2zp(1,A);
      p_length=length(p);
      for con=1:p_length
        if(angle(p(con))>0&&angle(p(con))<pi);
            p(con)=p(con)*exp(1i*omg);
        elseif(angle(p(con))<0&&angle(p(con))>-pi);
            p(con)=p(con)*exp(-1i*omg);
        else
            p(length(p)+1)=p(con)*exp(-1i*omg);
            p(con)=p(con)*exp(1i*omg);
        end
      end
      [b,a]=zp2tf(z,p,k);
      PT_t=floor(PT/2);
      if n==3
           y3=161;
           zi_4=zi_rec;
      end
      exc_syn_n_t=zeros(FL,1);
      while(y3<n*FL)
            exc_syn_n_t(mod(y3,FL)+1)=1;
            y3=y3+PT_t;
      end
      a=a(1:P+1);
      [s_syn_n_t,zf_4]=filter(1,a,exc_syn_n_t,zi_4);
      zi_4=zf_4;
        % (13) ���������ڼ�Сһ�룬�������Ƶ������150Hz�����ºϳ�������������ɶ���ܡ�
      exc_syn_t((n-1)*FL+1:n*FL) =exc_syn_n_t;%�������õ��ı���ϳɼ���д������
      s_syn_t((n-1)*FL+1:n*FL) =s_syn_n_t;%�������õ��ı���ϳ�����д������
     end
%     figure
%     subplot(4,1,1);
%      plot(s(8000:9000));
%      title('ԭʼ�����ź�');
%     subplot(4,1,2);
%      plot(exc(8000:9000));
%      title('�����ź�');
%     subplot(4,1,3);
%      plot (s_rec(8000:9000));
%      title('�ؽ������ź�');
%     subplot(4,1,4);
%      hold on;
%      plot(s(8000:9000));
%      plot(s_rec(8000:9000));
%      title('�ؽ��źź�ԭʼ�ź�');
%       subplot(2,1,1);
%        plot(s);
%       title('ԭ�ź�s')
%       subplot(2,1,2);
%       plot(s_syn)
%       sound(s);
%       pause(2);
%       sound(exc);
%       pause(2);
%       sound(s_rec);
%       pause(2)
%       sound(exc_syn);
%       pause(2)
%       sound(s_syn);
%       pause(2)
%      sound(s_syn_v);
       plot(s_syn_t);
       axis([0 14000 -50 50]);
       title('���������');
%       title('�ϳ������ź�s__syn')
    % (6) �ڴ�λ��д������һ�� s ��exc �� s_rec �к����𣬽�����������
    % ��������������ĿҲ������������д���������ر�ע��
    

    % ���������ļ�
    writespeech('exc.pcm',exc);
    writespeech('rec.pcm',s_rec);
    writespeech('exc_syn.pcm',exc_syn);
    writespeech('syn.pcm',s_syn);
    writespeech('exc_syn_t.pcm',exc_syn_t);
    writespeech('syn_t.pcm',s_syn_t);
    writespeech('exc_syn_v.pcm',exc_syn_v);
    writespeech('syn_v.pcm',s_syn_v);
return

% ��PCM�ļ��ж�������
function s = readspeech(filename, L)
    fid = fopen(filename, 'r');
    s = fread(fid, L, 'int16');
    fclose(fid);
return



% д������PCM�ļ���
function writespeech(filename,s)
    fid = fopen(filename,'w');
    fwrite(fid, s, 'int16');
    fclose(fid);
return


% ����һ�������Ļ������ڣ���Ҫ������
function PT = findpitch(s)
[B, A] = butter(5, 700/4000);
s = filter(B,A,s);
R = zeros(143,1);
for k=1:143
    R(k) = s(144:223)'*s(144-k:223-k);
end
[R1,T1] = max(R(80:143));
T1 = T1 + 79;
R1 = R1/(norm(s(144-T1:223-T1))+1);
[R2,T2] = max(R(40:79));
T2 = T2 + 39;
R2 = R2/(norm(s(144-T2:223-T2))+1);
[R3,T3] = max(R(20:39));
T3 = T3 + 19;
R3 = R3/(norm(s(144-T3:223-T3))+1);
Top = T1;
Rop = R1;
if R2 >= 0.85*Rop
    Rop = R2;
    Top = T2;
end
if R3 > 0.85*Rop
    Rop = R3;
    Top = T3;
end
PT = Top;
return

