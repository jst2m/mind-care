"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = require("./pages/LoginPage");
const SignupPage_1 = require("./pages/SignupPage");
const PatientProfilePage_1 = require("./pages/PatientProfilePage");
const ProtectedRoute_1 = require("./components/ProtectedRoute");
function App() {
    return (<react_router_dom_1.BrowserRouter>
       <react_router_dom_1.Routes>
         <react_router_dom_1.Route path="/login" element={<LoginPage_1.LoginPage />}/>
         <react_router_dom_1.Route path="/signup" element={<SignupPage_1.SignupPage />}/>
         <react_router_dom_1.Route path="/patient" element={<ProtectedRoute_1.ProtectedRoute>
               <PatientProfilePage_1.PatientProfilePage />
             </ProtectedRoute_1.ProtectedRoute>}/>
        <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/login" replace/>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
//# sourceMappingURL=App.js.map