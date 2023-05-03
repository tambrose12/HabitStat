import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Root } from "./landings";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";


function SignUp({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [modalOpen, setModalOpen] = useState(false);

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <br />
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <br />
                <label htmlFor="password">Password Confirmation</label>
                <br />
                <input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
                <br />

                <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            </form>
            {/* 
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
            >
                <div>
                    <h2>Username taken. Please try another username.</h2>
                    <Button onClick={() => setModalOpen(false)} variant="outlined">
                        Back to SignUp
                    </Button>

                </div>
            </Modal> */}

        </div>
    );
}

export default SignUp;