import React from 'react';
import TopNav from '../components/TopNav';
import Banner from '../components/Banner';
import {useAtom} from '@dbeining/react-atom';
import {bannerState} from '../states/UserStates';
import {useNavigate} from "react-router-dom";
import {UserAuthService} from "../services/UserAuthService";
import {TokenManager} from "../services/TokenManager";

export default function MainLayout(children: any): React.ReactElement {
    let navigate = useNavigate();
    UserAuthService.check().then(data => {
        if (!data) {
            TokenManager.removeToken();
            navigate('/login');
        }
    });

    const {variant, text, show} = useAtom(bannerState);
    let banner: React.ReactElement = (<></>);
    if (show) {
        banner = (<Banner variant={variant} text={text} show={show}/>);
    } else {
        banner = (<></>);
    }
    return (
        <div className="App">
            <TopNav/>
            {banner}
            <main>{children.children}</main>
        </div>
    );
}