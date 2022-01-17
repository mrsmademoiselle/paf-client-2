import React, {useEffect} from "react";
import '../styling/css/Card.css';
import {CardDto} from "../entities/CardDto";
import {UserDto} from "../entities/UserDto";
import {useAtom} from "@dbeining/react-atom";
import {setCardTitle, userMoveCooldownState, websocketState} from "../states/UserStates";
import {FlipStatus} from "../entities/FlipStatus";
import {TokenManager} from "../services/TokenManager";


export default function Card(props: { card: CardDto, currentTurn: UserDto }) {
    const websocketConnector = useAtom(websocketState).websocketConnector;
    let {cardTitle, timer} = useAtom(userMoveCooldownState);
    let CARD_URL = "http://localhost:9090/public/" + props.card.pairId + ".jpg";
    let interval: any;
 
    // on mount
    useEffect(() => {
        // alle 0.1 Sekunden aktualisieren wir den Timer auf der Karte
        interval = setInterval(() => {
            if (timer.isCurrentlyRunning()) {
                setCardTitle(timer.getTimeLeft())
            } else {
                // wenn der Timer gerade nicht läuft, stoppen wir das Intervall
                setCardTitle("");
                clearInterval(interval);
            }
        }, 100);

        // on unmount
        return () => {
            clearInterval(interval);
        }
    })


    /**
     * Erstmalige Umsetzung von flipCard
     */
    let flipCard = () => {
        // starten des Timers
        timer.start(() => clearInterval(interval));

        // sende Kartenupdate an Server. Die Response vom Server wird wiederum in Game.tsx behandelt und runtergereicht
        websocketConnector.sendData(JSON.stringify({
            "FLIPPED": props.card.id,
            "JWT": TokenManager.getOnlyToken()
        }));
    }

    // einen Teil der Bedingung mit unserer User-Id verheiraten
    let cardIsNotFlipped = props.card.flipStatus === FlipStatus.NOT_FLIPPED;

    return (
        <div className="rectangle"
             onClick={cardIsNotFlipped && !timer.isCurrentlyRunning() ? flipCard : undefined}>
            {cardIsNotFlipped ?
                <div className="back text-center">{cardTitle}</div>
                :
                <img className="front" src={CARD_URL} alt={"karte " + props.card.id}/>
            }
        </div>
    );
}