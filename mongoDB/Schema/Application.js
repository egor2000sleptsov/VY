import mongoose from "mongoose";
const Schema = mongoose.Schema

const Application = new Schema({
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
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'На расмотрении'
    }

})

Application.methods.log = function () {
    console.log('sss')
}

export default Application
