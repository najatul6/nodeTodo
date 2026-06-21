const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathName=url.pathname
  console.log(url)
  // Get All ToDos
  if (pathName === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
  //   Create ToDo
  else if (pathName === "/todos/create-todos" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });
    req.on("end", () => {
      const {title,body} = JSON.parse(data)
      const created_at=new Date().toLocaleString()
      const allTodos= JSON.parse(fs.readFileSync(filePath,{encoding:"utf-8"}))
      allTodos.push({title,body,created_at})
      fs.writeFileSync(filePath, JSON.stringify(allTodos,null,2), {encoding:"utf-8"})
      res.end(JSON.stringify({title,body,created_at},null,2))
    });
    
  } else if (pathName.startsWith("/todo") && req.method==="GET") {
    console.log(req.url,"single todo")
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is listening port 5000");
});

/**
 * /todos - Get - All Todo
 * /todos/create-todos POST Create
 */
