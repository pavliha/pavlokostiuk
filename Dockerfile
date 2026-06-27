FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY favicon.svg /usr/share/nginx/html/favicon.svg
COPY pavlo.webp /usr/share/nginx/html/pavlo.webp
COPY screenshots/ /usr/share/nginx/html/screenshots/
EXPOSE 80
