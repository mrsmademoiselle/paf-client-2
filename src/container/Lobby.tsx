import React, {useEffect} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import {Col, Container, Row} from "react-bootstrap";
import ReactLoading from "react-loading"
import {Link, useNavigate} from "react-router-dom";
import '../styling/css/Loadinganimation.css';
import {GameDto} from "../entities/GameDto";
import {addMatchDto, websocketState} from "../states/UserStates";
import {useAtom} from "@dbeining/react-atom";
import {TokenManager} from "../services/TokenManager";


export default function Lobby() {
    /* States */
    const websocketConnector = useAtom(websocketState).websocketConnector;
    websocketConnector.connect();
    let navigate = useNavigate()
    // Dient dem cleanup der websocket subscription
    let isMounted = true;

    useEffect(() => {

            let parseMessage = (message: any) => {
                try {
                    let gameDto: GameDto;
                    if (GameDto.isValidMatchDto(message)) {
                        console.log("ist ein valides GameDto");
                        gameDto = JSON.parse(message);
                        addMatchDto(gameDto); // Match im State speichern, damit wir nach dem Redirect in /game Zugriff darauf haben
                    }
                } catch (e) {
                    console.log("falsches json format: ", e)
                }
                console.log("msg ", message);
                navigate("/game")
            }
            //  was wir mit der vom Server empfangenen Nachricht tun wollen
            let onMessage = (message: any) => parseMessage(message.data);
            websocketConnector.setOnMessage(onMessage);
            websocketConnector.sendData(JSON.stringify({"LOGIN": null, "JWT": TokenManager.getOnlyToken()}));// Dient dem cleanup der websocket subscription

            return () => {
                isMounted = false
            };
        }
        , [])

    let cancelQueue = () => {
        websocketConnector.sendData(JSON.stringify({"DISSOLVE": null, "JWT": TokenManager.getOnlyToken()}));
        navigate("/dashboard");
    }

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
                <Row className="justify-content-center">
                    <div className="h-100">
                        <div className="h-50">Suche nach Spielern
                            <ReactLoading className="reactLoader" type={"spokes"} color={"grey"} width={"100px"}
                                          height={"200px"}/>
                        </div>
                        <div className="align-bottom">
                            <Link to="/dashboard" onClick={cancelQueue} className="mb-auto btn btn-outline-primary">
                                Spielsuche abbrechen
                            </Link></div>
                    </div>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}