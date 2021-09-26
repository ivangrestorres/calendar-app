import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginPage } from "../components/auth/LoginPage";
import { CalendarPage } from "../components/calendar/CalendarPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { uid, checking } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) return <h5>Espere...</h5>;

    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            exact
                            path="/login"
                            component={LoginPage}
                            isAuthenticated={!!uid}
                        ></PublicRoute>
                        <PrivateRoute
                            exact
                            path="/"
                            isAuthenticated={!!uid}
                            component={CalendarPage}
                        ></PrivateRoute>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
