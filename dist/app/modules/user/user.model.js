"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_contsts_1 = require("./user.contsts");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    profile_picture: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(user_contsts_1.USER_ROLE),
        default: 'user',
    },
    following: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User'
    }
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
