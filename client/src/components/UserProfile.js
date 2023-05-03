import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Button } from "@mui/material";
import TempDrawer from "./TempDrawer";

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
        window.alert("Profile Updated")
        // e.target.reset()
    }

    return (
        <div>
            <TempDrawer />
            <div className="formDiv">
                <img className="userImage" src={user.image} alt={user.username} />
                <br />
                <form onSubmit={handleSubmit} >
                    <label for="username"> Username: </label>
                    <br />
                    <input onChange={handleChange} type="text" name="username" value={username} />
                    <br />
                    <label for="image"> Enter Image URL: </label>
                    <br />
                    <input onChange={handleChange} type="text" name="image" value={image} />
                    <br />
                    <br />
                    <Button variant='outlined' type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )

}

export default UserProfile