
const Mongoose = require("mongoose");

const ticketDefinition = {
    _id: Mongoose.Schema.Types.ObjectId,

    dateOfJourney: Date,

    trainDetails: {
        id: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Train"
        },
        number: String,
        name: String,

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
    },

    passengetList: [{
        name: String,
        gender: {
            type: String,
            enum: ["Male", "Female"]
        },
        age: Number,
        price: Number,
    }],

    totalAmount: Number,
    status: {
        type: String,
        enum: ["Created", "Confirmed", "Cancelled"],
        default: "Created"
    },

    lastUpdated: Date,
    createdAt: {
        type: Date,
        default: new Date()
    }
}


const ticketSchema = new Mongoose.Schema(ticketDefinition);


ticketSchema.pre("save", function (next) {
    this.lastUpdated = new Date();
    next();
});
ticketSchema.pre("update", function (next) {
    this.lastUpdated = new Date();

});

module.exports = {
    ticketSchema
}