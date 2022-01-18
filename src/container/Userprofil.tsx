import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/css/Userprofil.css';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styling/css/RegisterLogin.css';
import {UserAuthService} from "../services/UserAuthService";
import {Stack} from "react-bootstrap";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import TextInputFieldComp from "../components/TextInputFieldComp";
import placeHolderImg from "../styling/images/default.jpg";
import {HttpConnector} from "../services/HttpConnector";


export default function Userprofil() {
    /*TODO:
    * - Benutzerinfos vom Server holen - Done ausser Bild- siehe Kommentar in GetImageComponent
    *   - leerer Post request auf endpoint mit auth token
    *   - auslesen des Bodys
    * - Infos in Felder rein bringen - Done fuer username - Bild siehe Kommentar drueber
    * - Bei aenderungen an Server senden
    *   - Profilbild getrennt von username
    *   - Ein Submit fuer username/pw - Done
    * - Refactoren da absurd viel redundant - bis auf Bild done
    * */


    //States
    //Inputfelder
    const [loadedUsername, setloadedUsername] = useState();
    const [stateUsername, setStateUsername] = useState();
    const [statePassword, setStatePassword] = useState();
    const [inputs, setInputs] = useState({username: '', password: ''});

    //Profilbild
    const [selectedImg, setSelectedImg] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);

    // Laden des Usernamens in den State um ihn als Placeholder anzeigen zu koennen
    useEffect(() =>{
        UserAuthService.loadUsername().then(res => setloadedUsername(res))
        UserAuthService.loadUserImage().then((res) => {
            /*
            Folgendes passiert:
            Der ArrayBuffer wird in ein 8bit Array konvertiert
            Dannach wird aus dem 8 Bit Array die unicode Zeichen konvertiert
            Am Ende kommt unsere DataURL raus, die wir ins Bild setzen
             */
            // @ts-ignore
            let convertedImageArray = new Uint8Array(res);
            // @ts-ignore
            const dataImageURL = String.fromCharCode.apply(null, convertedImageArray);
            setSelectedImg(btoa(dataImageURL));
        }
    ).catch(err => console.log(err))
    },[])

    // Userdaten aktualisieren
    async function handleSubmit(e: any) {
        /**
         *  update username and password
         */
        // @ts-ignore
        setInputs(inputs.username = stateUsername)
        // @ts-ignore
        setInputs(inputs.password = statePassword)

        e.preventDefault();
        await UserAuthService.update(inputs)
    }

    // Bild upload
    const changeHandler = (event:any) => {
        /**
         * Setzen des Bildes durch den input
         */
        setSelectedImg(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        /**
            Hochladen des ausgewählten Bildes aus dem state
         */
        UserAuthService.uploadImg(selectedImg)

        // Preview setzen des Bildes, vgl. image upload im userAuthService
        const reader = new FileReader();
        let base64String;

        reader.onload = function (e) {
            // @ts-ignore
            base64String = e.target.result.replace("data:", "").replace(/^.+,/, "");
            let res = base64String;
            setSelectedImg(base64String)
        }
        reader.readAsDataURL(selectedImg);


    };

    function clearImage() {
        //Loeschen des Bildes und abspeichern des Defaultbildes vom Server
        UserAuthService.clearUserImage().then(res => setSelectedImg(res))
        console.log("Bild geraeumt:", selectedImg)
    }


    let src: any;
    if (selectedImg !== null && selectedImg !== undefined) {
        src = selectedImg;
    }

    //Notwendig um den Input aus dem Child TextFieldComp abzugreifen
    function stateTransportUsername(val: any) {
        setStateUsername(val)
    }

    function stateTransportPassword(val: any) {
        setStatePassword(val)
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
                        <img alt="Standard Anzeigebild" className="col-auto profilePic"
                              src={src ? `data:image/jpeg;base64,${src}` : placeHolderImg} title="Bild hochladen"
                        />
                    </Col>
                    {/*Fehlerhandling*/}
                    <Col>
                    </Col>
                    {/*Buttons*/}
                    <Col>
                        <Stack>
                            <input onChange={changeHandler} type="file" className="custom-file-input" id="inputGroupFile02"
                                   accept=".jpg, .jpeg, .png" name="file">
                            </input>
                            <Button className="mb-3" variant="primary"
                                    onClick={handleSubmission}>
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
                            <TextInputFieldComp variant="text" placeholder={loadedUsername}
                                                onChange={stateTransportUsername}>
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