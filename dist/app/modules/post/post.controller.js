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
exports.PostControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const post_service_1 = require("./post.service");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripeinstance = new stripe_1.default(config_1.default.stripe_secret);
const createPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.createPostIntoDB(Object.assign(Object.assign({}, req.body), { user: req.user._id }));
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Post Added successfully',
        data: result,
    });
}));
const getMyPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.getMyPostFromDB(req.user._id);
    if (result.length === 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            status: http_status_codes_1.StatusCodes.OK,
            message: 'No Data found',
            data: result,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'All Posts retrieved successfully',
        data: result,
    });
}));
const getUserPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield post_service_1.PostServices.getUserPostFromDB(userId);
    if (result.length === 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: 'No Data found',
            data: result,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'All Posts retrieved successfully',
        data: result,
    });
}));
const getAllPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const result = yield post_service_1.PostServices.getAllPostFromDB(limit);
    if (result.length === 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: 'No Data found',
            data: result,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'All Posts retrieved successfully',
        data: result,
    });
}));
// const getSinglePost = catchAsync(async (req: Request, res: Response) => {
//   const PostId = req.params.id;
//   const result = await PostServices.getSingleFromDB(PostId);
//   sendResponse(res, {
//     status: StatusCodes.OK,
//     message: 'Single Post retrieved successfully',
//     data: result,
//   });
// });
const updatePost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PostId = req.params.id;
    const result = yield post_service_1.PostServices.updatePostIntoDB(PostId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Post updated successfully',
        data: result,
    });
}));
const interactPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PostId = req.params.id;
    const queryObj = req.query;
    const result = yield post_service_1.PostServices.interactPostIntoDB(PostId, req.body, queryObj);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Post updated successfully',
        data: result,
    });
}));
const paymentForPremiumPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PostId = req.params.id;
    const paymentIntent = yield stripeinstance.paymentIntents.create({
        amount: 20,
        currency: 'usd',
        payment_method_types: ['card'],
        description: 'Software development services',
        shipping: {
            name: req.body.accessUser,
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
    });
    const result = yield post_service_1.PostServices.accessUserForPremiumPostIntoDB(PostId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Payment done successfully',
        data: {
            clientSecret: paymentIntent.client_secret,
            result
        },
    });
}));
const deletePost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PostId = req.params.id;
    const result = yield post_service_1.PostServices.deletePostFromDB(PostId);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Post deleted successfully',
        data: result,
    });
}));
const getPostsSummary = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.getPostsSummaryFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Post Summary Retrieved successfully',
        data: result,
    });
}));
exports.PostControllers = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    // getSinglePost,
    getMyPosts,
    interactPost,
    paymentForPremiumPost,
    getUserPosts,
    getPostsSummary
};
