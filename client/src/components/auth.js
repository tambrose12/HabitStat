import { useState } from 'react'
import NavButton from './NavButton'


export const SignUp = () => {
    const [form, setForm] = useState({})

    const updateForm = ({ target: { name, value } }) => {
        setForm(form => ({ ...form, [name]: value }))
    }

    const attemptSignup = e => {
        e.preventDefault()
        const body = JSON.stringify(form)
        console.log("Ready to post:", body)
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={attemptSignup}>
                username: <input onChange={updateForm} name="username" />
                password: <input onChange={updateForm} name="password" />
                confirm password: <input onChange={updateForm} name="confirm" />
                <input type='Submit' />
            </form>
            <NavButton />
        </>
    )
}

