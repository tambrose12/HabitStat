import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const AddButton = (handleAdd) => {

    return (
        <button onClick={handleAdd}>
            <AddCircleOutlineIcon sx={{ color: "#0096FF" }} />
        </button>
    )
}

const CheckBtton = () => {
    return (
        <button>
            <FileDownloadDoneIcon sx={{ color: "#50C878" }} />
        </button>
    )
}


const HabitsCard = ({ habit, addStat }) => {

    const { user, setUser } = useContext(UserContext)

    const [newAmount, setNewAmount] = useState(0)
    const [newUserId, setNewUserId] = useState(user.id)
    const [newHabitId, setNewHabitId] = useState(habit.id)


    const handleAdd = (e) => {
        e.preventDefault()

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

        // containsObject(habit.name, userHabitNames)
        setUser({ ...user, habitstats: [...user.habitstats, newHabitStat] })

    }

    // const handleClick = (habit) => {
    //     addStat(stat)
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
    console.log(userHabits)
    // const uniqueHabits = [...new Map(habits.map((h) => [h.name, h])).values()];
    const userHabitNames = userHabits.map((h) => h.name)
    // console.log(userHabitNames)

    //*************************** */

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return false;
            }
        }

        return true;
    }


    // Old Ternary logic
    // containsObject(habit.name, userHabitNames)


    const uniqueUsers = [...new Map(habit.users.map((u) => [u.username, u])).values()];

    const habitUsers = uniqueUsers.map((u) => {
        return <li key={u.id}>{u.username}</li>
    })

    return (

        <Box>
            <Card sx={{ maxWidth: 350, minWidth: 350, padding: 5, margin: 2, maxHeight: 200, }} >
                <CardContent
                    sx={{
                        "@media screen and (max-width: 800px)": {
                            paddingBottom: "20px",
                            display: "flex"

                        },
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {habit.name}
                        <button onClick={handleAdd}>{containsObject(habit.name, userHabitNames) ? <AddCircleOutlineIcon sx={{ color: "#0096FF" }} /> : <FileDownloadDoneIcon sx={{ color: "#50C878" }} />}</button>
                        {/* <button onClick={handleAdd}><AddCircleOutlineIcon sx={{ color: "#0096FF" }} /></button> */}
                        {/* {containsObject(habit.name, userHabitNames) ? <AddButton handleAdd={handleAdd} /> : <CheckBtton />} */}
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