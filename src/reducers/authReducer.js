import { types } from "../types/types";

const initalState = {
    checking: true,
};

export const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload,
            };
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false,
            };
        case types.authLogout:
            return { ...initalState, checking: false };
        default:
            return state;
    }
};
