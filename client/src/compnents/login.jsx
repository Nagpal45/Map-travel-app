import React, { useRef, useState } from 'react'
import "./login.css";
import { Cancel, Room } from '@material-ui/icons';
import axios from "axios";

export default function Login({setShowLogin,myStorage, setCurrentUser}) {
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const res = await axios.post("/users/login", User);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setFailure(false);
        } catch (error) {
            setFailure(true);
        }
    }   


  return (
    <div className='loginContainer'>
        <div className="logo">
            <Room className="logoIcon" />
            TravelPin
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="loginButton">Login</button>
                {failure &&(
                <span className="failure">Something went wrong!</span>)}
            </form>
            <Cancel className="loginCancel" onClick={()=> setShowLogin(false)}/>
        </div>
    </div>
  )
}
