import tensorflow.compat.v1 as tf
import pandas as pd
import sys



class predict():
      

      def __init__(self, sID, GPA, distance, service):
            tf.disable_v2_behavior()
            self.dName = None
            self.sID = sID
            
            self.num = self.calPoint(GPA, distance, service)
            
            self.df = pd.read_csv('./data.csv')
            self.x_data = None
            self.y_data = None

            self.result = self.run()


      def calPoint(self, GPA, distance, service):
            
            dis3Hour = ['제주',
                        '경상',
                        '전라',
                        '강원',
                        '충청',
                        '경기북부']
            
            dis2Hour = ['서울북부',
                        '인천',
                        '천안',
                        '광주',
                        '여주',
                        '이천',
                        '의정부',
                        '구리',
                        '남양주',
                        '광명',
                        '양주',
                        '부천',
                        '고양',
                        '가평',
                        '안성',
                        '시흥']
            
            dis1Hour = ['서울남부',
                        '안양',
                        '용인',
                        '안산',
                        '성남',
                        '평택',
                        '과천',
                        '오산',
                        '화성',
                        'Gunpo',
                        '의왕',
                        '수원']
            
            num = 0

            if GPA >= 4.21:
                  
                  num += 60
            elif GPA >= 4.01 and GPA <= 4.20:
                  
                  num += 55
            elif GPA >= 3.81 and GPA <= 4.00:
                  
                  num += 50
            elif GPA >= 3.61 and GPA <= 3.80:
                  
                  num += 45
            elif GPA >= 3.41 and GPA <= 3.60:
                  
                  num += 40
            elif GPA >= 3.21 and GPA <= 3.40:
                  
                  num += 35
            elif GPA >= 3.01 and GPA <= 3.20:
                  
                  num += 30
            elif GPA >= 2.81 and GPA <= 3.00:
                  num += 25
            elif GPA >= 2.51 and GPA <= 2.80:
                  
                  num += 20
            else:
                  
                  num += 10
            
            if distance in dis3Hour:
                  num += 30
            elif distance in dis2Hour:
                  num += 15
            else:
                  print(distance)
                  num += 0
            
            if service > 5:
                  num += 10
            elif service > 0 and service <= 5:
                  num += 5
            else:
                  num += 0
            
            return num


      def setData(self, n):
            if n == 1:
                  self.dName = "gwang"
                  self.gwang()
            elif n == 2:
                  self.dName = "yong"
                  self.yong()
            elif n == 3:
                  self.dName = "inter"
                  self.inter()
            elif n == 4:
                  self.dName = "nam"
                  self.nam()


      def getdName(self):
            return self.dName


      def gwang(self):
            self.x_data = [self.df['G_1'], 
                        self.df['G_2'],
                        self.df['G_3'], 
                        self.df['G_4']]
            self.y_data = [self.df['G_1_dec'], 
                        self.df['G_2_dec'], 
                        self.df['G_3_dec'], 
                        self.df['G_4_dec']]


      def yong(self):
            self.x_data = [self.df['Y_1'], 
                        self.df['Y_2'], 
                        self.df['Y_3'], 
                        self.df['Y_4']]
            self.y_data = [self.df['Y_1_dec'], 
                        self.df['Y_2_dec'], 
                        self.df['Y_3_dec'], 
                        self.df['Y_4_dec']]


      def inter(self):
            self.x_data = [self.df['I_1'], 
                        self.df['I_2'], 
                        self.df['I_3'], 
                        self.df['I_4']]
            self.y_data = [self.df['I_1_dec'], 
                        self.df['I_2_dec'], 
                        self.df['I_3_dec'], 
                        self.df['I_4_dec']]


      def nam(self):
            self.x_data = [self.df['N_1'], 
                        self.df['N_2'],  
                        self.df['N_3'], 
                        self.df['N_4']]
            self.y_data = [self.df['N_1_dec'], 
                        self.df['N_2_dec'], 
                        self.df['N_3_dec'], 
                        self.df['N_4_dec']]


      def run(self):
            
            print("#"*10)
            print("1. 광교관")
            print("2. 용지관")
            print("3. 국제학사")
            print("4. 남제관")
            print("#"*10)
            
            # dNum = int(input("기숙사를 입력하시오. >> "))
            dNum = int(sys.argv[5])

            self.setData(dNum)

            X = tf.placeholder(tf.float32, shape=[None])
            Y = tf.placeholder(tf.float32, shape=[None])

            W = tf.Variable(tf.random_normal([1]), name = 'weight')
            b = tf.Variable(tf.random_normal([1]), name = 'bais')

            hypothesis = X*W+b
            cost = tf.reduce_mean(tf.square(hypothesis-Y))

            optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.0001)
            train=optimizer.minimize(cost)
            
            sess = tf.Session()
            sess.run(tf.global_variables_initializer())

            for step in range(10000):
                  cost_val, _=sess.run([cost, train], feed_dict={X:self.x_data[0], Y:self.y_data[0]})

            result = sess.run(hypothesis, feed_dict={X: [self.num]})

            per = int(round(result[0], 2) * 100)

            if per > 100:
                  per = 100
            elif per < 0:
                  per = 0
            
            return per

      def getResult(self):
            return self.result
        

if __name__ == '__main__':
      
      # sID = int(input("학번을 입력하시오. >> "))
      sID = sys.argv[1]

      # gpa = float(input("지난 학기 학점을 입력하시오. >> "))
      gpa = float(sys.argv[2])

      # distance = input("지역을 입력하시오. >> ")
      distance = sys.argv[3]
      
      # service = int(input("봉사 점수를 입력하시오. >> "))
      service = int(sys.argv[4])
      p = predict(sID, gpa, distance, service)
      
      # print(f"당신이 {p.getdName()}에 합격할 확률은 {p.getResult()}%입니다.")
      print(p.getdName(), p.getResult())

