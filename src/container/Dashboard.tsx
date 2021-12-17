import React from "react";
import { UserAuthService } from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from "react-router-dom";
import {TokenManager} from '../services/TokenManager';
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";

export default function Dashboard(): React.ReactElement {


    return (
	<MainLayout>
            <div>Ich bin ein protected Dashboard</div>
            <div>Wilkommen zurück, </div>
    </MainLayout>
    );
}
