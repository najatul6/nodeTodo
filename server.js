const http = require ("http")

const server=http.createServer((req,res)=>{
    console.log({req,res})
    // res.end("Welcome to Todo App")
    if(req.url==='/todos' && req.method==='GET'){
        res.end("Fetching all todos...")
    }else if(req.url==='/todos/create-todos' && req.method==='POST'){
        res.end("Creating a new todo...")
    }else{
        res.end("Route not found")
    }
})

server.listen(5000,"127.0.0.1",()=>{
    console.log("Server is listening port 5000")
})

/** 
* /todos - Get - All Todo
* /todos/create-todos POST Create
*/