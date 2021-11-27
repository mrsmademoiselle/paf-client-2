import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeHolderImg from '../images/100.jpg'
import '../App.css';
import TopNavigationBar from './TopNavigationBar'
import { Modal } from 'react-bootstrap';

async function handleSubmit() {
    /**
     * Get information from the form and write into json
     * then fetch the endpoint with the json
     * Handle if server response is not 200 or if anything else, e.g. network error, occurs
     */
    var userName = (document.getElementById("userName")! as HTMLInputElement).value!;
    var userPW = (document.getElementById("userPassword")! as HTMLInputElement).value!;

    // Attach Pitures to body
    var userPic = (document.getElementById("userPic")! as HTMLInputElement).value!;
    const formData = new FormData();
    formData.append('userImage', userPic);

    /* Body mit Bildern
        const requestBody = {
            username: userName,
            userpassword: userPW,
            userPic: userPic,
            formData
        }*/

    const requestBody = {
        username: userName,
        userpassword: userPW,
    }
    try {
        await fetch('localhost:9090/user/register', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(serverResponse => {
                if (!serverResponse.ok) {
                    alert("Es gab ein Problem mit dem Server");
                }
            });
    } catch (exception) {
        // Modalwindow - can be changed to banner if needed
        //  return(<ModalWindow/>)
        alert("Es gab ein Problem beim registrieren! " + exception);
    }
}

function ModalWindow() {
    // TODO: Modalfenster wenn gewuenscht vgl. React Bootstrap Doku
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



function Register() {

    return (
        <div className="App">
            <TopNavigationBar/>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <div className="formContainer">
                            <Container>
                                <Row>
                                    <Col></Col>
                                    <Col><div className="registerLabel">Registrieren</div></Col>
                                    <Col></Col>
                                </Row>

                                <Row>
                                    <Col></Col>
                                    <Col><img className="profilePic" src={placeHolderImg}></img>
                                    </Col>
                                    <Col></Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form className="registerForm" onSubmit={handleSubmit}>
                                            <Form.Group controlId="userPic" className="mb-3">
                                                <Form.Control type="file" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userName">
                                                <Form.Control type="text" placeholder="Benutzername" required />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userPassword">
                                                <Form.Control type="password" placeholder="Passwort" required />
                                            </Form.Group>
                                            <a href="">Hast du bereits einen Account?</a><br />
                                            <Button variant="primary" type="submit">
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