import React, {useEffect} from "react";
import Alert from 'react-bootstrap/Alert';
import bannerStateInterface from '../states/UserStates';
import {closeBanner} from '../states/UserStates';

const BANNER_TIMEOUT: number = 5000;

export default function Banner(props: bannerStateInterface): React.ReactElement {
    useEffect(()=>{
	if(!props.show){
	    const timer = setTimeout(()=>{
		closeBanner();
	    }, BANNER_TIMEOUT);
	    return () => clearTimeout(timer);
	}
    }, []);

    let val: React.ReactElement = (<></>);
    if(!props.show){
	val = (<Alert variant={props.variant}>{props.text}</Alert>);
    }
    return (
	<>{val}</>
    )
}
