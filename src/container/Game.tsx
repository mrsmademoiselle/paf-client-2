import React, {useEffect} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import MatchInfo from "../components/MatchInfo";
import Board from "../components/Board";
import '../styling/css/Game.css';
import {GameDto} from "../entities/GameDto";
import {UserDto} from "../entities/UserDto";
import {BoardDto} from "../entities/BoardDto";
import {UserScoreDto} from "../entities/UserScoreDto";
import {CardDto} from "../entities/CardDto";
import {useAtom} from "@dbeining/react-atom";
import {addMatchDto, matchDtoState, websocketState} from "../states/UserStates";
import {EndScoreDto} from "../entities/EndScoreDto";


function createDummyData(): GameDto {
    let user = new UserDto("geilerUsername123", "imagebytes");

    let cardDtos: CardDto[] = [];
    // 2-17, damit die integer divison unten passt, weil 1/2 < 1 sind
    for (let i = 2; i <= 17; i++) {
        // math.floor um die pair id durch division zuzuweisen, kann später alles raus wenn wir die karten vom server empfangen
        cardDtos.push(new CardDto(i, Math.floor(i / 2), "imgpath", false))
    }
    return new GameDto("1", user, new BoardDto(cardDtos), [new UserScoreDto(user, 1), new UserScoreDto(user, 2)]);
}


export default function Game() {
    let dummyMatch: GameDto = createDummyData();
    // todo später dieses match statt dem dummy-Match verwenden,
    //  wenn der Server nach dem player-matching ein MatchObjekt zurückgibt
    let {match} = useAtom(matchDtoState);
    const websocketConnector = useAtom(websocketState).websocketConnector;

    useEffect(() => {
        // Dient dem cleanup der websocket subscription
        let isMounted = true;

        // onMessage-Callback
        let parseMessage = (message: string) => {
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
                    // endgame-Logik hier
                }
            } catch (e) {
                console.log("falsches json format: ", message);
            }
        }
        //  was wir mit der vom Server empfangenen Nachricht tun wollen
        let onMessageCallback = (message: any) => parseMessage(message.data);
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
                        <Board cardSet={dummyMatch.gameBoard.cardSet}/>
                    </div>
                    <div className="col-3">
                        <MatchInfo match={dummyMatch}/>
                    </div>
                </div>
            </div>
        </MainLoggedInLayout>
    )
}