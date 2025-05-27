"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = void 0;
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = ({ children }) => {
    const token = (0, hooks_1.useAppSelector)(state => state.auth.token);
    return token ? children : <react_router_dom_1.Navigate to="/login"/>;
};
exports.ProtectedRoute = ProtectedRoute;