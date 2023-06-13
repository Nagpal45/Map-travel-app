import React, { useRef, useState } from 'react'
import "./register.css";
import { Cancel, Room } from '@material-ui/icons';
import axios from "axios";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        try {
            await axios.post("/users/register", newUser);
            setFailure(false);
            setSuccess(true);
        } catch (error) {
            setFailure(true);
        }
    }   


  return (
    <div className='registerContainer'>
        <div className="logo">
            <Room className="logoIcon" />
            TravelPin
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="registerButton">Register</button>
                {success &&(
                <span className='success'>You can login now!!!</span>)}
                {failure &&(
                <span className="failure">Something went wrong!</span>)}
            </form>
            <Cancel className="registerCancel" onClick={()=> setShowRegister(false)}/>
        </div>
    </div>
  )
}
