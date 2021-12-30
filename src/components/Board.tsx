import React from "react";
import Card from "./Card";
import '../styling/css/Board.css';
import {CardDto} from "../entities/CardDto";
import {BoardDto} from "../entities/BoardDto";


export default function Board(props: BoardDto): React.ReactElement {
    return (
        <div className="board col-12 w-100 h-100 board">
            {props.cardSet.map((card: CardDto) => (
                <Card cardId={card.cardId} imgPath={card.imgPath} pairId={card.pairId} isFlipped={card.isFlipped}/>
            ))}
        </div>
    )
}