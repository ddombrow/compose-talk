const http = require("http");

http.get("http://localhost:3001/health", res => {
  if (res.statusCode = 200) {
  	process.exit(0);
  }
  else {
    process.exit(1);
  }
}).on("error", (e) => {
  process.exit(1);
})