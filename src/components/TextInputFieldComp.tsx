import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


export default function TextInputFieldComp(props:any) {
    /*Textinputfield Component fuer Formulare mit Inputvalidierung
    * Wurde erstellt um das rerendern von anderen Komponenten zu Kapseln
    * */

    //states
    //regex
    const [liveText, setLiveText] = useState("");
    const [inputs, setInputs] = useState({username: '', password: ''});

    const checkPW = (val: string) => {
        if (val.length <= 6) {
            setLiveText("too short");
        } else if (!/\d/.test(val)) {
            setLiveText("should contain numbers");
        } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)) {
            setLiveText("should at least contain one special character");
        } else {
            setLiveText("");
        }
    }

    const checkUserName = (val: string) => {
        if (val.length <= 0) {
            setLiveText("should not be empty");
        } else if (/\s/.test(val)) {
            setLiveText("should not contain spaces");
        } else {
            setLiveText("");
        }
    }

    const adjustInput = (e: any) => {
        const val = e.target.value;
        if (props.variant === 'password'){
            checkPW(val);
        }
        if (props.variant === 'text'){
            checkUserName(val);
        }
        setInputs({
            ...inputs,
            [e.target.name]: val
        })
    }

    return (
        <>
            {/* Inputfeld */}
                <Form.Group className="mb-3">
                    <div className="text-danger">{liveText}</div>
                    <Form.Control type={props.variant} placeholder={props.placeholder} name="input" onChange={adjustInput} required>
                    </Form.Control>
                </Form.Group>
        </>
    );
}