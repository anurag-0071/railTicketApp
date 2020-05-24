
const Mongoose = require("mongoose");

const userSchema = require("../helpers/schemas/user");

const UserModel = Mongoose.model("User", userSchema, "users");

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        UserModel.create(user).exec().then(newUser => {
            console.log("Successfully created user", newUser);
            resolve(newUser);
        }).catch(err => {
            console.error("Error in user creation", err);
            reject({
                message: "Technical Error.",
                error: err.toString()
            })
        })
    })
}

const findOne = (filter = {}, select = {}) => {
    if (!filter.hasOwnProperty("isDeleted")) {
        filter.isDeleted = false;
    }
    return new Promise((resolve, reject) => {
        UserModel.findOne(filter).select(select).exec().then(userDoc => {
            resolve(userDoc);
        }).catch(err => {
            console.error("Error in fetching user document", err);
            reject({
                message: "Techincal Error",
                error: err.toString()
            });
        });
    })
}

const find = (
    filter = {},
    select = {},
    page = 0,
    count = 10,
    sort = { createdAt: -1 }
) => {
    return new Promise((resolve, reject) => {
        UserModel.find(filter).skip(page * count).count(count).sort(sort).select(select).exec().then(users => {
            resolve(users);
        }).catch(err => {
            reject({
                message: "Technical Error",
                error: error.toString()
            })
        })
    })
}

const update = (filter, updates) => {
    return new Promise((resolve, reject) => {
        UserModel.update(filter, {
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
    createUser,
    find,
    findOne,
    update,
}