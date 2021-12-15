import React from "react";
import { UserAuthService } from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from "react-router-dom";
import {TokenManager} from '../services/TokenManager';

export default function Dashboard(): React.ReactElement {
    let navigate = useNavigate();
    UserAuthService.check().then(data => {
	if(!data){
	    TokenManager.removeToken();
	    navigate('/login');	
	}
    });


    return (
	<MainLayout>
            <div>Ich bin ein protected Dashboard</div>
            <div>Wilkommen zurück, </div>
    </MainLayout>
    );
}
