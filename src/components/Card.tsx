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
    const [card, setCard] = useState(new CardDto(props.card.id, props.card.pairId, props.card.flipStatus));
    let CARD_URL = "http://localhost:9090/public/" + card.pairId + ".jpg";

    /**
     * Erstmalige Umsetzung von flipCard
     */
    let flipCard = () => {
        setCard({
            ...card,
            // an Server enum anpassen
            flipStatus: "flipped changed"
        });
        console.log(card);

        // update matchDto

        let cardIdString: string = card.id;
        websocketConnector.sendData(JSON.stringify({"FLIPPED": cardIdString}));
    }

    return (
        // to be fixed mit unserem user
        <div className="rectangle" onClick={props.currentTurn === props.currentTurn ? flipCard : undefined}>
            {card.flipStatus === "FLIPPED" ?
                <img className="front" src={CARD_URL} alt={"karte " + card.id}/>
                :
                <div className="back">
                    {card.id}
                </div>
            }
        </div>
    );
}