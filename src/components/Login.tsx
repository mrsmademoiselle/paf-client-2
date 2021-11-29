import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RegisterLogin.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopNavigationBar from './TopNavigationBar'
import {Link, Navigate} from "react-router-dom";
import Alert from "react-bootstrap/Alert";

/**
 * Testmethode zum Setzen von Token und testen von Routing
 */
function setJwtToken() {
    const now = new Date();
    const item = {
        value: "12345",
        // für 5 Sekunden nach dem Login erreichbar, danach nicht mehr
        expiry: now.getTime() + 5000,
    }
    localStorage.setItem("tolles_jwt_token", JSON.stringify(item));
}

export default function Login() {
    const [inputs, setInputs] = useState({username: '', password: ''});
    const [banner, setBanner] = React.useState<boolean | undefined>();

    // input listener
    const adjustInput = (e: any) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    // submission handler
    async function handleSubmission(e: any) {
        e.preventDefault();

        try {
            // zum Testen der Routen während Server Request noch nicht funktioniert,
            // darf später natürlich nicht genau hier geschehen
            setJwtToken();

            await fetch('http://localhost:9090/user/login', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {'Content-Type': 'application/json'}
            })
                .then(serverResponse => {
                    if (!serverResponse.ok) {
                        return (setBanner(false));
                    }
                    // to be fixed
                    return <Navigate to="/dashboard"/>;

                });
        } catch (exception) {
            return (setBanner(false));
        }
    }

    // layout
    return (
        <div className="App">
            <TopNavigationBar/>
            {/* Setzen des Banners */}
            {typeof banner == "undefined" ? null :
                <Alert variant="danger">Login fehlgeschlagen!</Alert>}
            <Container>
                <Row>
                    <Col/>
                    <Col>
                        <div className="formContainer">
                            <Container>
                                <Row className="justify-content-center">
                                    <div className="registerLabel">Login</div>
                                </Row>

                                {/* User Input */}
                                <Row>
                                    <Col>
                                        <Form className="registerForm" onSubmit={handleSubmission}>
                                            <Form.Group className="mb-3" controlId="userName">
                                                <Form.Control name="username" onChange={adjustInput}
                                                              type="text" placeholder="Benutzername" required/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userPassword">
                                                <Form.Control onChange={adjustInput}
                                                              name="password" type="password" placeholder="Passwort"/>
                                            </Form.Group>
                                            <Row className="loginLinkContainer">
                                                <Col>
                                                    <Link className="loginLink" to="/register"
                                                          title="Weiter zum Registrieren">
                                                        Hast du noch keinen Account?</Link>
                                                </Col>
                                            </Row>
                                            <Button className="primaryButton" type="submit">
                                                Login
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </div>
    );
}