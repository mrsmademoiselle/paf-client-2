import React from "react";
import {Card} from "./Card";
import '../styling/css/Board.css';
import {Row} from "react-bootstrap";

function createCardRow(list: any) {
    let cards = [];
    // zu ersetzen: list.length
    for (let count = 1; count <= 9; count++) {
        cards.push(<Card cardId={count}/>);
    }
    return cards;

}

export default function Board(): React.ReactElement {
    return (
        <div className="board col-12 w-100 h-100">
            <Row className="justify-content-between">
                {createCardRow({})}
            </Row>
        </div>
    )
}