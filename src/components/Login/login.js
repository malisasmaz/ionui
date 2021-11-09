import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { handleValidation } from "../../Utils/utils";
import "./login.css";

export default function Login() {

    const [info, setInfo] = useState({ userName: "", password: "", status: "", isLoading: false });

    let history = useHistory();

    useEffect(() => {
        setInfo({ ...info, userName: localStorage.getItem('UserName') });
        handleStatus();
    }, [info.isLoading]);

    const handleStatus = () => {
        if (localStorage.getItem('UserName')) {
            setInfo({ ...info, status: `"${localStorage.getItem('UserName')}" is Logged in` });
        }
        else {
            setInfo({ ...info, status: `Not logged in` });
        }
    }

    const postData = async () => {
        setInfo({ ...info, isLoading: true });

        if (localStorage.getItem('UserName')) {
            alert(`You already logged in as "${localStorage.getItem('UserName')}" \nYou must logout first to login with a different user.`);
            history.push('/homepage');
            return;
        }

        if (handleValidation(info)) {
            axios({
                method: "post",
                url: process.env.REACT_APP_API_PATH + `/login`,
                timeout: 5000,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userName: info.userName,
                    password: info.password
                }
            }).then((response) => {
                if (response.data.success) {
                    alert("Login Successful!")
                    localStorage.setItem('UserName', info.userName);
                    history.push('/homepage');
                }
                else {
                    console.error(response.data.errorMessage);
                    alert(response.data.errorMessage);
                }
                handleStatus();
            }).catch(error => {
                alert(error);
                console.log(error);
                setInfo({ ...info, isLoading: false });
            });
        } else {
            setInfo({ ...info, isLoading: false });
        }
    };

    const redirectToWelcomePage = () => {
        history.push('/')
    };

    return (
        <div>
            <div className='status_text'>
                {info.status}
            </div>
            <table className='table_create'>
                <thead>
                    <tr className="tr_create">
                        <td className="td_create" colSpan="6">
                            <h2 className="h2_create">Login</h2>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tr_create">
                        <td className="td_create" colSpan='2'>
                            <label>Username</label>
                            <input
                                placeholder='Username'
                                onChange={(e) => setInfo({ ...info, userName: e.target.value })}
                            >
                            </input>
                        </td>
                    </tr>
                    <tr className="tr_create">
                        <td className="td_create" colSpan='2'>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}  >
                            </input>
                        </td>
                    </tr>
                    <tr className="tr_create">
                        <td className="td_create">
                            <button className='button_submit' type='submit' disabled={info.isLoading} onClick={() => postData()}>{info.isLoading ? "Loading..." : "Submit"}</button>
                        </td>
                        <td className="td_create">
                            <button className='button_cancel' onClick={redirectToWelcomePage}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
