import React, {useEffect, useState} from "react";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styling/css/history.css';
import {HttpConnector} from "../services/HttpConnector";

export default function History() {
    //States
    const [loadedData, setloadedData] = useState<any>({
        "losses": "",
        "wins": "",
        "totalGames": "",
        "averageMoves": ""
    });



    useEffect(()=>{
        // Abholen der Historiedaten
        let data: Promise<Response> = HttpConnector.get("user/history");
        data.then(
            (d:any) => {
                d.json().then((d:any) => setloadedData({
                    "losses" : d.losses,
                    "averageMoves" : d.averageMoves,
                    "wins" : d.wins,
                    "totalGames" : d.totalGames,
                })
            )}
        ).catch(
            (reason:any) => console.log(reason)
        );
    }, [])

    console.log(loadedData)
    return (
        <MainLoggedInLayout>
            <Container>
                <Row>
                    Spielhistorie
                    <hr/>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Row className={"textBlock"}>
                            <Col>
                                <p>Spiele gesamt: </p>
                                <p>Davon gewonnen: </p>
                                <p>Davon verloren: </p>
                                <p>Durchschnittliche Punktzayhl: </p>
                            </Col>
                            <Col>
                                <p>{loadedData.totalGames}</p>
                                <p>{loadedData.wins}</p>
                                <p>{loadedData.losses}</p>
                                <p>{loadedData.averageMoves}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </MainLoggedInLayout>
    )
}