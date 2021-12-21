import React, { useEffect, useState } from "react";
import '../styling/css/Loadinganimation.css';
import {useNavigate} from "react-router-dom";

export default function LoadingComponent() {
    // Komponenten die eine Ladeanimation anzeigt und uber einen Timeout gesteuert wird
    let navigate = useNavigate()

    /* States */
    // Dinge fuer das laden
    const [isLoading, setLoading] = useState<boolean | undefined>(undefined);
    const [completed, setCompleted] = useState<boolean | undefined>(undefined);

    // Socket
    useEffect(() => {
        setTimeout(() => {
            // Socketdinge
            fetch("https://swapi.dev/api/people/1")
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    // ^bis hier Socketdinge
                    setLoading(true);
                    setTimeout(() => {
                        setCompleted(true);
                        // Dauer des Haeckchens, abgestimmt mit frames im Styling
                    }, 1000);
                });
            // Dauer der Animation zum laden
        }, 2000);
    }, []);



    return (
        <>
            {!completed ? (
                <>
                    {!isLoading ? (
                        <div className="spinner">
                            <span>Suche nach Spielern...</span>
                            <div className="half-spinner"></div>
                        </div>
                    ) : (
                        <div className="completed">&#x2713;</div>
                    )}
                </>
            ) : (
                navigate("/game")
            )}
        </>
    );
}

