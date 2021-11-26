import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import placeHolderImg from '../images/100.jpg'
import '../App.css';

async function handleSubmit() {
    /**
     * Get information from the form and write into json
     * then fetch the endpoint with the json
     * Handle if server response is not 200 or if anything else, e.g. network error, occurs
     */
    var userName = (document.getElementById("userName")! as HTMLInputElement).value!;
    var userPW = (document.getElementById("userPassword")! as HTMLInputElement).value!;
    const requestBody = {
        userName: userName,
        userPassword: userPW
    }
    try {
        await fetch('localhost:9090/registrieren', {
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
        alert("Es gab ein Problem beim registrieren! " + exception);
    }
}


function Register() {

    return (
        <div className="App">
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
                                    <Col><img className="profilePic" src={placeHolderImg}></img></Col>
                                    <Col></Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form className="registerForm" onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="userName">
                                                <Form.Control type="text" placeholder="Benutzername" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userPassword">
                                                <Form.Control type="password" placeholder="Passwort" />
                                            </Form.Group>
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