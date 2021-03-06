
const Mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userDefinition = {
    // _id: Mongoose.Schema.Types.ObjectId,
    role: {
        type: String,
        enum: ["Admin", "Customer"]
    },
    userType: {
        type: String,
        enum: ["Admin", "Customer"]
    },
    name: {
        type: String,
        required: [true, "Name cannot be empty"],
    },
    phone: {
        type: Number,
        required: [true, "Phone cannot be empty"],
    },
    age: Number,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    age: Number,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    salt: String,
    password: String,
    lastUpdated: Date,
    createdAt: {
        type: Date,
        default: new Date()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}

const userSchema = new Mongoose.Schema(userDefinition);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });

userSchema.methods.validatePassword = function validatePassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.password === hash;
}

userSchema.method.generateJWTToken = function generateJWTToken() {
    const userInfo = Object.assign({}, {
        username: this.username,
        role: this.role,
        userType: this.userType,
    });
    const token = jwt.sign(userInfo, "railTicketSecret", { expiresIn: "1 days" });
    return token;
}


userSchema.pre("save", function (next) {
    this.lastUpdated = new Date;
    next();
});
userSchema.pre("save", function encryptPassword(next) {
    if (this.isNewUser || this.updatePassword) {
        this.salt = crypto.randomBytes(16).toString("hex");
        this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512").toString("hex");
        this.isNewUser = false;
        next();
    } else {
        next();
    }
})


userSchema.pre("update", function (next) {
    this.lastUpdated = new Date();
    next();
});


module.exports = {
    userSchema
}
