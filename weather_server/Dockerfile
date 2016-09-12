FROM risingstack/alpine:3.4-v6.3.0-3.6.2

RUN mkdir -p /srv/weather_server
WORKDIR /srv/weather_server

COPY package.json /srv/weather_server
RUN npm install

COPY . /srv/weather_server
EXPOSE 3001
CMD npm start
HEALTHCHECK --interval=5s --timeout=2s CMD npm run health