import React, {useEffect} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import MatchInfo from "../components/MatchInfo";
import Board from "../components/Board";
import '../styling/css/Game.css';
import {MatchDto} from "../entities/MatchDto";
import {UserDto} from "../entities/UserDto";
import {BoardDto} from "../entities/BoardDto";
import {UserScoreDto} from "../entities/UserScoreDto";
import {CardDto} from "../entities/CardDto";
import {WebsocketConnector} from "../services/WebsocketConnector";


function createDummyData(): MatchDto {
    let user = new UserDto("geilerUsername123", "imagebytes");

    let cardDtos: CardDto[] = [];
    // 2-17, damit die integer divison unten passt, weil 1/2 < 1 sind
    for (let i = 2; i <= 17; i++) {
        // math.floor um die pair id durch division zuzuweisen, kann später alles raus wenn wir die karten vom server empfangen
        cardDtos.push(new CardDto(i, Math.floor(i / 2), "imgpath", false))
    }
    return new MatchDto("1", user, new BoardDto(cardDtos), [new UserScoreDto(user, 1), new UserScoreDto(user, 2)]);
}

function parseMessage(message: string) {
    console.log("received: ", message);
    console.log("JSON: ", JSON.parse(message));
    // TODO JSON Objekt in MatchDto mappen
}

export default function Game() {
    let match: MatchDto = createDummyData();

    useEffect(() => {
        // Dient dem cleanup der websocket subscription
        let isMounted = true;

        let wsConnector = new WebsocketConnector();
        // Was wir an den Server schicken wollen
        let onOpen = () => wsConnector.sendData(JSON.stringify(match));
        //  was wir mit der vom Server empfangenen Nachricht tun wollen
        let onMessage = (message: any) => parseMessage(message.data);
        wsConnector.connect(onOpen, onMessage);

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
                        <Board cardSet={match.gameBoard.cardSet}/>
                    </div>
                    <div className="col-3">
                        <MatchInfo match={match}/>
                    </div>
                </div>
            </div>
        </MainLoggedInLayout>
    )
}