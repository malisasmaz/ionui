import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./homepage.css";

export default function HomePage() {
    let history = useHistory();
    const [info, setInfo] = useState({ userName: "", status: "", isLoading: false })

    useEffect(() => {
        setInfo({ ...info, userName: localStorage.getItem('UserName') });
        setStatus();
    }, []);

    const setStatus = () => {
        if (localStorage.getItem('UserName')) {
            setInfo({ ...info, status: `"${localStorage.getItem('UserName')}" is Logged in` });
        }
        else {
            setInfo({ ...info, status: `Not logged in` });
        }
    }

    const postData = async () => {
        setInfo({ ...info, isLoading: true });

        if (!localStorage.getItem('UserName')) {
            alert(`You are not logged in. You need to log in firstly.`);
            history.push('/login');
            return;
        }

        await
            axios({
                method: "post",
                url: process.env.REACT_APP_API_PATH + `/logout`,
                timeout: 5000,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userName: info.userName
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        alert("Logout Successful!")
                        localStorage.clear();
                        history.push('/');
                    }
                    else {
                        console.error(response.data.errorMessage);
                        alert(response.data.errorMessage);
                    }
                }).catch(error => {
                    alert(error);
                    console.log(error);
                    setInfo({ ...info, isLoading: false });
                });
    };

    return (
        <div>
            <div className='status_text'>
                {info.status}
            </div>
            <h1>Private Section!</h1>
            <button className='button_logout' disabled={info.isLoading} onClick={() => postData()}>{info.isLoading ? "Loading..." : "Logout"}</button>
        </div>
    )
}
