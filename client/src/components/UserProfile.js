import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Button } from "@mui/material";
import TempDrawer from "./TempDrawer";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
                <img className="userImage3" src={user.image} alt={user.username} />
                <br />
                <h2>Editable user information:
                </h2>
                <form onSubmit={handleSubmit} >
                    <br />
                    <TextField
                        label='Username'
                        variant='outlined'
                        onChange={handleChange}
                        name="username"
                        id="username"
                        type="text"
                        value={username}
                        sx={{ margin: 1 }}
                    />
                    <br />
                    <TextField
                        label='Image URL'
                        variant='outlined'
                        onChange={handleChange}
                        name="image"
                        id="image"
                        type="text"
                        value={image}
                        sx={{ margin: 1 }}
                    />
                    <br />
                    <Box textAlign='center'>
                        <Button variant='contained' type="submit">Submit Changes</Button>
                    </Box>


                </form>
            </div>
        </div>
    )

}

export default UserProfile