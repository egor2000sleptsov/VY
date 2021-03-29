const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const config = require("config")
const port = config.get('port') || 5000
const app = express();

app.use(express.json({extended: true}))
app.use('/api/test', require("./routes/test.routes"))

async function start() {
    try {
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

        await mongoose.connect(
            'mongodb://localhost:27017/VY', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => console.log('connectedtoDB')
        )
        app.listen(port, () => console.log(`server has bees started on ${port} port`))
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()





