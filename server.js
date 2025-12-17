const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  // Allow frontend to talk to backend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ SPEAK API
  if (req.method === "POST" && req.url === "/speak") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "success",
          message: `Server received text: "${data.text}"`
        })
      );
    });

    return;
  }

  // Default route
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      status: "OK",
      message: "AI Voice Engine backend is running 🚀"
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
