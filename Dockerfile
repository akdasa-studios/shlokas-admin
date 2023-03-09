FROM nginx:1.23.3-alpine
COPY ./dist /etc/nginx/html/
COPY ./host/shlokas-admin.conf /etc/nginx/conf.d/default.conf