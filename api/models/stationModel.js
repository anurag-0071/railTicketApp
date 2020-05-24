
const Mongoose = require("mongoose");

const stationSchema = require("../helpers/schemas/station");

const stationModel = Mongoose.model("Station", stationSchema, "trainstations");

const create = (station) => {
    return new Promise((resolve, reject) => {
        stationModel.create(station).exec().then(newStation => {
            console.log("Successfully created user", newStation);
            resolve(newStation);
        }).catch(err => {
            console.error("Error in station creation", err);
            reject({
                message: "Technical Error.",
                error: err.toString()
            })
        })
    })
}

const findOne = (filter = {}, select = {}) => {
    return new Promise((resolve, reject) => {
        stationModel.findOne(filter).select(select).exec().then(stationDoc => {
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
    sort = { createdAt: -1 }
) => {
    return new Promise((resolve, reject) => {
        stationModel.find(filter).skip(page * count).count(count).sort(sort).select(select).exec().then(stations => {
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
        stationModel.update(filter, {
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