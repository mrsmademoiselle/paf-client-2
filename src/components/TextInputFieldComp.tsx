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

    // regex check vom username
    const checkPW = (val: string) => {
        if (val.length <= 6) {
            setLiveText("Das Passwort ist zu kurz");
        } else if (!/\d/.test(val)) {
            setLiveText("Das Passwort sollte eine Zahl enthalten");
        } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)) {
            setLiveText("Das Passwort sollte mindestens ein Sonderzeichen enthalten\"");
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
        if (props.variant === 'password'){
            checkPW(val);
        }
        if (props.variant === 'text'){
            checkUserName(val);
        }

        console.log(val)
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
                    <Form.Control type={props.variant} placeholder={props.placeholder} name="input" onChange={adjustInput} required>
                    </Form.Control>
                </Form.Group>
        </>
    );
}