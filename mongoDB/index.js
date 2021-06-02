import mongoose from "mongoose"
import Test from "./Schema/Test.js";
import Application from "./Schema/Application.js";

export default {
    connect: () => {
        mongoose.connect("mongodb+srv://egor2000sleptsov:egorka1324@cluster0.ciliv.mongodb.net/VY?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true},err => {
            if (err) throw err

            console.log("Mongo: Connected to DB!")
        })
    },
    mongoose,
    models: {
        Test: mongoose.model("Test", Test),
        Application: mongoose.model('Application', Application)
    }
}



