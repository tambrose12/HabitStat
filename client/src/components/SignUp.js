import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Root } from "./landings";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import NavButton from "./NavButton";


function SignUp({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    function handleErrors(response) {
        if (!response.ok) {
            navigate("/signup")
            window.alert("Username taken, please try another username.")
            // setModalOpen(true)

            navigate("/signup")
            throw Error(response.statusText)
        }
        return response.json();
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
            .then(handleErrors)
            .then(setIsLoading(false))

        navigate('/userdash')
    }


    return (
        <div className='Login'>
            <h1>Welcome to HabitStat!</h1>
            <h2>Create An Account</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ margin: 1 }}
                />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    sx={{ margin: 1 }}
                />
                <br />
                <TextField
                    label="Confirm Password"
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                    sx={{ margin: 1 }}
                />
                <br />
                <Box textAlign='center'>
                    <Button variant='contained' sx={{ margin: 1 }} color="success" type='submit'>{isLoading ? "Loading..." : "Sign Up"}</Button>
                </Box>
            </form>
            <Box >
                <NavButton text="Back to LogIn" />
            </Box>

        </div>
    );
}

export default SignUp;