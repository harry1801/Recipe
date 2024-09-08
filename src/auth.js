import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

// auth.js
const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookies] = useCookies("access_token");
    
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { username, password });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form 
            formTitle="Login" 
            username={username} 
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit} 
        />
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registration completed. Login now!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form 
            formTitle="Register" 
            username={username} 
            setUsername={setUsername}
            password={password}
            setPassword={setPassword} 
            onSubmit={onSubmit}
        />
    );
};

// Destructuring the props in Form component
const Form = ({ formTitle, username, setUsername, password, setPassword, onSubmit }) => {
    // Unique IDs for the input fields
    const usernameId = `${formTitle.toLowerCase()}-username`;
    const passwordId = `${formTitle.toLowerCase()}-password`;

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{formTitle}</h2>
                <div className="form-group">
                    <label htmlFor={usernameId}>Username:</label>
                    <input
                        type="text"
                        id={usernameId}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={passwordId}>Password:</label>
                    <input
                        type="password"
                        id={passwordId}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{formTitle}</button>
            </form>
        </div>
    );
};

export default Auth;
