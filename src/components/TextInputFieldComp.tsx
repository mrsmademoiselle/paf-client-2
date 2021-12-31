import React, {useState} from 'react';
import Form from "react-bootstrap/Form";


export default function TextInputFieldComp(props: any) {
    /*Textinputfield Component fuer Formulare mit Inputvalidierung
    * Wurde erstellt um das rerendern von anderen Komponenten zu Kapseln
    * */

    //states
    //regex
    const [liveText, setLiveText] = useState("");
    const [inputs, setInputs] = useState({username: '', password: ''});

    const checkPW = (val: string) => {
        if (/\W/.test(val)) {
            setLiveText("Darf nur alphanumerische Zeichen haben");
        } else {
            setLiveText("");
        }
    }

    const checkUserName = (val: string) => {
        if (val.length <= 0) {
            setLiveText("Der Benutzername darf nicht leer sein");
        } else if (/\s/.test(val)) {
            setLiveText("Der Benutzername darf keine Leerzeichen enthalten");
        } else {
            setLiveText("");
        }
    }

    const adjustInput = (e: any) => {
        const val = e.target.value;
        if (props.variant === 'password') {
            checkPW(val);
        }
        if (props.variant === 'text') {
            checkUserName(val);
        }

        setInputs({
            ...inputs,
            [e.target.name]: val
        })

        props.onChange(val)
    }

    return (
        <>
            {/* Inputfeld */}
            <Form.Group className="mb-3">
                <div className="text-danger">{liveText}</div>
                <Form.Control type={props.variant} placeholder={props.placeholder} name="input" onChange={adjustInput}
                              required>
                </Form.Control>
            </Form.Group>
        </>
    );
}