# 빌드
docker build -t yooputer/extension-filter:postgres ./extension-filter-postgres
docker build -t yooputer/extension-filter:express ./extension-filter-express
docker build -t yooputer/extension-filter:front ./extension-filter-nextjs

# 푸시
docker push yooputer/extension-filter:postgres
docker push yooputer/extension-filter:express
docker push yooputer/extension-filter:front