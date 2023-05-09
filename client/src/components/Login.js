import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Typography } from "@mui/material";




const Login = ({ }) => {

    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user))

                } else {
                    r.json().then((err) => console.log(err));
                    window.alert("Invalid username or password")
                }
            });

        // navigate('/userdash')
        if (user) {
            return <Navigate replace to="/userdash" />
        }

    }

    const handleSignUpClick = () => {
        navigate('/signup')
    }

    return (
        <Box className='Login' bgcolor='background.default' height="100vh">
            <Typography variant="h4" color='text.primary' margin='20px'> Welcome to HabitStat! </Typography>
            <Typography variant="h5" color='text.primary' margin='20px'> LogIn </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Username'
                    variant='outlined'
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    id="username"
                    type="text"
                    value={username}
                    sx={{ margin: 1 }}
                />
                <br />
                <TextField
                    label='Password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    sx={{ margin: 1 }}

                />
                <br />
                <br />
                <Box textAlign='center'>
                    <Button variant='contained' type='submit'>Log In</Button>
                </Box>

            </form>
            <br />
            <Typography variant="h5" color='text.primary' margin='20px'> New to HabitStat? </Typography>
            <Typography variant="h5" color='text.primary' margin='20px'> Create an Account for Free </Typography>
            <Button variant='contained' color='success' onClick={handleSignUpClick} >Sign Up</Button>
        </Box>
    )
}

export default Login;