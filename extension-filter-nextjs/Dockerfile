# 빌드 단계
FROM node:18-slim AS builder

# 작업 디렉터리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 전체를 복사
COPY . .

RUN npm run build

# 실행 단계
FROM node:18-slim

WORKDIR /app

# 빌드 단계에서 생성된 필요한 파일들만 복사
COPY package*.json ./

COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nextjs /app/public ./public

# 애플리케이션이 사용할 포트
EXPOSE 80

# 서버 시작 명령어
CMD ["node", "server.js"]