import { useContext, useState } from 'react'
import NavButton from './NavButton'
import { useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
    // const [form, setForm] = useState({})

    // const updateForm = ({ target: { name, value } }) => {
    //     setForm(form => ({ ...form, [name]: value }))
    // }

    // const [user, setUser] = useContext(UserContext)

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
                    r.json().then((user) => onLogin(user));
                    navigate('/userdash')
                } else {
                    r.json().then((err) => console.log(err));
                    window.alert("Invalid username or password")
                }
            });


    }

    return (
        <>
            <h2>LogIn</h2>
            <form onSubmit={handleSubmit}>
                username:
                <br />
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    id="username"
                    type="text"
                    value={username}
                />
                <br />
                password:
                <br />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                />
                <br />
                <button type='submit'>Log In</button>
            </form>
            <br />
            <h2>New to Habitstat?</h2>
            <h3>Create an Account for Free!</h3>
            <NavButton path='/signup' text='Sign Up' />
        </>
    )
}

export default Login;