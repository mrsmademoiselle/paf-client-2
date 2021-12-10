import React from "react";
import { UserAuthService } from "../services/UserAuthService";
import MainLayout from '../layouts/MainLayout';
import {Link, useNavigate} from "react-router-dom";

export default function Dashboard(): React.ReactElement {
    let navigate = useNavigate();
    let response = UserAuthService.check()
    console.log(response);

    return (
	<MainLayout>
            <div>Ich bin ein protected Dashboard</div>
	</MainLayout>
    );
}
