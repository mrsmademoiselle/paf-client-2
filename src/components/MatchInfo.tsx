import React from "react";
import '../styling/css/MatchInfo.css';
import {GameDto} from "../entities/GameDto";
import placeHolderImg from '../styling/images/default.jpg';
import {UserScoreDto} from "../entities/UserScoreDto";
import {UserDto} from "../entities/UserDto";


export default function MatchInfo(props: { match: GameDto }): React.ReactElement {
    let currentTurn = props.match.currentTurn.username;

    let userScores = props.match.userScores;
    let twoUsers = userScores.length === 2;

    // Laden der Bilder aus dem userScores
    let userImage1 = userScores[0].user.image
    let userImage2 = userScores[1].user.image

    console.log("img1: ", userImage1, "img2", userImage2)

    // falls keine 2 User vorhanden sind (wenn irgendwas buggy ist), verwende Dummydaten für User
    if (!twoUsers) {
        userScores = [new UserScoreDto(new UserDto("username1", "imgbytes1"), 1), new UserScoreDto(new UserDto("username2", "imgbytes2"), 2)];
    }
    return (
        <div className="match-info h-100">
            <div className="padding">{currentTurn} ist am Zug.</div>
            <div className="bg-dark w-100">
                <div className="score row justify-content-between">
                    {/* später Bilder aus imagepfad anzeigen */}
                    <img className="col-auto pic" src={userImage1 ? `data:image/jpeg;base64,${userImage1}` : placeHolderImg} alt="profile pic 1"/>
                    <div className="col-auto score">{userScores[0].moves} : {userScores[1].moves}</div>
                    <img className="col-auto pic" src={userImage2 ? `data:image/jpeg;base64,${userImage2}` : placeHolderImg} alt="profile pic 2"/>
                </div>
            </div>
        </div>
    );
}