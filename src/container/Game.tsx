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
    for (let i = 1; i <= 9; i++) {
        cardDtos.push(new CardDto(i, i, "imgpath", false))
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
        let wsConnector = new WebsocketConnector();

        // Was wir schicken wollen und was wir mit der empfangenen Nachricht tun wollen
        let onOpen = () => wsConnector.sendData(JSON.stringify(match));
        let onMessage = (message: any) => parseMessage(message.data);

        wsConnector.connect(onOpen, onMessage);
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