import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./homepage.css";

export default function HomePage() {
    let history = useHistory();
    const [info, setInfo] = useState({ firstName: "", status: "" })

    useEffect(() => {
        setInfo({
            userName: localStorage.getItem('UserName')
        })
    }, []);

    const postData = async () => {
        setInfo({ ...info, status: "Loading..." });
        await axios.post(process.env.REACT_APP_API_PATH + `/logout`, {
            userName: info.userName
        }).then((response) => {
            if (response.data.success) {
                alert("Logout Successfull!")
                history.push('/');
            }
            else {
                console.error(response.data.errorMessage);
                alert(response.data.errorMessage);
            }
        });
    };

    return (
        <div>
            <h1>Welcome "{info.userName}"</h1>
            <button className='button_logout' onClick={() => postData()}>Logout</button>
            <div>
                <h3>{info.status} </h3>
            </div>
        </div>
    )
}
