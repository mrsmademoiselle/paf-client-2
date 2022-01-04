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
import {swap, useAtom} from "@dbeining/react-atom";
import {authentication, websocketState} from "./states/UserStates";
import Userprofil from './container/Userprofil';
import History from "./container/History";
import Game from "./container/Game";
import Endscreen from "./container/EndScreen";
import Lobby from "./container/Lobby";

export default function App() {

    function RequireAuth() {
        const websocketConnector = useAtom(websocketState).websocketConnector;

        /* vorherige Location um Aktion nach Authentifizierung wieder aufzunehmen */
        let location = useLocation();

        /*  Authentifizierung-State aktualisieren */
        let authenticated = TokenManager.isUserAuthenticated();
        swap(authentication, state => ({
            ...state,
            isAuthenticated: authenticated
        }));

        if (!authenticated) {
            console.log("not authenticated, closing websocket");
            websocketConnector.ws?.close();

            return <Navigate to="/login" state={{from: location}}/>;
        }

        return <Outlet/>;
    }

    /**
     * Schließen der Websocketverbindung, wenn wir auf eine andere Seite navigieren
     */
    function CheckWebsocketSubscription() {
        let location = useLocation();

        let isIngameOrLobby = location.pathname === "/game" || location.pathname === "/gameloading";
        const websocketConnector = useAtom(websocketState).websocketConnector;

        if (websocketConnector.isOpen() && !isIngameOrLobby) {
            console.log("Navigation auf andere Seite: Websocketverbindung wird geschlossen.")
            websocketConnector.ws?.close();
        }

        return <Outlet/>;
    }

    return (
        <Router>
            <Routes>
                <Route element={<CheckWebsocketSubscription/>}>
                    {/* öffentliche Routen */}
                    <Route path="/" element={<Register/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    {/* private Routen mit Auth-check */}
                    <Route element={<RequireAuth/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/userprofil" element={<Userprofil/>}/>
                        <Route path="/gameloading" element={<Lobby/>}/>
                        <Route path="/history" element={<History/>}/>
                        <Route path="/game" element={<Game/>}/>
                        <Route path="/endscreen" element={<Endscreen/>}/>

                    </Route>
                </Route>
            </Routes>
        </Router>
    );

}