import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './styling/css/RegisterLogin.css';
import './styling/css/index.css';
import Login from "./container/Login";
import Register from "./container/Register";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router";
import Dashboard from "./container/Dashboard";
import {TokenManager} from "./services/TokenManager";
import {swap} from "@dbeining/react-atom";
import {authentication} from "./states/UserStates";

export default function App() {

    function RequireAuth() {
        /* previous location to resume action after authentication */
        let location = useLocation();

        /* update authentication state */
        let authenticated = TokenManager.isUserAuthenticated();
        swap(authentication, state => ({
            ...state,
            isAuthenticated: authenticated
        }));

        if (!authenticated) {
            return <Navigate to="/login" state={{from: location}}/>;
        }

        return <Outlet/>;
    }

    // evtl in eigene Datei auslagern
    return (
        <Router>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Register/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                {/* private routes */}
                <Route element={<RequireAuth/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Route>
            </Routes>
        </Router>
    );

}