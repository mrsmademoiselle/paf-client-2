import React, {useState} from "react";
import '../styling/css/Card.css';
import {CardDto} from "../entities/CardDto";
import {UserDto} from "../entities/UserDto";
import {useAtom} from "@dbeining/react-atom";
import {matchDtoState, websocketState} from "../states/UserStates";


export default function Card(props: { card: CardDto, currentTurn: UserDto }) {
    let {match} = useAtom(matchDtoState);
    const websocketConnector = useAtom(websocketState).websocketConnector;

    // Informationen zu einer Karte in Card-Component abspeichern
    const [card, setCard] = useState(new CardDto(props.card.cardId, props.card.pairId, props.card.imgPath, props.card.isFlipped));
    let CARD_URL = "http://localhost:9090/public/" + card.pairId + ".jpg";

    /**
     * Erstmalige Umsetzung von flipCard
     */
    let flipCard = () => {
        setCard({
            ...card,
            isFlipped: !card.isFlipped
        })
        console.log(card);

        // update matchDto

        websocketConnector.sendData(JSON.stringify(match));
    }

    return (
        <div className="rectangle" onClick={props.currentTurn == props.currentTurn ? flipCard : undefined}>
            {card.isFlipped ?
                <img className="front" src={CARD_URL} alt={"karte " + card.cardId}/>
                :
                <div className="back">
                    {card.cardId}
                </div>
            }
        </div>
    );
}