"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
exports.setAuthToken = setAuthToken;
const axios_1 = require("axios");
exports.api = axios_1.default.create({
    baseURL: 'http://localhost:3000',
});
exports.default = exports.api;
function setAuthToken(token) {
    if (token) {
        exports.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    else {
        delete exports.api.defaults.headers.common.Authorization;
    }
}
//# sourceMappingURL=api.js.map