# compose-talk

## Components:

 - /time_server: simple express app that gets the current time and caches it in redis, includes a health check route used by the docker 1.12 healthcheck command to examine the current health of the app.

 - /weather_server: simple express app that gets the current weather in Washington D.C. and caches it in redis, includes a health check route used by the docker 1.12 healthcheck command

 - /monitor: TBD


 ## Run ```npm test``` to see the compose testing flow in action

 [![asciicast](https://asciinema.org/a/5fho3sxzxaul82242phky4wiv.png)](https://asciinema.org/a/5fho3sxzxaul82242phky4wiv)

 See [the @socialtables/docker-manager module](https://github.com/socialtables/docker-manager)