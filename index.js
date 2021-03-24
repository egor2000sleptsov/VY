const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(
    'mongodb://localhost:27017/',
    () => console.log('connectedtoDB')
)





