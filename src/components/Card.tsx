import React, {useState} from "react";
import '../styling/css/Card.css';
import {CardDto} from "../entities/CardDto";
import placeHolderImg from '../styling/images/default.png';


export default function Card(props: CardDto) {

    // Informationen zu einer Karte in Card-Component abspeichern
    const [card, setCard] = useState(new CardDto(props.cardId, props.pairId, props.imgPath, props.isFlipped));

    /**
     * Erstmalige Umsetzung von flipCard
     */
    let flipCard = () => {
        setCard({
            ...card,
            isFlipped: !card.isFlipped
        })
        console.log(card);
    }

    return (
        <div className="rectangle" onClick={flipCard}>
            {card.isFlipped ?
                <img className="front" src={placeHolderImg} alt="karte"/>
                :
                <div className="back">
                    {card.cardId}
                </div>
            }
        </div>
    );
}