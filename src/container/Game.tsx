import React from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import MatchInfo from "../components/MatchInfo";
import Board from "../components/Board";
import '../styling/css/Game.css';


// create cards from list

export default function Game() {
    return (
        <MainLoggedInLayout>
            <div className="content">
                <div className="row justify-content-center">
                    <div className="col-9">
                        <Board/>
                    </div>
                    <div className="col-3">
                        <MatchInfo/>
                    </div>
                </div>
            </div>
        </MainLoggedInLayout>
    )
}