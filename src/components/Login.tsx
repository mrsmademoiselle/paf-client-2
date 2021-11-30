import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RegisterLogin.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopNav from './TopNav'
import {Link, useNavigate} from "react-router-dom";
import Alert from "react-bootstrap/Alert";

/**
 * Testmethode zum Setzen von Token und testen von Routing
 */
function setJwtToken(json: any) {

    const now = new Date();
    const sessionStorageItem = {
        value: JSON.stringify(json),
        // für 8h nach dem Login erreichbar
        expiry: now.getTime() + 28800000,
    }
    // SessionStorage, weil wir dann 2 Tabs mit 2 Accounts offen haben und so das Spiel testen können
    sessionStorage.setItem("tolles_jwt_token", JSON.stringify(sessionStorageItem));
}

export default function Login() {
    const [inputs, setInputs] = useState({username: '', password: ''});
    const [banner, setBanner] = React.useState<boolean | undefined>();
    let navigate = useNavigate();

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
            await fetch('http://localhost:9090/user/login', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.ok) {
                        return response.text()
                    } else {
                        setBanner(false);
                        return Promise.reject("Es gab ein Problem mit dem Server. Der Login konnte nicht verarbeitet werden.");
                    }
                })
                .then(data => {
                        setJwtToken(data);
                        // TODO User vor Redirect global speichern?
                        navigate("/dashboard");
                    }
                ).catch(function (e) {
                    console.log(e);
                    alert(e);
                })
        } catch
            (exception) {
            return (setBanner(false));
        }
    }

// layout
    return (
        <div className="App">
            <TopNav/>
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