import React from "react";
import '../styling/css/MatchInfo.css';


export default function MatchInfo(): React.ReactElement {
    return (
        <div className="match-info h-100">
            <div className="padding">Du bist am Zug.</div>
            <div className="bg-dark w-100">
                <div className="score h-25 row justify-content-between">
                    <div className="col-auto">img1</div>
                    <div className="col-auto">1 : 2</div>
                    <div className="col-auto">img2</div>
                </div>
            </div>
        </div>
    );
}