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
import Userprofil from './container/Userprofil';
import GameLoad from "./container/GameLoad";
import History from "./container/History";
import Game from "./container/Game";


export default function App() {

    function RequireAuth() {
        /* vorherige Location um Aktion nach Authentifizierung wieder aufzunehmen */
        let location = useLocation();

        /*  Authentifizierung-State aktualisieren */
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

    return (
        <Router>
            <Routes>
                {/* öffentliche Routen */}
                <Route path="/" element={<Register/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                {/* private Routen mit Auth-check */}
                <Route element={<RequireAuth/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/userprofil" element={<Userprofil/>}/>
                    <Route path="/gameloading" element={<GameLoad/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Route>
            </Routes>
        </Router>
    );

}