import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './css/RegisterLogin.css';
import './css/index.css';
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router";
import Dashboard from "./components/Dashboard";

/**
 * Erstentwurf von JWT Check zum Testen von Routing
 */
function checkAuthentication() {
    let authenticated: boolean = false;

    let token_key = "tolles_jwt_token";
    let token = sessionStorage.getItem(token_key);

    if (token != null) {
        let json = JSON.parse(token);

        // müssen noch andere Daten des Users geprüft werden?
        if (new Date().getTime() > json.expiry) {
            sessionStorage.removeItem(token_key)
        } else {
            authenticated = true;
        }
    }
    return authenticated;
}

export default function App() {
    function RequireAuth() {
        let authenticated = checkAuthentication();

        /* previous location to resume action after authentication */
        let location = useLocation();

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
        </Router>);

}