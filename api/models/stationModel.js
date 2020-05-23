
const Mongoose = require("mongoose");

const stationDefinition = {
    _id: String,
    name: String
}

const stationSchema = require("../helpers/schemas/station");

const StationModel = Mongoose.model("Station", stationSchema, "trainstations");

