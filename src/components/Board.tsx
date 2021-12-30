import React from "react";
import Card from "./Card";
import '../styling/css/Board.css';
import {CardDto} from "../entities/CardDto";


export default function Board(): React.ReactElement {
    // Dummydaten
    let cardDtos: CardDto[] = [];
    for (let i = 1; i <= 9; i++) {
        cardDtos.push(new CardDto(i, i, "imgpath/", false))
    }

    // todo: fetch cards from server (?)

    return (
        <div className="board col-12 w-100 h-100 board">
            {cardDtos.map((e: CardDto) => (
                <Card cardId={e.cardId} imgPath={e.imgPath} pairId={e.pairId} isFlipped={e.isFlipped}/>
            ))}
        </div>
    )
}