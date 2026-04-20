FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY screenshots/ /usr/share/nginx/html/screenshots/
EXPOSE 80
