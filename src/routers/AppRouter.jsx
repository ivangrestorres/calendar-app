import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { LoginPage } from "../components/auth/LoginPage";
import { CalendarPage } from "../components/calendar/CalendarPage";

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/" component={CalendarPage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
