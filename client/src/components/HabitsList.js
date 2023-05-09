import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import TempDrawer from "./TempDrawer"
import AddNewHabit from "./AddNewHabit";
import { Box } from '@mui/material';
import { Typography } from "@mui/material"



const HabitsList = ({ habitCard, addHabitToState }) => {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            fetch("/check_session")
                .then((response) => {
                    if (response.ok) {
                        response.json().then((user) => setUser(user))
                    }
                })
        }
    }, [])

    const renderImage = user ? <img className="userImage2" src={user.image} alt={user.username} /> : ""

    return (
        <Box bgcolor='background.default' >
            <TempDrawer />

            <Box margin='25px' className="habitListImgDiv">
                {renderImage}
            </Box>
            <Typography variant="h5" color='text.primary' margin='20px' textAlign='center'> Suggested Habits </Typography>
            <Box className="habitList">

                {habitCard}
            </Box>
            <AddNewHabit addHabitToState={addHabitToState} />
        </Box >
    )

}

export default HabitsList