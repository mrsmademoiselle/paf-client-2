import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/css/RegisterLogin.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import {showBanner} from '../states/UserStates';


export default function Login() {
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({username: '', password: ''});
    const [banner, setBanner] = React.useState<boolean | undefined>();

    const adjustInput = (e: any) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmission(e: any) {
        e.preventDefault();
        UserAuthService.login(inputs).then(data => {
            if (data) {
                return navigate("/dashboard");
            } else {
                showBanner("danger", "Die Felder dürfen nicht leer sein");
            }
        });

    }

    return (
        <MainLayout>
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
                                                              name="password" type="password"
                                                              placeholder="Passwort"/>
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
        </MainLayout>
    );
}