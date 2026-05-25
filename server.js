const http = require ("http")

const server=http.createServer((req,res)=>{
    res.end("Welcome to Todo App")
})

server.listen(5000,"127.0.0.1",()=>{
    console.log("Server is listening port 5000")
})

/** 
* /todos - Get - All Todo
* /todos/create-todos POST Create
*/