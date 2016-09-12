const assert = require("chai").assert;
const dockerManager = require("@socialtables/docker-manager");
const mlog = require("mocha-logger");
const req = require("superagent");

const COMPOSE_TIMEOUT = 120000;
/*const yaml = require("node-yaml");

yaml.read("./docker-compose.yml")
	.then(data => {
		for (svc in data.services) {
			if( data.services.hasOwnProperty( svc )) {
				console.log(svc);
			}	
		}
		
	})
	.catch(err => {
		console.error(err);
	});
*/

describe("Integration tests for architecture: ", function() {
	
	before(function() {
		this.timeout(COMPOSE_TIMEOUT);
		mlog.pending("Spinning up docker compose architecture...");
		return dockerManager.composeUp(__dirname, { }, { "to": COMPOSE_TIMEOUT-1000 })
			.then(function() {
				mlog.success("Done spinning up! Ready to test.");
			});
	});
	
	it("time server should be up", () => {
		return req.get("http://localhost:3000/health")
			.then(res => {
				assert(res.statusType == 2);
			});
	});

	it("weather server should be up", () => {
		return req.get("http://localhost:3001/health")
			.then(res => {
				assert(res.statusType == 2);
			});
	});

	after(function() {
		this.timeout(COMPOSE_TIMEOUT);
		mlog.pending("Spinning down docker compose architecture...");
		return dockerManager.composeDown(__dirname)
			.then(function () {
				mlog.log("Done spinning down.");
			});
	});
});



