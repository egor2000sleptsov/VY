const {Schema, model} = require("mongoose")

const schema = new Schema({
    number: {type: String, required: true, unique: false},
    desc: {type: String, required: false}
})

module.exports = model('Application', schema)
