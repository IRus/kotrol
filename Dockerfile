FROM nginx:stable-alpine
COPY app/build/site/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
