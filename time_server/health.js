const http = require("http");

http.get("http://localhost:3000", res => {
  if (res.statusCode = 200) {
  	process.exit(0);
  }
}).on("error", (e) => {
  process.exit(1);
})