import React, {useEffect} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import MatchInfo from "../components/MatchInfo";
import Board from "../components/Board";
import '../styling/css/Game.css';
import {GameDto} from "../entities/GameDto";
import {useAtom} from "@dbeining/react-atom";
import {addEndscoreDto, addMatchDto, matchDtoState, websocketState} from "../states/UserStates";
import {EndScoreDto} from "../entities/EndScoreDto";
import {useNavigate} from "react-router-dom";


export default function Game() {
    // todo später dieses match statt dem dummy-Match verwenden,
    //  wenn der Server nach dem player-matching ein MatchObjekt zurückgibt
    let {match} = useAtom(matchDtoState);
    const websocketConnector = useAtom(websocketState).websocketConnector;
    let navigate = useNavigate()

    useEffect(() => {
        // Dient dem cleanup der websocket subscription
        let isMounted = true;

        // onMessage-Callback
        let parseResponse = (message: any) => {
            console.log("received: ", message);
            try {
                // parse Objekt in Match- oder EndscoreDto
                if (GameDto.isValidMatchDto(message)) {
                    console.log("ist ein valides GameDto");
                    let matchDto: GameDto = JSON.parse(message);
                    addMatchDto(matchDto);

                } else if (EndScoreDto.isValidMatchDto(message)) {
                    console.log("ist ein valides EndScoreDto");
                    let endScoreDto: EndScoreDto = JSON.parse(message);
                    addEndscoreDto(endScoreDto);

                    isMounted = false
                    return navigate("/endscreen");
                }
            } catch (e) {
                console.log("falsches json format: ", message);
            }
        }
        //  was wir mit der vom Server empfangenen Nachricht tun wollen
        let onMessageCallback = (message: any) => parseResponse(message.data);
        websocketConnector.setOnMessage(onMessageCallback);
        // Dient dem cleanup der websocket subscription
        return () => {
            isMounted = false
        };
    }, []);

    return (
        <MainLoggedInLayout>
            <div className="content">
                <div className="row justify-content-center">
                    <div className="col-9">
                        <Board match={match}/>
                    </div>
                    <div className="col-3">
                        <MatchInfo match={match}/>
                    </div>
                </div>
            </div>
        </MainLoggedInLayout>
    )
}