import MainLayout from "../layouts/MainLayout"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/css/Topnav.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import editImg from '../styling/images/buttons/edit.svg'
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import {TokenManager} from "../services/TokenManager";
import {Stack} from "react-bootstrap";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import TextInputFieldComp from "../components/TextInputFieldComp";
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
                    <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
                    Profil</Link>
                <Link to="/history"
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
                    Historie</Link>
                <Link to="/gameloading"
                      className="logoutButton btn btn-outline-primary d-flex align-items-center">
                    <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
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