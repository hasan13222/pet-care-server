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
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_services_1 = require("./auth.services");
const http_status_codes_1 = require("http-status-codes");
// import config from '../../config';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signup = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.createUserIntoDB(req.body);
    const data = Object.assign(result);
    delete data.password;
    console.log("signup", result);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'User registered successfully',
        data: data,
    });
}));
const changePassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.changeUserPasswordIntoDB(req.body);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
}));
const forgetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.sendLinkToEmail(req.body);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const useremail = req.user.email;
    const result = yield auth_services_1.AuthServices.setForgottenPasswordIntoDB(useremail, req.body);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
}));
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginAuth(req.body);
    const { token, user, refreshToken } = result;
    // res.cookie('token', token, {
    //   secure: config.node_env === 'Production',
    //   httpOnly: true,
    //   sameSite: config.node_env === 'Production' ? 'none' : 'lax',
    //   maxAge: 90 * 24 * 60 * 60 * 1000,
    // });
    return (0, sendResponse_1.sendAuthResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        token,
        refreshToken,
        message: 'User Logged In successfully',
        data: user,
    });
}));
const checkLogin = () => (req, res) => {
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'User Logged In successfully',
        data: req === null || req === void 0 ? void 0 : req.user,
    });
};
const logout = () => (req, res) => {
    // res.clearCookie('token', {
    //   secure: config.node_env === 'Production',
    //   httpOnly: true,
    //   sameSite: config.node_env === 'Production' ? 'none' : 'lax',
    // });
    console.log('hit here');
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'User Logged out successfully',
        data: {},
    });
};
const refreshToken = () => (req, res) => {
    var _a;
    const refreshToken = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')[1];
    const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refresh_token_secret);
    if (!decoded) {
        return (0, sendResponse_1.sendResponse)(res, {
            status: http_status_codes_1.StatusCodes.FORBIDDEN,
            message: 'Accress token has been sent successfully',
            data: null,
        });
    }
    const { email, role } = decoded;
    const jwtPayload = {
        role,
        email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret, {
        expiresIn: config_1.default.access_token_expires_in,
    });
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Acceess token has been sent successfully',
        data: { token },
    });
};
exports.AuthControllers = {
    signup,
    login,
    checkLogin,
    logout,
    changePassword,
    forgetPassword,
    resetPassword,
    refreshToken,
};
