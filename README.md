# DormitoryManagementSystem
- Software Engineering 과목을 수강하며 진행한 기숙사 통합 관리 플랫폼 입니다.
- 기숙사를 지원하는 학생들의 생활 습관 등의 기본 정보를 입력 받고 생활 습관이 맞는 학생들끼리 기숙사 방을 매칭을 해주어서 학생들의 기숙사 생활 불편을 해소를 목적으로 만든 프로젝트입니다.
- 매칭 시스템 외에도 기숙사 입사 합격 예측, 기숙사 커뮤니티등을 제공합니다.

## 기능
- 관리자
1. 합격 학생 정보 받아오기
2. 룸메이트 매칭 시스템
- 학생
1. 기숙사 합격 예측 시스템
2. 도움 주기, 도움 요청 커뮤니티

## Software Requirements
- Server
1. import tensorflow
2. import pandas
3. install npm, pg
- Client
1. install npm

## How to Build
- Server 
1. Terminal을 키고 Server 폴더로 이동합니다.
- cd server
2. Terminal에 다음과 같이 입력해서 설치를 해줍니다.
- npm install
- pip install pandas
- pip install tensorflow
- npm install pg
- npm install jsonwebtoken
3. server 폴더에 secret.js파일을 생성을 해주고 다음과 같이 입력합니다.

![server js](https://user-images.githubusercontent.com/70510732/121015843-68327c80-c7d6-11eb-9909-f9244abaf0ce.PNG)

- 이 프로젝트는 postgresql을 사용합니다. postgresql과 연동해야 이 프로젝트를 사용할 수 있고, 연동하지 못하면 이 시스템에 접근할 수 없습니다.