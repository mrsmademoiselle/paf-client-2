import React, {Component} from "react";
import '../styling/css/Card.css';
import {Col} from "react-bootstrap";

interface CardProps {
    cardId: number;
    pairId?: number;
    imgPath?: string;
    isFlipped?: boolean;
}

export class Card extends Component<CardProps> {
    render() {
        return (
            <Col className="col-4">
                {/* ^ das col-4 zwingt einen Zeilenumbruch*/}
                <div className="rectangle">{this.props.cardId}</div>
            </Col>);
    }
}