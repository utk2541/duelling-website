"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProblems = void 0;
const request_1 = __importDefault(require("request"));
async function GetAllProblems(url) {
    return new Promise((resolve, reject) => {
        (0, request_1.default)(url, { json: true }, (err, res, body) => {
            if (err)
                reject(err);
            resolve(body);
        });
    });
}
exports.GetAllProblems = GetAllProblems;
//# sourceMappingURL=api_helper.js.map