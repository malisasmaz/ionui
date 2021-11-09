import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./welcome.css";

export default function Welcome() {
    let history = useHistory();
    const [info, setInfo] = useState({ userName: "", status: "" })

    useEffect(() => {
        setInfo({ ...info, userName: localStorage.getItem('UserName') });
        if (localStorage.getItem('UserName')) {
            setInfo({ ...info, status: `"${localStorage.getItem('UserName')}" is Logged in` });
        }
        else {
            setInfo({ ...info, status: `Not logged in` });
        }
    }, []);

    return (
        <div>
            <div className='status_text'>
                {info.status}
            </div>
            <h1>Welcome!</h1>
            <button className='button_login' onClick={() => history.push('/login')}>Login</button>
        </div >
    )
}
