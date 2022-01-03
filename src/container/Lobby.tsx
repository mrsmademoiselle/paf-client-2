import React, {useEffect} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import {Col, Container, Row} from "react-bootstrap";
import ReactLoading from "react-loading"
import {useNavigate} from "react-router-dom";
import '../styling/css/Loadinganimation.css';
import {GameDto} from "../entities/GameDto";
import {addMatchDto, websocketState} from "../states/UserStates";
import {useAtom} from "@dbeining/react-atom";
import {TokenManager} from "../services/TokenManager";


export default function Lobby() {
    let navigate = useNavigate()
    // Dient dem cleanup der websocket subscription
    let isMounted = true;

    /* States */
    const websocketConnector = useAtom(websocketState).websocketConnector;
    websocketConnector.connect();

    useEffect(() => {

            let parseMessage = (message: any) => {
                console.log(new Date().getTime(), "received message: ", message);
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
                        <> Suche nach Spielern
                            <ReactLoading className="reactLoader" type={"spokes"} color={"grey"} width={"100px"}/>
                        </>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}