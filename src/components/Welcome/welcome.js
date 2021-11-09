import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./welcome.css";

export default function Welcome() {
    let history = useHistory();
    const [info, setInfo] = useState({ userName: "" })

    useEffect(() => { setInfo({ userName: localStorage.getItem('UserName') }) }, []);

    return (
        <div>
            <h1>Welcome!</h1>
            <button className='button_login' onClick={() => history.push('/login')}>Login</button>

        </div >
    )
}
