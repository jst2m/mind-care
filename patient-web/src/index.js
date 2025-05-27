"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const react_redux_1 = require("react-redux");
const App_1 = require("./App");
const store_1 = require("./app/store");
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_redux_1.Provider store={store_1.store}>
     <App_1.App />
   </react_redux_1.Provider>);
//# sourceMappingURL=index.js.map