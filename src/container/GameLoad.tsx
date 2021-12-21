import React, {useEffect, useState} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import {Container,Row,Col} from "react-bootstrap";
import ReactLoading from "react-loading"
import LoadingComponent from "../components/LoadingComponent";
import {useNavigate} from "react-router-dom";
import '../styling/css/Loadinganimation.css';


export default function GameLoad(){
    let navigate = useNavigate()

    /* Bimmde hier Spielladedinge maken*/
    /*
     TODO: - Wenn der User auf die Seite geht, anzeigen der Animation+text da snach
       spielern gesucht wird
     - Oeffnen eines Sockets zum server
     - sobald server signal sendet das ein weitere spieler da ist, daten emfpangen
     - ggf. speichern im state
     - weiterleiten an game
    * */

    /*States*/
    const [isLoading, setLoading] = useState<boolean | undefined>(true);
    const [data, setData] = useState<boolean | undefined>(undefined);


   useEffect(() =>{
       fetch("https://swapi.dev/api/people/1")
           .then((response) => response.json())
           .then((json) => {
               console.log(json);
               setData(json);
               // ^bis hier Socketdinge
               //setLoading(false);
           })
       }
   , [])



        return(
        <MainLoggedInLayout>
            <Container>
                {/* Textblock */}
                <Row >
                    <Col style={{marginTop:'10%'}}>
                        Foobar Gameload
                    </Col>
                </Row>
                {/* Animationsblock */}
                <Row>
                    <Col/>
                    <Col>
                        {isLoading ?  (
                            <> Suche nach Spielern
                                <ReactLoading className="reactLoader" type={"spokes"} color={"grey"} width={"100px"} />
                            </>)
                            :
                            (<>{navigate("/game")}</>)
                        }
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}