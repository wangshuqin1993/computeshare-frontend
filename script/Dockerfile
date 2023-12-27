FROM node:18
WORKDIR /app
ADD . /app
RUN npm  --registry https://registry.npmmirror.com  install && npm run build

FROM nginx:1.20
ADD script/default.conf /etc/nginx/conf.d
COPY --from=0 /app/dist /usr/share/nginx/html
