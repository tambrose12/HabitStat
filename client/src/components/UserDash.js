import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Navigate } from "react-router-dom";
import Charts from "./Charts";
import TempDrawer from "./TempDrawer";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from "react-modal";
import { Button } from "@mui/material";




const UserDash = ({ removeStat, stats }) => {
	const { user, setUser } = useContext(UserContext)
	const [modalOpen, setModalOpen] = useState(false);


	let habitStats = user.habitstats

	const [newAmount, setNewAmount] = useState(user.habitstats.amount)



	if (user === null) {
		return <Navigate replace to='/login' />
	} else {

		const handleDelete = (id) => {
			fetch(`/stats/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
				.then(r => r.json)
				.then(removeStat)
			window.alert("Habit removed from list")
		}





		let habitNames = habitStats.map(s => s.habit.name)

		const uniqueStats = [...new Map(habitStats.map((h) => [h.name, h])).values()];


		const handleChange = e => {
			const { value } = e.target
			setNewAmount(e.target.value)
		}

		// const addProgress = (e) => {
		// 	e.preventDefault()

		// 	fetch(`/stats/${stats.id}`, {
		// 		method: 'PATCH',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify({
		// 			amount: newAmount
		// 		})
		// 	})
		// 		.then(r => r.json)
		// 		.then(updatedStats => setUser({ ...user, user.habitstats }))

		// }

		const userHabitStats = habitStats.map((s) => {

			return (
				<TableRow key={s.id}>
					<TableCell> <button onClick={() => handleDelete(s.id)}><DeleteIcon fontSize="small" /></button>  {s.habit.name}</TableCell>
					<TableCell>{s.habit.category}</TableCell>
					<TableCell>{s.habit.goal} </TableCell>
					<TableCell align="right" value={s.amount}>{s.amount} <button className='addBtn' onClick={() => setModalOpen(true)}><AddIcon /></button></TableCell>
				</TableRow>
			)
		})


		console.log(habitStats)
		if (habitStats === null) {
			return (
				<div>
					<h2>Hello, {user.username}!</h2>
					<img className="userImage" src={user.image} alt={user.username} />
					<h3>Check out the menu and start adding some Habit Goals to your list!</h3>
				</div>
			)
		} else if (habitStats === []) {
			return (
				<div>
					<h2>Hello, {user.username}!</h2>
					<img className="userImage" src={user.image} alt={user.username} />
					<h3>Check out the menu and start adding some Habit Goals to your list!</h3>
				</div>
			)
		} else {
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
					<Modal
						isOpen={modalOpen}
						onRequestClose={() => setModalOpen(false)}

					>
						<div className='Login'>
							{/* onSubmit={addProgress} */}
							<form >
								<label for="car_number"> Enter Progress: </label>
								<br />
								<input onChange={handleChange} type="number" name="amount" value={newAmount} />
								<br />
								<Button variant='outlined' type="submit">Submit Progress</Button>
							</form>
							<br />
							<Button variant='outlined' onClick={() => setModalOpen(false)} >
								Close Update Form
							</Button>
						</div>
					</Modal>

				</div>
			);
		}


	}
};

export default UserDash;