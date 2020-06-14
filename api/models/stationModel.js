
const Mongoose = require("mongoose");

const stationSchema = require("../helpers/schemas/station").stationSchema;

const StationModel = Mongoose.model("Station", stationSchema, "trainstations");

const create = (station) => {
    return new Promise((resolve, reject) => {
        StationModel.create(station).then(newStation => {
            console.log("Successfully created station", newStation);
            resolve(newStation);
        }).catch(err => {
            console.error("Error in station creation", err.errors);
            if (err.code == 11000) {
                const errorKey = err.errmsg.split("index: ")[1].split(" ")[0].slice(0, -2)
                const message = errorKey + ": " + station[errorKey] + " already exists.";
                reject({
                    message,
                    error: err.toString()
                })
            } else {
                reject({
                    message: err.toString(),
                    error: err.toString()
                })
            }
        })
    })
}

const findOne = (filter = {}, select = {}) => {
    if (!filter.hasOwnProperty("isDeleted")) {
        filter.isDeleted = false;
    }
    return new Promise((resolve, reject) => {
        StationModel.findOne(filter).select(select).exec().then(stationDoc => {
            resolve(stationDoc);
        }).catch(err => {
            console.error("Error in fetching user document", err);
            reject({
                message: "Techincal Error",
                error: err.toString()
            });
        });
    })
};

const find = (
    filter = {},
    select = {},
    page = 0,
    count = 10,
    sort = { lastUpdated: -1 }
) => {
    return new Promise((resolve, reject) => {
        StationModel.find(filter).sort(sort).skip(page * count).limit(count).select(select).exec().then(stations => {
            resolve(stations);
        }).catch(err => {
            reject({
                message: "Technical Error",
                error: err.toString()
            })
        })
    })
}


const update = (filter, updates) => {
    return new Promise((resolve, reject) => {
        StationModel.update(filter, {
            $set: updates
        }).exec().then(result => {
            console.log("update successfull");
            resolve();
        }).catch(err => {
            console.log("error in update action", err);
            reject(err);
        })
    })
}

module.exports = {
    create,
    findOne,
    update,
    find,
}