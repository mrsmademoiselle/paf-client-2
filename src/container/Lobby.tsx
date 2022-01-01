import React, {useEffect, useState} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import {Col, Container, Row} from "react-bootstrap";
import ReactLoading from "react-loading"
import {useNavigate} from "react-router-dom";
import '../styling/css/Loadinganimation.css';
import {MatchDto} from "../entities/MatchDto";
import {addMatchDto, websocketState} from "../states/UserStates";
import {useAtom} from "@dbeining/react-atom";
import {TokenManager} from "../services/TokenManager";


export default function Lobby() {
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
    const websocketConnector = useAtom(websocketState).websocketConnector;
    websocketConnector.connect();

    useEffect(() => {
            setLoading(true);
            let parseMessage = (message: any) => {
                console.log(new Date().getTime(), "received message: ", message);
                try {
                    let match: MatchDto = JSON.parse(message);
                    // Match im Dto speichern, damit wir nach dem Redirect in /game Zugriff darauf haben
                    addMatchDto(match);
                    console.log("saved match to state ", match);
                } catch (e) {
                    console.log("falsches json format: ", e)
                }
                console.log("msg ", message);
                setLoading(false);
            }
            //  was wir mit der vom Server empfangenen Nachricht tun wollen
            let onMessage = (message: any) => parseMessage(message);
            websocketConnector.setOnMessage(onMessage);
            let data = {"LOGIN": TokenManager.getOnlyToken()};
            console.log("jwt", data.LOGIN)
            websocketConnector.sendData(JSON.stringify(data));
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