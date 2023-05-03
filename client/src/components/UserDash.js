import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Navigate } from "react-router-dom";
import Charts from "./Charts";
import TempDrawer from "./TempDrawer";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';




const UserDash = ({ removeStat }) => {
	const { user } = useContext(UserContext)

	// const [newAmount, setNewAmount] = useState(0)
	const [statId, setStatId] = useState('')


	if (user === null) {
		return <Navigate replace to='/login' />
	} else {

		// const renderUnits = () => {
		// 	if (user.habits.name == "Water Intake") {
		// 		return 'cups'
		// 	} else if (user.habits.category == 'exercise') {
		// 		return 'minutes'
		// 	}
		// }

		const handleDelete = (id) => {
			fetch(`/stats/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
				.then(r => r.json)
				.then(removeStat)
			window.alert("Habit removed from list")
		}



		let habitStats = user.habitstats
		console.log(habitStats)
		let habitNames = habitStats.map(s => s.habit.name)
		console.log(habitNames)
		const uniqueStats = [...new Map(habitStats.map((h) => [h.name, h])).values()];

		const addProgress = (e, id) => {

			let newAmount = e.target.value += 1

			fetch(`/stats/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: newAmount
				})
			})
				.then(r => r.json)
				.then()

		}

		const userHabitStats = habitStats.map((s) => {
			// setNewAmount(s.amount)

			return (
				<TableRow key={s.id}>
					<TableCell> <button onClick={() => handleDelete(s.id)}><DeleteIcon fontSize="small" /></button>  {s.habit.name}</TableCell>
					<TableCell>{s.habit.category}</TableCell>
					<TableCell>{s.habit.goal} </TableCell>
					<TableCell align="right" value={s.amount}>{s.amount} <button className='addBtn' onClick={() => addProgress(s.id)}><AddIcon /></button></TableCell>
				</TableRow>
			)
		})


		// let habits = user.habits

		// const uniqueHabits = [...new Map(habits.map((h) => [h.name, h])).values()];
		// const today = new Date()
		// let currentDate = today.toJSON().slice(0, 10)

		// const userHabits = uniqueHabits.map((habit) => {

		// 	return (
		// 		<TableRow key={habit.id}>
		// 			<TableCell> <button onClick={() => handleDelete()}><DeleteIcon fontSize="small" /></button>  {habit.name}</TableCell>
		// 			<TableCell>{habit.category}</TableCell>
		// 			<TableCell>{habit.goal} </TableCell>
		// 			{/* <TableCell>{todayStats.amount}</TableCell> */}
		// 		</TableRow>
		// 	)
		// })

		return (
			<div>
				<TempDrawer />
				<h2>Hello, {user.username}!</h2>
				<img className="userImage" src={user.image} alt={user.username} />
				<p>Welcome to your Dashboard</p>
				<h3>Your Habit Goals:</h3>
				<TableContainer>
					<Table sx={{ maxWidth: 600 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Habit</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Goal</TableCell>
								<TableCell>Progress</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userHabitStats}
						</TableBody>
					</Table>
				</TableContainer>
				<br />


			</div>
		);
	}
};

export default UserDash;