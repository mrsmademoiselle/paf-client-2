import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeHolderImg from '../images/100.jpg'
import editImg from '../images/edit.svg'
import '../App.css';
import TopNavigationBar from './TopNavigationBar'
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';

function fileUpload() {
    // not yet implemented
}

/**
 * Wenn der Benutzer über das Bild hovert, erscheint eine Drag and Drop Anzeige (siehe FX-Client)
 */
function hoverEffect() {
    // not yet implemented
}

/**
 * Wenn der Benutzer aufhört über das Bild zu hovern, erscheint das von ihm gesetzte Bild wieder
 */
function setCurrentPic() {
    // not yet implemented
}

function Register() {
    const [banner, setBanner] = React.useState<boolean | undefined>();
    
    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleSubmit();
    };

    async function handleSubmit() {
        /**
         * Get information from the form and write into json
         * then fetch the endpoint with the json
         * Handle if server response is not 200 or if anything else, e.g. network error, occurs
         * Create Banner based on server response or if an exception happens
         */
        var userName = (document.getElementById("userName")! as HTMLInputElement).value!;
        var userPW = (document.getElementById("userPassword")! as HTMLInputElement).value!;

        const requestBody = {
            username: userName,
            userpassword: userPW,
        }
        try {
            await fetch('http://localhost:9090/user/register/', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
            })
                .then(serverResponse => {
                    if (!serverResponse.ok) {
                        return (setBanner(false))
                    } else {
                        return (setBanner(true))
                    }

                });
        } catch (exception) {
            return (setBanner(false))
        }
    }

    return (
        <div className="App">
            <TopNavigationBar />
            {/* Setzten des Banners */}
            {typeof banner == "undefined" ? null :
                banner ? <Alert variant="success">Registrieren erfolgreich!</Alert> : <Alert variant="danger">Registrieren fehlgeschlagen!</Alert>}
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <div className="formContainer">
                            <Container>
                                <Row className="justify-content-center">
                                    <div className="registerLabel">Registrieren</div>
                                </Row>

                                {/* Profilbild */}
                                <Row className="d-flex justify-content-center middleRow">
                                    <img alt="Standard Anzeigebild" className="col-auto profilePic"
                                        onClick={fileUpload} src={placeHolderImg} title="Bild hochladen"
                                        onMouseEnter={hoverEffect} onMouseLeave={setCurrentPic} />

                                    <Button className="col-auto uploadButton">
                                        <img className="uploadButtonIcon"
                                            src={editImg} title="Bild hochladen" />
                                    </Button>
                                </Row>

                                {/* User Input */}
                                <Row>
                                    <Col>
                                        <Form className="registerForm" onSubmit={onSubmit}>
                                            <Form.Group className="mb-3" controlId="userName">
                                                <Form.Control type="text" placeholder="Benutzername" required />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userPassword">
                                                <Form.Control type="password" placeholder="Passwort" required />
                                            </Form.Group>
                                            <Row className="loginLinkContainer">
                                                <Col>
                                                    <a className="loginLink" href="" title="Weiter zum Login">Hast du
                                                        bereits einen Account?</a><br />
                                                </Col>
                                            </Row>
                                            <Button className="primaryButton" type="submit">
                                                Registrieren
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>

                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;