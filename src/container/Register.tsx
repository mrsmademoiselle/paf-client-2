import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeHolderImg from '../styling/images/default.png';
import editImg from '../styling/images/buttons/edit.svg';
import '../styling/css/RegisterLogin.css';
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import TextInputFieldComp from "../components/TextInputFieldComp";

function fileUpload(ref: any) {
    if (ref !== undefined) {
        ref.current.click();
    }
}


export default function Register() {
    let navigate = useNavigate();
    // States
    const [inputs, setInputs] = useState({username: '', password: ''});
    const [stateUsername, setStateUsername] = useState();
    const [statePassword, setStatePassword] = useState();
    const [selectedImg, setSelectedImg] = useState();
    const hiddenFileInput = React.useRef(null);
    const [preview, setPreview] = useState<String | ArrayBuffer | null>();
    const [hoverFx, setHoverEffect] = useState<any>();

    // Styling fuer das Hover im State
    const hoverStyle = {
        background: 'black',
        width: '160px',
        height: '150px',
        position: 'absolute',
        opacity: '0.5',
        borderRadius: '30px'
    }

    /**
     * Wenn der Benutzer über das Bild hovert, erscheint eine Drag and Drop Anzeige (siehe FX-Client)
     */
    function hoverEffect() {
        setHoverEffect(hoverStyle)
    }

    /**
     * Wenn der Benutzer aufhört über das Bild zu hovern, erscheint das von ihm gesetzte Bild wieder
     */
    function setCurrentPic() {
        setHoverEffect(undefined)
    }


    function onChangeHandler(event: any) {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (reader.result !== null) {
                setPreview(reader.result);
            }
        }
        setSelectedImg(file);
    }

    //Notwendig um den Input aus dem Child TextFieldComp abzugreifen
    function stateTransportUsername(val: any) {
        setStateUsername(val)
        console.log("Im Parent state Username: ", stateUsername)
    }

    function stateTransportPassword(val: any) {
        setStatePassword(val)
        console.log("Im Parent state Username: ", statePassword)
    }


    async function handleSubmit(e: any) {
        e.preventDefault();
        /* Eventuell bereits beim Tippen überprüfen, damit Livefeedback gegeben werden kann */
        //Das ist der eignetliche regex test der in die comp gekapselt werden muss
        // @ts-ignore
        setInputs(inputs.username = stateUsername)
        // @ts-ignore
        setInputs(inputs.password = statePassword)

        console.log(inputs.username)
        console.log(inputs.password)
        console.log(inputs)

        //const status: boolean = await UserAuthService.register(inputs);
        const reg_status: any = await UserAuthService.register(inputs);
        // if login was successfull
        if (reg_status) {
            // upload img
            if (selectedImg !== null || selectedImg !== undefined) {
                await UserAuthService.uploadImg(selectedImg);
            }
            return navigate("/dashboard")
        }
    }

    let src: any = placeHolderImg;
    if (preview !== null && preview !== undefined) {
        src = preview;
    }

    return (
        <MainLayout>
            <div>
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
                                    <Row className="d-flex justify-content-center middleRow" onMouseEnter={hoverEffect}
                                         onMouseLeave={setCurrentPic}>
                                        <div className="hoverBlock" style={hoverFx}>
                                            {hoverFx != undefined ? (
                                                <p className="hoverText">
                                                    Bild wählen
                                                </p>
                                            ) : null}
                                        </div>
                                        <input onChange={onChangeHandler} style={{display: 'none'}}
                                               ref={hiddenFileInput} type="file" accept=".jpg, .jpeg, .png"
                                               name="file"/>
                                        <img alt="Standard Anzeigebild" className="col-auto profilePic"
                                             onClick={() => fileUpload(hiddenFileInput)} src={src}
                                             title="Bild hochladen"
                                        />

                                        <Button className="col-auto uploadButton"
                                                onClick={() => fileUpload(hiddenFileInput)}>
                                            <img className="uploadButtonIcon"
                                                 src={editImg} title="Bild hochladen"/>
                                        </Button>
                                    </Row>

                                    {/* User Input */}
                                    <Row>
                                        <Col>
                                            <Form className="registerForm" onSubmit={handleSubmit}>
                                                {/*Inputfelder*/}
                                                <Form.Label>Benutzername</Form.Label>
                                                <TextInputFieldComp variant="text" onChange={stateTransportUsername}>
                                                </TextInputFieldComp>
                                                <Form.Label>Passwort</Form.Label>
                                                <TextInputFieldComp variant="password"
                                                                    onChange={stateTransportPassword}>
                                                </TextInputFieldComp>
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
        </MainLayout>
    );
}