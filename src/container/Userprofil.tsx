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
    const [stateUsername, setStateUsername] = useState();
    const [statePassword, setStatePassword] = useState();
    const [inputs, setInputs] = useState({username: '', password: ''});

    //Profilbild
    const [selectedImg, setSelectedImg] = useState();
    const [preview, setPreview] = useState<String | ArrayBuffer | null>();
    const hiddenFileInput = React.useRef(null);

    // Laden des Usernamens in den State um ihn als Placeholder anzeigen zu koennen
    UserAuthService.loadUsername().then(res => setloadedUsername(res))
    // @ts-ignore
    UserAuthService.loadUserImage().then(res => {
        console.log('setze preview!')
        setPreview(res)})
    console.log('Image in preview:', preview)
    console.log('Image: ', selectedImg)

    async function handleSubmit(e: any) {
        // @ts-ignore
        setInputs(inputs.username = stateUsername)
        // @ts-ignore
        setInputs(inputs.password = statePassword)
        console.log('submit abfeuern')
        console.log(inputs.username)
        console.log(inputs.password)

        e.preventDefault();
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

    //Notwendig um den Input aus dem Child TextFieldComp abzugreifen
    function stateTransportUsername(val : any){
        setStateUsername(val)
        console.log("Im Parent state Username: ", stateUsername)
    }
    function stateTransportPassword(val : any){
        setStatePassword(val)
        console.log("Im Parent state Username: ", statePassword)
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
                            <Form.Label>Benutzername</Form.Label>
                            <TextInputFieldComp variant="text" placeholder={loadedUsername} onChange={stateTransportUsername}>
                                </TextInputFieldComp>
                            <Form.Label>Neues Passwort</Form.Label>
                            <TextInputFieldComp variant="password" onChange={stateTransportPassword}>
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