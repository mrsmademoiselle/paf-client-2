import React, {useState} from "react";
import { UserAuthService } from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from "react-router-dom";
import {TokenManager} from '../services/TokenManager';
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";

export default function Dashboard(): React.ReactElement {
    //States
    const [loadedUsername, setloadedUsername] = useState();

    // gimmick: laden des Usernamens vom Server zuer begruessung
    UserAuthService.loadUsername().then(res => setloadedUsername(res))

    return (
	<MainLoggedInLayout>
            <div>Ich bin ein protected Dashboard</div>
            <div>Wilkommen zurück, {loadedUsername} </div>
            <div>Bewege Dich über das obige Menü durch das Spiel!</div>
    </MainLoggedInLayout>
    );
}
