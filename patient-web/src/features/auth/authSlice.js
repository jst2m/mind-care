"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAuth = exports.logout = exports.authSlice = exports.login = exports.signup = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../app/api");
const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: undefined,
};
exports.signup = (0, toolkit_1.createAsyncThunk)('auth/signup', async (dto, { rejectWithValue }) => {
    try {
        const resp = await api_1.default.post('/auth/signup', dto);
        return resp.data;
    }
    catch (err) {
        const msg = err.response?.data.message ||
            err.message;
        return rejectWithValue(msg);
    }
});
exports.login = (0, toolkit_1.createAsyncThunk)('auth/login', async (dto, { rejectWithValue }) => {
    try {
        const resp = await api_1.default.post('/auth/login', dto);
        return {
            uuid: resp.data.sub,
            email: dto.email,
            role: resp.data.role,
            accessToken: resp.data.accessToken,
        };
    }
    catch (err) {
        const msg = err.response?.data.message ||
            err.message;
        return rejectWithValue(msg);
    }
});
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(exports.signup.pending, state => {
            state.status = 'loading';
            state.error = undefined;
        })
            .addCase(exports.signup.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            if (action.payload.accessToken) {
                state.token = action.payload.accessToken;
            }
        })
            .addCase(exports.signup.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
        });
        builder
            .addCase(exports.login.pending, state => {
            state.status = 'loading';
            state.error = undefined;
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = {
                uuid: action.payload.uuid,
                email: action.payload.email,
                role: action.payload.role,
            };
            state.token = action.payload.accessToken || null;
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
        });
    },
});
exports.logout = exports.authSlice.actions.logout;
const selectAuth = (state) => state.auth;
exports.selectAuth = selectAuth;
exports.default = exports.authSlice.reducer;
//# sourceMappingURL=authSlice.js.map