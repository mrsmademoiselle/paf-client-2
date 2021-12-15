import MainLayout from "../layouts/MainLayout"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeHolderImg from '../styling/images/default.png'
import editImg from '../styling/images/buttons/edit.svg'
import '../styling/css/RegisterLogin.css';
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import {TokenManager} from "../services/TokenManager";


export default function Userprofil(){
    let navigate = useNavigate();
    UserAuthService.check().then(data => {
        if(!data){
            TokenManager.removeToken();
            navigate('/login');
        }
    });

    return(
        <MainLayout>
            <Container>
                <Row>
                    Profil aktualisieren
                    <hr/>
                </Row>
            </Container>
        </MainLayout>
    )
}