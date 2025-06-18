# Node.js 공식 이미지를 베이스로 사용
FROM node:18

# 작업 디렉터리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 전체를 복사
COPY . .

# 애플리케이션이 사용할 포트
EXPOSE 80

# 서버 시작 명령어
CMD ["npm", "run", "dev"]