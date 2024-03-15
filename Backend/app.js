const express=require("express");
const cors = require("cors");

const http =require("http");
const config=require ("./config/dbconnection.json");
const mongo = require ("mongoose");
const bodyParser =require('body-parser')

mongo.connect(config.url, {useNewUrlParser:true , useUnifiedTopology: true}).then(()=> console.log("database connected")).catch(()=>console.log("database not connected"))
//mongo.connect(config.url).then(()=>console.log("database connected")).catch(()=>console.log("database not connected"));
//mongo.connect(config.url,{useNewUrlParser:true,useUnifiedTopology:true})
const questionRouter = require("./routes/question");
const candRouter = require("./routes/candidature")
const app=express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000']  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/question', questionRouter);
app.use('/candidature', candRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app ;

