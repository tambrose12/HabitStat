import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';




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
                    // Cookies.set('user', user.id, { expires: 7 })

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
        <div className='Login'>
            <h1>Welcome to HabitStat!</h1>
            <h2>LogIn</h2>
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
            <h2>New to Habitstat?</h2>
            <h2>Create an Account for Free!</h2>
            <Button variant='contained' color='success' onClick={handleSignUpClick} >Sign Up</Button>
        </div>
    )
}

export default Login;