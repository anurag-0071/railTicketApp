
const Mongoose = require("mongoose");

const ticketSchema = require("../helpers/schemas/ticket");

const ticketModel = Mongoose.model("Ticket", ticketSchema, "traintickets");

const create = (station) => {
    return new Promise((resolve, reject) => {
        ticketModel.create(station).exec().then(newTicket => {
            console.log("Successfully created ticket", newTicket);
            resolve(newTicket);
        }).catch(err => {
            console.error("Error in ticket creation", err);
            reject({
                message: "Technical Error.",
                error: err.toString()
            })
        })
    })
}

const findOne = (filter = {}, select = {}) => {
    return new Promise((resolve, reject) => {
        ticketModel.findOne(filter).select(select).exec().then(ticketDoc => {
            resolve(ticketDoc);
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
        ticketModel.find(filter).sort(sort).skip(page * count).limit(count).select(select).exec().then(tickets => {
            resolve(tickets);
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
        ticketModel.update(filter, {
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