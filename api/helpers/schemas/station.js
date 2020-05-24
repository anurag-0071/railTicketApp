
const Mongoose = require("mongoose");

const stationDefinition = {
    _id: Mongoose.Schema.Types.ObjectId,
    name: String,
    status: {
        type: String,
        enum: ["Active", "Inactive"]
    },
    lastUpdated: Date,
    createdAt: {
        type: Date,
        default: new Date()
    }
}

const stationSchema = new Mongoose.Schema(stationDefinition);

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