import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import {auth, provider} from './firebase';
function Login() {
    const signIn = () => {
        //DIFFFERENT
        auth.signInWithPopup(provider).catch(error =>{
            alert(error.message);
        })
    }
    return (
        <div className = 'login'>
            <div className="login_border">
                <img src = "https://images.macrumors.com/t/hsvUvPYcxyJnDTzHzXEBUZowMOA=/1200x1200/smart/article-new/2018/06/imessage-logo.jpg" alt = "" 
                />
                <div className="login_info">
                    <h2>Log in to iMessage</h2>
                </div>
                <Button type = 'submit' onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
