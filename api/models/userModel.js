
const Mongoose = require("mongoose");

const userSchema = require("../helpers/schemas/user").userSchema;

const UserModel = Mongoose.model("User", userSchema, "users");

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        console.log('creating new user now', user);
        UserModel.create(user, (err, newUser) => {
            if (err) {
            console.error("Error in user creation", err);
                if (err.code == 11000) {
                    const errorKey = err.errmsg.split("index: ")[1].split(" ")[0].slice(0, -2)
                    const message = errorKey + ": " + user[errorKey] + " already exists.";
                    reject({
                        message,
                        error: err.toString()
                    })
                } else {
            reject({
                message: "Technical Error.",
                error: err.toString()
            })
                }
            } else {
                console.log("Successfully created user", newUser);
                resolve(newUser);
            }
        })
    })
}

const findOne = (filter = {}, select = {}) => {
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
    select = "",
    page = 0,
    count = 10,
    sort = { lastUpdated: -1 }
) => {
    console.log("find params", {
        filter,
        select,
        page,
        count,
        sort
    })
    return new Promise((resolve, reject) => {
        UserModel.find(filter).sort(sort).skip(page * count).limit(count).select(select).then(users => {
            console.log("got users list", users)
            resolve(users);
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

const getCount = (filter = {}) => {
    return new Promise((resolve, reject) => {
        UserModel.count(filter).then(userCount => {
            resolve(userCount);
        }).catch(err => {
            reject({
                message: "Technical Error",
                error: err.toString()
            })
        })
    })
}

module.exports = {
    createUser,
    find,
    findOne,
    update,
    getCount,
}