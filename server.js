const http =require("http")

const server=http.createServer((req,res)=>{
    res.send("Welcome to Todo App")
})

server.listen(3000,"127.0.0.1",()=>{
    console.log("Server is listening port 3000")
})