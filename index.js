import db from "./mongoDB/index.js"
import router from './router/index.js'
import dotenv from "dotenv"
import express from "express"
import listStatus from "./ListStatus/index.js"
import multer from "multer"
import cors from "cors"

dotenv.config()

const port = process.env.PORT || 5000
const app = express();

db.connect()

// for parsing the body of request
app.use(express.urlencoded())
app.use(express.json())
app.use(multer().array())

//Router
app.use(router)

// define global objects
global.db = db
global.listStatus = listStatus



app.listen(port, err => {
    if (err) return console.log(`Error: ${err}`)

    console.log(`Server started on ${port} port!`)
})





