import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const HabitsCard = ({ habit, addStat }) => {

    const { user } = useContext(UserContext)

    const [newAmount, setNewAmount] = useState(0)
    const [newUserId, setNewUserId] = useState(user.id)
    const [newHabitId, setNewHabitId] = useState(habit.id)
    const [addButton, setAddButton] = useState(true)




    // const toggleAddButton = () => {
    //     setAddButton(false)
    // }

    const handleAdd = (e) => {
        e.preventDefault()

        if (addButton === false) {
            window.alert("This Habit is already on your list.")
        } else {
            const newHabitStat = {
                amount: newAmount,
                user_id: newUserId,
                habit_id: newHabitId
            }

            fetch('/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newHabitStat)
            })
                .then(r => r.json)
                .then(addStat)

            setAddButton(false)
        }
    }

    // const handleClick = (e) => {
    //     setNewHabitId(e)
    //     handleAdd()
    // }

    // const renderUnits = () => {
    //     if (habit.name == "Water Intake") {
    //         return <p>cups</p>
    //     } else if (habit.name == "Take a Shower") {
    //         return ''
    //     } else {
    //         return <p>minutes</p>
    //     }
    // }

    const userHabits = user.habits
    // console.log(userHabits)
    // const uniqueHabits = [...new Map(habits.map((h) => [h.name, h])).values()];
    const userHabitNames = userHabits.map((h) => h.name)
    // console.log(userHabitNames)

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }

    // Old Ternary logic
    // containsObject(habit.name, userHabitNames)

    const uniqueUsers = [...new Map(habit.users.map((u) => [u.username, u])).values()];
    console.log(uniqueUsers)
    const habitUsers = uniqueUsers.map((u) => {
        return <li>{u.username}</li>
    })
    console.log(habitUsers)

    return (

        <Box>
            <Card sx={{ maxWidth: 350, minWidth: 250, padding: 5, margin: 2, maxHeight: 200, }} onClick={handleAdd}>
                <CardContent
                    sx={{
                        "@media screen and (max-width: 800px)": {
                            paddingBottom: "20px",
                            display: "flex"

                        },
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {habit.name}        <button onClick={addStat}>{containsObject(habit.name, userHabitNames) ? <FileDownloadDoneIcon sx={{ color: "#50C878" }} /> : <AddCircleOutlineIcon sx={{ color: "#0096FF" }} />}</button>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {habit.category} <br />
                        Goal: {habit.goal} <br />
                        Users Following This Goal: <ul>{habitUsers}</ul>
                    </Typography>
                </CardContent>
            </Card>
        </Box>

    )


}

export default HabitsCard;