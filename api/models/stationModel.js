
const Mongoose = require("mongoose");

const stationSchema = require("../helpers/schemas/station");

const StationModel = Mongoose.model("Station", stationSchema, "trainstations");

