FROM risingstack/alpine:3.4-v6.3.0-3.6.2

RUN mkdir -p /srv/time_server
WORKDIR /srv/time_server

COPY package.json /srv/time_server
RUN npm install

COPY . /srv/time_server
EXPOSE 3000
CMD npm start
HEALTHCHECK --interval=5s --timeout=2s CMD npm run health