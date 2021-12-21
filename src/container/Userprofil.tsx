import MainLayout from "../layouts/MainLayout"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/css/Userprofil.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import editImg from '../styling/images/buttons/edit.svg'
import '../styling/css/RegisterLogin.css';
import {Link, useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import {TokenManager} from "../services/TokenManager";
import {Stack} from "react-bootstrap";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import TextInputFieldComp from "../components/TextInputFieldComp";


export default function Userprofil() {
    /*TODO:
    * - Benutzerinfos vom Server holen
    *   - leerer Post request auf endpoint mit auth token
    *   - auslesen des Bodys
    * - Infos in Felder rein bringen
    * - Bei aenderungen an Server senden
    *   - Profilbild getrennt von username
    *   - Ein Submit fuer username/pw
    * - Refactoren da absurd viel redundant
    * */


    //States
    //Inputfelder
    const [loadedUsername, setloadedUsername] = useState();

    //Profilbild
    const [selectedImg, setSelectedImg] = useState();
    const [preview, setPreview] = useState<String | ArrayBuffer | null>();
    const hiddenFileInput = React.useRef(null);

    //regex
    const [liveUserText, setUserText] = useState("");
    const [registerActive, setRegisterActive] = useState(false);
    const [inputs, setInputs] = useState({username: '', password: ''});
    const [livePwText, setLivePwText] = useState("");

    // Laden des user in den State
    UserAuthService.loadUsername().then(res => setloadedUsername(res))
    // @ts-ignore
    UserAuthService.loadUserImage().then(res => {
        console.log('setze preview!')
        setPreview(res)})
    console.log('Image in preview:', preview)
    console.log('Image: ', selectedImg)

    //TODO: REFACTOREN
    // regex check vom username
    const checkPW = (val: string) => {
        if (val.length <= 6) {
            setLivePwText("too short");
            setRegisterActive(false);
        } else if (!/\d/.test(val)) {
            setLivePwText("should contain numbers");
            setRegisterActive(false);
        } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)) {
            setLivePwText("should at least contain one special character");
            setRegisterActive(false);
        } else {
            setLivePwText("");
            setRegisterActive(true);
        }
    }

    const checkUserName = (val: string) => {
        if (val.length <= 0) {
            setUserText("should not be empty");
            setRegisterActive(false);
        } else if (/\s/.test(val)) {
            setUserText("should not contain spaces");
            setRegisterActive(false);
        } else {
            setUserText("");
            setRegisterActive(true);
        }
    }

    const adjustInput = (e: any) => {
        const val = e.target.value;
        if (e.target.name === "password") {
            checkPW(val);
        }
        if (e.target.name === "username") {
            checkUserName(val);
        }
        setInputs({
            ...inputs,
            [e.target.name]: val
        })
    }

    async function handleSubmit(e: any) {
        console.log('submit abfeuern')
        console.log(inputs.username)
        console.log(inputs.password)

        e.preventDefault();
        /* Eventuell bereits beim Tippen überprüfen, damit Livefeedback gegeben werden kann */
        //TODO: FIX REGEX UND CHECK CLIENTSEITIG NACH DEM NAMEN
        let regex = /(\W)/;
        let usernameInvalid = regex.test(inputs.username);
        console.log(usernameInvalid)
        await UserAuthService.update(inputs)

    }

    //Bild
    function fileUpload(ref: any) {
        console.log('fileupload', ref)
        if (ref !== undefined) {
            ref.current.click();
            UserAuthService.uploadImg(selectedImg);
        }
    }

    function onChangeHandler(event: any) {
        const file = event.target.files[0];
        console.log('reading files', file)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        console.log('data url', reader)
        reader.onload = function () {
            if (reader.result !== null) {
                setPreview(reader.result);
                console.log("reader ist nicht null")
            }
        }
        console.log('FOOBAR UPLOAD')
        setSelectedImg(file);
        UserAuthService.uploadImg(selectedImg);
    }

    function clearImage(){
        //Loeschen des Bildes und abspeichern des Defaultbildes vom Server
        UserAuthService.clearUserImage().then(res => setPreview(res))
        console.log("Bild geraeumt:", preview)
    }


    let src: any;
    if (preview !== null && preview !== undefined) {
        src = preview;
    }

    // @ts-ignore
    return (
        <MainLoggedInLayout>
            <Container>
                <Row>
                    Profil aktualisieren
                    <hr/>
                </Row>
                <Row>
                    {/*Profilbild*/}
                    <Col>
                        <input onChange={onChangeHandler} style={{display: 'none'}} ref={hiddenFileInput} type="file"
                               accept=".jpg, .jpeg, .png" name="file"/>
                        <img alt="Standard Anzeigebild" className="col-auto profilePic"
                             onClick={() => fileUpload(hiddenFileInput)} src={src} title="Bild hochladen"
                        />
                    </Col>
                    {/*Fehlerhandling*/}
                    <Col>
                    </Col>
                    {/*Buttons*/}
                    <Col>
                        {/*TODO: FIX BUTTON Behavouir and layout*/}
                        <Stack>
                            <Button className="mb-3" variant="primary"
                                    onClick={() => fileUpload(hiddenFileInput)}>
                                Bild hochladen
                            </Button>
                            <Button onClick={() => clearImage()} variant="danger">
                                Bild entfernen
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Form className="userProfilTextinput">
                        {/*Inputfelder*/}

                        <Col>
                            {/*
                            <Form.Group className="mb-3" controlId="userName">
                                <div className="text-danger">{liveUserText}</div>
                                <Form.Label>Benutzername</Form.Label>
                                <Form.Control type="text" placeholder={loadedUsername} name="username"
                                              onChange={adjustInput} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="userPassword">
                                <div className="text-danger">{livePwText}</div>
                                <Form.Label>Neues Passwort</Form.Label>
                                <Form.Control type="password" placeholder="Passwort" name="password"
                                              onChange={adjustInput} required/>
                            </Form.Group>
                            */}
                            <Form.Label>Benutzername</Form.Label>
                            <TextInputFieldComp variant="text" placeholder={loadedUsername}>
                                </TextInputFieldComp>
                            <Form.Label>Neues Passwort</Form.Label>
                            <TextInputFieldComp variant="password">
                            </TextInputFieldComp>
                        </Col>
                    </Form>
                    {/*Fehlerhandling*/}
                    <Col>
                    </Col>
                    {/*Buttons*/}
                    <Col>
                        <Stack>
                            <Form onSubmit={handleSubmit}>
                                <Button className="" variant="primary" type="submit">
                                    Speichern
                                </Button>
                            </Form>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}