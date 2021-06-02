import mongoose from "mongoose";
const Schema = mongoose.Schema

const Application = new Schema({
    id: {
        required: true,
        type: Number
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    queue: {
        required: true,
        type: Array
    },
    costs: {
        workCost: {
            type: Number,
            required: true
        },
        materialCost: {
            type: Number,
            required: true
        }
    }

})

Application.methods.log = function () {
    console.log('sss')
}

export default Application
