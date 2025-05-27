"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const store_1 = require("./app/store");
const App_1 = require("./App");
test('renders learn react link', () => {
    (0, react_1.render)(<react_redux_1.Provider store={store_1.store}>
       <App_1.App />
     </react_redux_1.Provider>);
    expect(react_1.screen.getByText(/learn react/i)).toBeInTheDocument();
});
//# sourceMappingURL=App.test.js.map