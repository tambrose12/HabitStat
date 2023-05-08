import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import NavButton from "./NavButton";
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { UserContext } from "./context/user";


function SignUp({ }) {
    const { user, setUser } = useContext(UserContext)
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
            .then(user => {
                setUser(user)
            })

        navigate('/')
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar color="primary" sx={{ display: "flex", flexDirection: "row", justifyContent: "content-distribution" }}>

                    <div id="header">
                        <h1> HabitStat </h1><TrendingUpIcon fontSize='large' />
                    </div>

                </Toolbar>
            </AppBar>
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
        </div>

    );
}

export default SignUp;