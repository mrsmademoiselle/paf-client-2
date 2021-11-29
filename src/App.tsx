import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './css/Register.css';
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    );
}