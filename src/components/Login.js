import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//axios is used to connect frontend with backend
import axios from "axios";

//LOGIN PAGE
export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //useNavigate is used to navigate pages
    const history = useNavigate();

    //Confirm submit functionality in log in
    async function submit(e) {
        e.preventDefault();
        try {
            //connect to login in backend and send email and password... in backend res.body with destructure it
            await axios.post('http://localhost:8000/login', {
                email, password
            })
                //response send from backend
                .then(res => {
                    //after user exist and password matching
                    if (res.data.user === 'exist') {
                        //get the email
                        const email = res.data.email;
                        //localStorage is a memory to keep signed in... we are passing email
                        localStorage.setItem('email', email);
                        //refer to home page where history and bookmarked will be displayed 
                        history('/')
                    }
                    else {
                        //wrong password or user not signed in
                        alert("Wrong credentials")
                    }
                })
                .catch(e => {
                    //in case of error
                    alert("Wrong details")
                })
        }
        catch (e) {
            alert("Error Occured... Try Again!!")
        }
    }


    //register functionality in sign up
    async function register(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/signup', {
                email, password
            })
                .then(res => {
                    if (res.data === 'exist') {
                        alert("User already exsist")
                    }
                    else {
                        const email = res.data.email;
                        localStorage.setItem('email', email);
                        history('/')
                    }
                })
                .catch(e => {
                    alert("Wrong details")
                })
        }
        catch (e) {
            alert("Error Occured.... Try Again!!")
        }
    }
    return (
        <div className="container" style={{ marginLeft: '28%', marginTop: '15%', width: '92%' }}>
            < div style={{ paddingBottom: '20px', color: '', fontFamily: 'cursive' }}><h1>NewDay-News</h1></div>


            <div className="container" style={{ backgroundColor: 'blue', textAlign: 'center', border: '4px dashed red' }}>
                {/* Signup and Login title */}
                {props.signup === false ? <div style={{ paddingBottom: '20px', color: 'white' }}><h2>Login Form</h2></div>
                    :
                    <div style={{ paddingBottom: '20px', color: 'white' }}><h2>Signup Form</h2></div>}
                <form className="row g-3" action="POST" style={{ backgroundColor: 'pink', border: '3px solid' }}>
                    <div className="col-auto" style={{ paddingLeft: '18%' }}>
                        <label htmlFor="staticEmail2">
                            <h4>Email</h4>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail2"
                            placeholder="email@example.com"
                            style={{ width: '300px', border: '2px solid red' }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="inputPassword2">
                            <h4>Password</h4>
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword2"
                            placeholder="Password"
                            style={{ width: '300px', border: '2px dotted red' }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div >
                        {/* Signup and Login button */}
                        {props.signup === false ?
                            <button type="submit" className="btn btn-success" style={{ border: '3px solid black' }} onClick={submit}>
                                Submit
                            </button> :
                            <button type="submit" className="btn btn-success" style={{ border: '3px solid black' }} onClick={register}>
                                Register
                            </button>}
                    </div>
                    <br />
                    {/* Signup and Login swipe */}
                    {props.signup === false ?
                        <div style={{ marginBottom: '10px' }}>
                            <p><b>OR</b></p>
                            <p><b>FOR NEW ACCOUNT &darr;</b></p>
                            <Link to="/signup" style={{ color: 'black', fontSize: '15px' }}><b>Signup</b></Link>
                        </div> :
                        <div style={{ marginBottom: '10px' }}>
                            <p><b>OR</b></p>
                            <p><b>FOR OLD ACCOUNT &darr;</b></p>
                            <Link to="/login" style={{ color: 'black', fontSize: '15px' }}><b>Login</b></Link>
                        </div>}
                </form>
            </div>
        </div>
    );
}
