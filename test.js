const assert = require("chai").assert;
const dockerManager = require("@socialtables/docker-manager");
const mlog = require("mocha-logger");
const req = require("request-promise");
var redis = require("redis");
let client = null; 

const COMPOSE_TIMEOUT = 120000;

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
		var options = {
			method: "GET",
			uri: "http://localhost:3000/health",
			resolveWithFullResponse: true
		};
		return req(options)
			.then(res => {
				assert(res.statusCode == 200);
			});
	});

	it("weather server should be up", () => {
		var options = {
			method: "GET",
			uri: "http://localhost:3001/health",
			resolveWithFullResponse: true
		};
		return req(options)
			.then(res => {
				assert(res.statusCode == 200);
			});
	});

	describe("test the weather server", function() {
		it("should respond with the current dc weather", () => {
			var options = {
			method: "GET",
			uri: "http://localhost:3001/",
			resolveWithFullResponse: true
		};
		return req(options)
			.then(res => {
				assert(res.statusCode == 200);
				assert(res.body);
				const parsedBody = JSON.parse(res.body);
				//console.log("parsedBody: ",parsedBody);
				assert(parsedBody);
			});
		});
	});

	describe("test that values are being inserted into the cache", function() {
		before(function() {
			client = redis.createClient({});
		});

		it("should have the current time in current:dc:time", (done) => {
			client.get("current:dc:time", (err, data) => {
				if (err) {
					done(err);
				}
				else {
					assert(data);
					done();
				}
			});
		});

		it("should have the current weather in current:dc:weather", (done) => {
			client.get("current:dc:weather", (err, data) => {
				if (err) {
					done(err);
				}
				else {
					assert(data);
					done();
				}
			});
		});

		after(function() {
			client.quit();
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



