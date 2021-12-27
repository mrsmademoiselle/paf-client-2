import React, {useEffect, useState} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import {Col, Container, Row} from "react-bootstrap";
import ReactLoading from "react-loading"
import {useNavigate} from "react-router-dom";
import '../styling/css/Loadinganimation.css';


export default function GameLoad() {
    let navigate = useNavigate()

    /* Bimmde hier Spielladedinge maken*/
    /*
     TODO: - Wenn der User auf die Seite geht, anzeigen der Animation+text da snach
       spielern gesucht wird
     - Oeffnen eines Sockets zum server - done
     - sobald server signal sendet das ein weitere spieler da ist, daten emfpangen - todo: server fehlt
     - ggf. speichern im state - todo: server fehlt
     - weiterleiten an game - done, wird ueber state gesteuert
    * */

    /*States*/
    const [isLoading, setLoading] = useState<boolean | undefined>(true);
    const [data, setData] = useState<boolean | undefined>(undefined);

    let ws = new WebSocket("ws://localhost:44558/sockettest")

    // Testen der Komponenten, Socketdinge...
    useEffect(() => {
            ws.onopen = () => {
                console.log('Verbunden')
            }
            ws.onmessage = ev => {
                console.log(JSON.parse(ev.data))
            }
            ws.onclose = () => {
                console.log('Dicht maken')
            }
            // ^bis hier Socketdinge
            // Setzen des Fertiggeladen States
            //setLoading(false);
        }
        , [])


    return (
        <MainLoggedInLayout>
            <Container>
                {/* Textblock */}
                <Row>
                    <Col style={{marginTop: '10%'}}>
                        Foobar Gameload
                    </Col>
                </Row>
                {/* Animationsblock */}
                <Row>
                    <Col/>
                    <Col>
                        {isLoading ? (
                                <> Suche nach Spielern
                                    <ReactLoading className="reactLoader" type={"spokes"} color={"grey"} width={"100px"}/>
                                </>)
                            :
                            (<>{navigate("/game")}</>)
                        }
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}