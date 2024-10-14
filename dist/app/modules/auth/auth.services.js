"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const changeUserPasswordIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Old Password not matched');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return result;
});
const sendLinkToEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // create access token to send to the client
    const jwtPayload = {
        role: user.role,
        email: user.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret, {
        expiresIn: '30m',
    });
    const resetLink = `http://localhost:3000/reset-password?id=${user._id}&token=${accessToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
});
const setForgottenPasswordIntoDB = (useremail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    console.log(useremail);
    const user = yield user_model_1.User.findOne({ email: useremail }).select('+password');
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return result;
});
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = payload;
    newUser.role = 'user';
    const hashedPassword = yield bcrypt_1.default.hash(newUser.password, Number(config_1.default.bcrypt_salt_rounds));
    newUser.password = hashedPassword;
    const result = yield user_model_1.User.create(newUser);
    return result;
});
const loginAuth = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Password not matched');
    }
    const jwtPayload = {
        role: user.role,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret);
    return { user, token };
});
exports.AuthServices = {
    createUserIntoDB,
    loginAuth,
    changeUserPasswordIntoDB,
    setForgottenPasswordIntoDB,
    sendLinkToEmail
};
