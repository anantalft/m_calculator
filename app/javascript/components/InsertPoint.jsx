import React, {useState} from 'react';
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button";
import {Toast} from "react-bootstrap";


const InsertPoint = ({ children }) => {
    const [show, toggleShow] = useState(false);

    return (
        <>
            {!show && <Button class="btn btn-primary"  onClick={() => toggleShow(true)}>Start</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">Insert points</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

export default InsertPoint
