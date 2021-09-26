import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const respuesta = await fetchSinToken(
            "auth",
            { email, password },
            "POST"
        );

        const { ok, token, uid, name, msg } = await respuesta.json();

        if (ok) {
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                login({
                    uid,
                    name,
                })
            );
        } else {
            Swal.fire("Error", msg);
        }
    };
};

export const startRegister = (n, email, password) => {
    return async (dispatch) => {
        const respuesta = await fetchSinToken(
            "auth/new",
            { name: n, email, password },
            "POST"
        );

        const { ok, token, uid, name, msg } = await respuesta.json();

        if (ok) {
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                login({
                    uid,
                    name,
                })
            );
        } else {
            Swal.fire("Error", msg);
        }
    };
};

export const startChecking = () => {
    return async (dispatch) => {
        const respuesta = await fetchConToken("auth/renew");

        const { ok, token, uid, name, msg } = await respuesta.json();

        if (ok) {
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                login({
                    uid,
                    name,
                })
            );
        } else {
            dispatch(checkingFinish());
        }
    };
};

const checkingFinish = () => ({
    type: types.authCheckingFinish,
});

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();

        dispatch(logout());
    };
};

const logout = () => ({
    type: types.authLogout,
});
