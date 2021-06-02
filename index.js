import db from "./mongoDB/index.js"
import bodyParser from "body-parser";
import router from './router/index.js'
import dotenv from "dotenv"
import express from "express";
import listStatus from "./ListStatus/index.js"

dotenv.config()

const port = process.env.PORT || 5000
const app = express();

db.connect()

// for parsing the body of request
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Router
app.use(router)

// define global objects
global.db = db
global.listStatus = listStatus



app.listen(port, err => {
    if (err) return console.log(`Error: ${err}`)

    console.log(`Server started on ${port} port!`)
})





