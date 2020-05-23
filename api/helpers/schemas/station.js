
const Mongoose = require("mongoose");

const stationDefinition = {
    _id: Mongoose.Schema.Types.ObjectId,
    name: String,
    status: {
        type: String,
        enum: ["Active", "Inactive"]
    }
}

const stationSchema = new Mongoose.Schema(stationDefinition);

module.exports = {
    stationSchema
}