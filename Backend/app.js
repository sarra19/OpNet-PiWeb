const express=require("express");
const http =require("http");
const config=require ("./config/dbconnection.json");
const mongo = require ("mongoose");
const bodyParser =require('body-parser')

mongo.connect(config.url, {useNewUrlParser:true , useUnifiedTopology: true}).then(()=> console.log("database connected")).catch(()=>console.log("database not connected"))
//mongo.connect(config.url).then(()=>console.log("database connected")).catch(()=>console.log("database not connected"));
//mongo.connect(config.url,{useNewUrlParser:true,useUnifiedTopology:true})
const userRouter=require("./routes/user") 
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRouter) 
app.use('/chat', chatRoomRouter) 
app.use('/messages', messageRouter) 

const server = http.createServer(app);
server.listen(3000, console.log("server run"));

module.exports = app ;

