import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



function AddNewHabit({ addHabitToState }) {
    const [newHabitName, setNewHabitName] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newGoal, setNewGoal] = useState('')

    console.log(newCategory)
    console.log(newHabitName)
    console.log(newGoal)

    const handleSubmit = e => {
        e.preventDefault()

        const newHabit = {
            name: newHabitName,
            category: newCategory,
            goal: newGoal
        }

        function handleErrors(response) {
            if (!response.ok) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            }
            return response.json();
        }

        fetch('/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHabit)
        })
            .then(handleErrors)
            .then(addHabitToState)
            .catch(error => console.error("Validation Error: Ensure all fields are valid.", error))
        e.target.reset()
    }


    return (
        <div className="Login">
            <h3>Don't see what you are looking for?</h3>
            <h3>Add a New Habit</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Habit Name'
                    variant='outlined'
                    onChange={(e) => setNewHabitName(e.target.value)}
                    name="name"
                    id="name"
                    type="text"
                    value={newHabitName}
                    sx={{ margin: 1 }}
                />
                <br />
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    select
                    label="Category"
                    value={newCategory}
                    sx={{ width: 195 }}
                    helperText="Please select habit category."
                    onChange={(e) => setNewCategory(e.target.value)}
                >
                    <MenuItem value={'health'}>health</MenuItem>
                    <MenuItem value={'exercise'}>exercise</MenuItem>
                    <MenuItem value={'meditation'}>meditation</MenuItem>
                    <MenuItem value={'reading'}>reading</MenuItem>
                    <MenuItem value={'mental health'}>mental health</MenuItem>
                    <MenuItem value={'hygiene'}>hygiene</MenuItem>
                    <MenuItem value={'lifestyle'}>lifestyle</MenuItem>
                    <MenuItem value={'learning'}>learning</MenuItem>
                    <MenuItem value={'fun'}>fun</MenuItem>
                </Select>
                <br />
                <TextField
                    label='Goal Amount'
                    variant='outlined'
                    onChange={(e) => setNewGoal(parseInt(e.target.value))}
                    name="goal"
                    id="goal"
                    type="number"
                    min='1'
                    value={newGoal}
                    sx={{ margin: 1 }}

                />
                <br />
                <br />
                <Box textAlign='center'>
                    <Button variant='contained' type='submit'>Submit New Habit</Button>
                </Box>
            </form>
        </div>
    )

}

export default AddNewHabit;