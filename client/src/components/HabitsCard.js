import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';




const HabitsCard = ({ habit, addStat }) => {

    const { user, setUser } = useContext(UserContext)



    const [newAmount, setNewAmount] = useState(0)
    const [newUserId, setNewUserId] = useState(user ? user.id : 1)
    const [newHabitId, setNewHabitId] = useState(habit.id)

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
            .then(r => r.json())
            .then(newStat => {
                addStat(newStat)
                console.log(newStat)
                setUser({ ...user, habitstats: [...user.habitstats, newStat], habits: [...user.habits, newStat.habit] })
            })



    }


    const userHabits = user ? user.habits : []

    // const uniqueHabits = [...new Map(habits.map((h) => [h.name, h])).values()];
    const userHabitNames = userHabits.map((h) => h.name)


    function containsObject(name, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === name) {
                return false;
            }
        }

        return true;
    }




    const uniqueUsers = [...new Map(habit.users.map((u) => [u.username, u])).values()];


    const habitUsers = uniqueUsers.map((u) => {
        return (
            <ListItem key={u.id} sx={{ margin: 0, color: "#2C7DA0" }}>
                <ListItemText primary={u.username} />
            </ListItem>
        )
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
                        {habit.name} <Button onClick={handleAdd}>{containsObject(habit.name, userHabitNames) ? <AddCircleOutlineIcon sx={{ color: "#0096FF" }} /> : <FileDownloadDoneIcon sx={{ color: "#50C878" }} />}</Button>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {habit.category} <br />
                        Goal: {habit.goal} <br />

                    </Typography>
                    <Typography variant="body2" sx={{ color: "#2C7DA0" }}>
                        Users Following This Goal:
                    </Typography>
                    <List dense="dense" sx={{ display: "flex", }}>
                        {habitUsers}
                    </List>
                </CardContent>
            </Card>
        </Box>

    )


}

export default HabitsCard;