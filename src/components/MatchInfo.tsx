import React, {useEffect} from "react";
import '../styling/css/MatchInfo.css';
import {GameDto} from "../entities/GameDto";
import placeHolderImg from '../styling/images/default.jpg';
import {UserScoreDto} from "../entities/UserScoreDto";
import {UserDto} from "../entities/UserDto";
import {useAtom} from "@dbeining/react-atom";
import {setCardTitle, userMoveCooldownState} from "../states/UserStates";
import {useNavigate} from "react-router-dom";


export default function MatchInfo(props: { match: GameDto }): React.ReactElement {
    let currentTurn = props.match.currentTurn.username;
    let {cardTitle, timer} = useAtom(userMoveCooldownState);

    let userScores = props.match.userScores;
    let twoUsers = userScores.length === 2;

    // Laden der Bilder aus dem userScores
    let userImage1 = userScores[0].user.image
    let userImage2 = userScores[1].user.image

    let navigate = useNavigate();
    // on mount
    useEffect(() => {
        console.log("setting callback new")

        // alle 0.1 Sekunden aktualisieren wir den Timer auf der Karte
        let interval: any = setInterval(() => {
            if (timer.isCurrentlyRunning()) {
                setCardTitle(timer.getTimeLeft())
            } else {
                // wenn der Timer gerade nicht läuft, stoppen wir das Intervall
                setCardTitle("0s");
                clearInterval(interval);
            }
        }, 100);

        timer.setCallback(() => {
            clearInterval(interval)
        });

        // on unmount
        return () => {
            clearInterval(interval);
        }
    })

    // falls keine 2 User vorhanden sind (wenn irgendwas buggy ist), verwende Dummydaten für User
    if (!twoUsers) {
        navigate("/dashboard");
    }
    return (
        <div className="match-info h-100">
            <div className={timer.isCurrentlyRunning() ? "text-danger" : "text-muted"}>Cooldown: {cardTitle}</div>
            <div className="padding">{currentTurn} ist am Zug.</div>
            <div className="bg-dark w-100">
                <div className="score row justify-content-between">
                    {/* später Bilder aus imagepfad anzeigen */}
                    <img className="col-auto pic"
                         src={userImage1 ? `data:image/jpeg;base64,${userImage1}` : placeHolderImg}
                         alt="profile pic 1"/>
                    <div className="col-auto score">{userScores[0].moves} : {userScores[1].moves}</div>
                    <img className="col-auto pic"
                         src={userImage2 ? `data:image/jpeg;base64,${userImage2}` : placeHolderImg}
                         alt="profile pic 2"/>
                </div>
            </div>
        </div>
    );
}