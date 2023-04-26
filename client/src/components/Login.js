import { useState } from 'react'
import NavButton from './NavButton'

const Login = ({ onLogin }) => {
    // const [form, setForm] = useState({})

    // const updateForm = ({ target: { name, value } }) => {
    //     setForm(form => ({ ...form, [name]: value }))
    // }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
                } else {
                    r.json().then((err) => console.log(err));
                }
            });
    }

    return (
        <>
            <h1>LogIn</h1>
            <form onSubmit={handleSubmit}>
                username: <input onChange={setUsername} name="username" />
                password: <input onChange={setPassword} name="password" />
                <button type='submit'>Log In</button>
            </form>
            <br />
            New to Habitstat?
            <NavButton path='/signup' text='Sign Up' />
        </>
    )
}

export default Login;