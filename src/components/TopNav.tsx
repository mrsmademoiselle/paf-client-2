import Navbar from "react-bootstrap/Navbar";
import Logo from '../styling/images/logo/logo.svg';
import logoutImg from '../styling/images/buttons/logout.svg';
import {Link} from "react-router-dom";
import React from "react";
import {TokenManager} from "../services/TokenManager";

function deleteJwtToken() {
    sessionStorage.removeItem("tolles_jwt_token");
}

function TopNav() {
    /* zu ersetzen mit state management */
    const isAuthenticated = TokenManager.isUserAuthenticated();

    return (
        <Navbar className="topNav w-100">
            <Navbar.Brand href="#home">
                <img src={Logo} width="150px"
                     className="navLogo d-inline-block align-top" alt="Memor.io"/>
            </Navbar.Brand>
            {/* "authenticated" aus App.tsx als globalen State festhalten und diesen Button davon abhängig machen */}
            {isAuthenticated ?
                <Link to="/login" onClick={deleteJwtToken}
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
                    Log out</Link> : null
            }
        </Navbar>
    )
}

export default TopNav;