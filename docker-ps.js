#!/usr/bin/env node

var req = require("request-promise");
let SOME_EXIT_CONDITION = false;
const dockSock = "http://unix:/var/run/docker.sock:";

var options = {
    uri: `${dockSock}/containers/json`,
    qs: {
       
    },
    headers: {
        "Host": "" //YOU HAVE TO DO THIS SO DOCKER DOESNT COMPLAIN ABOUT A MALFORMED HOST HEADER
    },
    json: true
};
req(options)
    .then(res => {
        res.map(p => {
            console.log(`name: ${p.Names[0]} | image: ${p.Image} | health: ${p.Status.indexOf("healthy") > -1 ? "healthy": "unhealthy"}`)
        });
        SOME_EXIT_CONDITION = true;
    })
    .catch(err => {
        console.error(err);
        SOME_EXIT_CONDITION = true;
    });

(function wait () {
   if (!SOME_EXIT_CONDITION) setTimeout(wait, 1000);
})();