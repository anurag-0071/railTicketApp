
const Mongoose = require("mongoose");

const stationDefinition = {
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: [true, "City cannot be empty"]
    },
    state: {
        type: String,
        required: [true, "State cannot be empty"]
    },
    lastUpdated: Date,
    createdAt: {
        type: Date,
        default: new Date()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}

const stationSchema = new Mongoose.Schema(stationDefinition);

stationSchema.index({ name: 1 }, { unique: true })

stationSchema.pre("save", function (next) {
    this.lastUpdated = new Date();
    next();
});
stationSchema.pre("update", function (next) {
    this.lastUpdated = new Date();
    next();
})

module.exports = {
    stationSchema
}