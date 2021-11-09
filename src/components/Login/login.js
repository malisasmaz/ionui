import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import { handleValidation } from "../../Utils/utils";
import "./login.css";

export default function Login() {

    const [info, setInfo] = useState({ userName: "", password: "", status: "" })
    let history = useHistory();

    const postData = async () => {
        if (handleValidation(info)) {
            setInfo({ status: "Loading..." });
            await axios.post(process.env.REACT_APP_API_PATH + `/login`, {
                userName: info.userName,
                password: info.password
            }).then((response) => {
                setInfo({...info, status: "" });
                if (response.data.success) {
                    alert("Login Successfull!")
                    localStorage.setItem('UserName', info.userName);
                    history.push('/homepage');
                }
                else {
                    console.error(response.data.errorMessage);
                    alert(response.data.errorMessage);
                }
            });
        }
    };

    const redirectToWelcomePage = () => {
        history.push('/')
    };

    return (
        <div>
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
                            <label>UserName</label>
                            <input
                                placeholder='UserName'
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
                            <button className='button_submit' type='submit' onClick={postData}>Submit</button>
                        </td>
                        <td className="td_create">
                            <button className='button_cancel' onClick={redirectToWelcomePage}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3>{info.status}</h3>
        </div>
    )
}
