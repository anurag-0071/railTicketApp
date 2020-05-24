
const UserModel = require("../models/userModel");



const createAdmin = (req, res) => {
    const user = req.swagger.params.data.value;
    if (!user.password) user.password = "password@123";
    user.userType = "Admin";
    user.role = "Admin";
    UserModel.createUser(user).then(newUser => {
        console.log("New user created", newUser._id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error in user creation", err);
        res.status(400).send(err);
    });
}

const login = (req, res) => {
    const params = req.swagger.params.data.value;
    const username = params.username;
    const password = params.password;
    UserModel.findOne({
        username
    }, {
        _id,
        username,
        role,
        userType,
        name,
        phone,
        email,
        createdAt,
    }).then(user => {
        if (user) {
            console.log("Scuccessfully fetched user document");
            if (user.validatePassword(password)) {
                console.log("Password validation successfull");
                user.token = user.generateJWTToken();
                res.send(user);
            } else {
                console.log("password validation failed");
                res.status(400).send({
                    message: "Invalid Password",
                })
            }
        } else {
            console.error("No user documnet found");
            res.status(400).send({
                message: "Invalid Username"
            });
        }
    }).catch(err => {
        console.error("Error in fetching user document", err);
        res.status(400).send(err);
    })
}

const signUp = (req, res) => {
    const user = req.swagger.params.data.value;
    if (!user.password) user.password = "password@123";
    user.userType = "Customer";
    user.role = "Customer";
    UserModel.createUser(user).then(newUser => {
        console.log("New user created", newUser._id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error in user creation", err);
        res.status(400).send(err);
    });
}

const getCustomersList = (req, res) => {
    const filter = {
        userType: "Customer"
    }
    const page = req.swagger.params.page.value;
    const count = req.swagger.params.count.value;
    const select = req.swagger.params.select.value;
    const sort = req.swagger.params.sort.value;

    select.password = -1;
    select.salt = -1;
    select.isNewUser = -1;

    UserModel.find(filter, select, page, count, sort).then(users => {
        res.send(users)
    }).catch(err => {
        console.error("Error in fetching customers", err);
        res.status(400).send(err);
    })
}

const getAdminList = (req, res) => {
    const filter = {
        userType: "Admin"
    }
    const page = req.swagger.params.page.value;
    const count = req.swagger.params.count.value;
    const select = req.swagger.params.select.value;
    const sort = req.swagger.params.sort.value;

    select.password = -1;
    select.salt = -1;
    select.isNewUser = -1;

    UserModel.find(filter, select, page, count, sort).then(users => {
        res.send(users)
    }).catch(err => {
        console.error("Error in fetching Admins", err);
        res.status(400).send(err);
    })
}

const updateUserProfile = (req, res) => {
    const userId = req.swagger.params.id.value;
    const data = req.swagger.params.data.value;

    delete data.role;
    delete data.isNewUser;
    delete data.salt;
    delete data.password;
    delete data.createdAt;
    delete data.isDeleted;

    UserModel.update({
        _id: userId
    }, data).then(result => {
        console.log("Successfully updated user Profile");
        res.status(204).send();
    }).catch(err => {
        console.error("Error in updating user profile", err);
        res.status(400).send(err);
    })
}

module.exports = {
    createAdmin,
    login,
    signUp,
    getCustomersList,
    getAdminList,
    updateUserProfile
}

