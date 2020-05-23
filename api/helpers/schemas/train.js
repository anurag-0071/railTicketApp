
const Mongoose = require("mongoose");
const DAYS = require("../constants/days");

const trainDefinition = {
    _id: Mongoose.Schema.Types.ObjectId,
    name: String,
    number: Number,
    sourceStation: {
        id: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Station"
        },
        name: String,
    },
    destinationStation: {
        id: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Station"
        },
        name: String,
    },
    schedule: [{
        day: {
            type: String,
            enum: [Object.keys(DAYS)]
        },
        departureTime: Date,
        arrivalTime: Date
    }],
    baseFare: Number,
    specialPrice: [{
        category: {
            type: String,
            enum: ["Gender", "Age"],
            required: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        minAge: Number,
        margin: Number, // Percentage of amount to be deducted from base price

    }],
    status: {
        type: String,
        enum: ["Active, Inactive"]
    }
}


const trainSchema = new Mongoose.Schema(trainDefinition);

module.exports = {
    trainSchema
}