const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  // Get All ToDos
  if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
  //   Create ToDo
  else if (req.url === "/todos/create-todos" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });
    req.on("end", () => {
      console.log(data);
      const {title,body} = JSON.parse(data)
      const created_at=new Date().toLocaleString()
      const allTodos= JSON.parse(fs.readFileSync(filePath,{encoding:"utf-8"}))
      allTodos.push({title,body,created_at})
      fs.writeFileSync(filePath, JSON.stringify(allTodos), {encoding:"utf-8"})
      res.end(JSON.stringify({title,body,created_at}))
    });
    
  } else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is listening port 5000");
});

/**
 * /todos - Get - All Todo
 * /todos/create-todos POST Create
 */
