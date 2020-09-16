#FROM node:10-alpine as buildContainer
#WORKDIR /app
#COPY ./package.json ./package-lock.json /app/
#RUN npm install
#COPY . /app
#RUN npm run build:ssr
#
## Expose the port the app runs in
#EXPOSE 4000
#
## Serve the app
#CMD ["npm", "run", "serve:ssr"]
FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/symb-ssr-app/browser /usr/share/nginx/html

RUN mkdir -p /usr/share/nginx/html/_ah && \
    echo "healthy" > /usr/share/nginx/html/_ah/health


RUN ls /usr/share/nginx/html

# start app
#CMD ng serve --host 0.0.0.0
