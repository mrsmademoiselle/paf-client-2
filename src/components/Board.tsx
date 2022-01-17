import React from "react";
import Card from "./Card";
import '../styling/css/Board.css';
import {CardDto} from "../entities/CardDto";
import {GameDto} from "../entities/GameDto";
import {useAtom} from "@dbeining/react-atom";
import {userMoveCooldownState} from "../states/UserStates";


export default function Board(props: { match: GameDto }): React.ReactElement {
    let {cardTitle, timer} = useAtom(userMoveCooldownState);

    return (
        <div className={"board col-12 w-100 h-100 board " + (timer.isCurrentlyRunning() ? "overlay" : "")}
             key={props.match.lobbyCode}>
            {(props.match.board.cardSet.map((card: CardDto) => (
                <Card card={card} currentTurn={props.match.currentTurn} key={card.id}/>
            )))}
        </div>

    )
}