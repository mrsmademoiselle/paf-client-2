import React from "react";
import Card from "./Card";
import '../styling/css/Board.css';
import {CardDto} from "../entities/CardDto";
import {GameDto} from "../entities/GameDto";


export default function Board(props: { match: GameDto }): React.ReactElement {

    return (
        <div className="board col-12 w-100 h-100 board" key={props.match.lobbyCode}>
            {props.match.board.cardSet.map((card: CardDto) => (
                <Card card={card} currentTurn={props.match.currentTurn} key={card.id}/>
            ))}
        </div>
    )
}