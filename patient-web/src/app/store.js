"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice_1 = require("../features/auth/authSlice");
const api_1 = require("./api");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authSlice_1.default,
    }
});
let currentToken = null;
exports.store.subscribe(() => {
    const token = exports.store.getState().auth.token;
    if (token !== currentToken) {
        currentToken = token;
        (0, api_1.setAuthToken)(token ?? undefined);
    }
});
//# sourceMappingURL=store.js.map