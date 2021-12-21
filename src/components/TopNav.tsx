import Navbar from "react-bootstrap/Navbar";
import Logo from '../styling/images/logo/logo.svg';
import logoutImg from '../styling/images/buttons/logout.svg';
import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";
import React from "react";
import {TokenManager} from "../services/TokenManager";
import TopNavButtonbar from "./TopNavButtonbar";

/* TopNav - wrappt diverse weitere Komponenten nach unten hin */
export default function TopNav(): React.ReactElement {
    /* zu ersetzen mit state management */
    const isAuthenticated = TokenManager.isUserAuthenticated();

    return (
        <Navbar className="topNav w-100">
            <Navbar.Brand href="/dashboard">
                <img src={Logo} width="150px"
                     className="navLogo d-inline-block align-top" alt="Memor.io"/>
            </Navbar.Brand>
            {/* "authenticated" aus App.tsx als globalen State festhalten und diesen Button davon abhängig machen */}
            {isAuthenticated ?
            <TopNavButtonbar/> : null
            }
        </Navbar>
    )
}
