import mongoose from "mongoose";
const Schema = mongoose.Schema

const TestSchema = new Schema({
    first: String,
    second: Number,
})

TestSchema.methods.log = function () {
    console.log(this.first, " : ", this.second)
}

export default TestSchema
