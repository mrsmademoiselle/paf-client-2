import React from 'react';
import TopNav from '../components/TopNav';
import Banner from '../components/Banner';
import {useAtom} from '@dbeining/react-atom';
import {bannerState} from '../states/UserStates';

export default function MainLayout(children: any): React.ReactElement {


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