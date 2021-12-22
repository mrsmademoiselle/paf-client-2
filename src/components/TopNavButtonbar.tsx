import MainLayout from "../layouts/MainLayout"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/css/Topnav.css';
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {TokenManager} from "../services/TokenManager";
import {Stack} from "react-bootstrap";
import logoutImg from "../styling/images/buttons/logout.svg";


export default function TopNavButtonbar(){
    function deleteJwtToken() {
        TokenManager.removeToken();
    }

    return(
        <>
            {/* Buttonstack fuer Navigation */}
            <Stack className="ButtonBarBlock" direction="horizontal" gap={5}>
                <Link to="/userprofil"
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    Profil</Link>
                <Link to="/history"
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    Historie</Link>
                <Link to="/gameloading"
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    Spielen</Link>
            </Stack>
            {/* Logout */}
            <Link to="/login" onClick={deleteJwtToken}
                  className="logoutButton btn btn-outline-primary d-flex align-items-center">
                <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
                Log out</Link>
        </>
    )
}