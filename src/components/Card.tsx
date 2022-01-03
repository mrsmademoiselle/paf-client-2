import React from "react";
import '../styling/css/Card.css';
import {CardDto} from "../entities/CardDto";
import {UserDto} from "../entities/UserDto";
import {useAtom} from "@dbeining/react-atom";
import {websocketState} from "../states/UserStates";
import {FlipStatus} from "../entities/FlipStatus";
import {TokenManager} from "../services/TokenManager";


function changeFlipStatus(card: CardDto): FlipStatus | undefined {
    if (card.flipStatus === FlipStatus.NOT_FLIPPED) {
        return FlipStatus.WAITING_TO_FLIP;
    } else {
        return undefined;
    }
}

export default function Card(props: { card: CardDto, currentTurn: UserDto }) {
    const websocketConnector = useAtom(websocketState).websocketConnector;

    console.log("carddto: ", props.card);
    // Informationen zu einer Karte in Card-Component abspeichern
    let CARD_URL = "http://localhost:9090/public/" + props.card.pairId + ".jpg";

    /**
     * Erstmalige Umsetzung von flipCard
     */
    let flipCard = () => {
        // sende Kartenupdate an Server. Die Response vom Server wird wiederum in Game.tsx behandelt und runtergereicht
        websocketConnector.sendData(JSON.stringify({"FLIPPED": props.card.id, "JWT": TokenManager.getOnlyToken()}));
    }
    // einen Teil der Bedingung mit unserer User-Id verheiraten
    let itsOurTurnToPick = props.currentTurn === props.currentTurn;
    let cardIsNotFlipped = props.card.flipStatus === FlipStatus.NOT_FLIPPED;
    let shouldHaveOnClickListener: boolean = itsOurTurnToPick && cardIsNotFlipped;

    return (
        <div className="rectangle" onClick={shouldHaveOnClickListener ? flipCard : undefined}>
            {cardIsNotFlipped ?
                <div className="back">
                </div>
                :
                <img className="front" src={CARD_URL} alt={"karte " + props.card.id}/>
            }
        </div>
    );
}