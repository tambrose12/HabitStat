import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Button } from "@mui/material";

const UserProfile = () => {
    const { user, setUser } = useContext(UserContext)

    const [formData, setFormData] = useState(user)

    const { username, image, password } = formData

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(formData => (
            { ...formData, [name]: value }));
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`/user/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                image: formData.image
            })
        })
            .then(r => r.json())
            .then(updatedUser => setUser(updatedUser))
        window.alert("Driver Updated")
        e.target.reset()
    }

    return (
        <div>
            <div className="formDiv">
                <form onSubmit={handleSubmit} >
                    <label for="username"> Username: </label>
                    <input onChange={handleChange} type="text" name="username" value={user.username} />
                    <label for="image"> Enter Image URL: </label>
                    <input onChange={handleChange} type="text" name="image" value={user.image} />
                    <Button variant='outlined' type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )

}

export default UserProfile