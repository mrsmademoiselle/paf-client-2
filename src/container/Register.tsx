import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeHolderImg from '../styling/images/painting.png'
import editImg from '../styling/images/buttons/edit.svg'
import '../styling/css/RegisterLogin.css';
import TopNav from '../components/TopNav'
import Alert from 'react-bootstrap/Alert';
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";

/**
 *
 */
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
    let navigate = useNavigate();

    const [banner, setBanner] = React.useState<boolean | undefined>();
    const [inputs, setInputs] = useState({username: '', password: ''});

    // input listener
    const adjustInput = (e: any) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const status = await UserAuthService.register(inputs);

        // TBD Banner übergeben "du kannst dich nun einloggen" oder sogar direktes Einloggen -> dafür JWT-Authentifizierung nötig
        if (status) return navigate("/login")
        setBanner(false);
    }

    return (
        <div className="App">
            <TopNav/>
            {/* Setzen des Banners */}
            {typeof banner == "undefined" ? null :
                banner ? <Alert variant="success">Registrieren erfolgreich!</Alert> :
                    <Alert variant="danger">Registrieren fehlgeschlagen!</Alert>}
            <Container>
                <Row>
                    <Col/>
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
                                         onMouseEnter={hoverEffect} onMouseLeave={setCurrentPic}/>

                                    <Button className="col-auto uploadButton">
                                        <img className="uploadButtonIcon"
                                             src={editImg} title="Bild hochladen"/>
                                    </Button>
                                </Row>

                                {/* User Input */}
                                <Row>
                                    <Col>
                                        <Form className="registerForm" onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="userName">
                                                <Form.Control type="text" placeholder="Benutzername" name="username"
                                                              onChange={adjustInput} required/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userPassword">
                                                <Form.Control type="password" placeholder="Passwort" name="password"
                                                              onChange={adjustInput} required/>
                                            </Form.Group>
                                            <Row className="loginLinkContainer">
                                                <Col>
                                                    <Link className="loginLink" to="/login"
                                                          title="Weiter zum Login">
                                                        Hast du bereits einen Account?</Link>
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
                    <Col/>
                </Row>
            </Container>
        </div>
    );
}

export default Register;