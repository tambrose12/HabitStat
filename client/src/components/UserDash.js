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
import ProgressModal from "./ProgressModal";
import { useNavigate } from "react-router-dom";





const UserDash = ({ removeStat, stats }) => {
	const { user, setUser } = useContext(UserContext)
	const [modalOpen, setModalOpen] = useState(false);
	const [thisStat, setThisStat] = useState('')
	const [anAmount, setAnAmount] = useState(thisStat.amount)

	const navigate = useNavigate()


	if (user === null) {
		return <Navigate replace to='/login' />
	} else {

		let habitStats = user.habitstats

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


		const handleModalOpen = (aStat) => {
			setModalOpen(true)
			setThisStat(aStat)
		}

		// useEffect(() => {
		// 	fetch(`/stats/${thisStat.id}`)
		// 		.then(r => r.json())
		// 		.then(thisStat => setStat(thisStat))
		// }, [id])

		const handleChange = e => {
			setAnAmount(e.target.value)
		}

		const handleSubmit = e => {
			e.preventDefault()
			fetch(`/stats/${thisStat.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: anAmount,
					user_id: user.id,
					habit_id: thisStat.habit.id
				})
			})
				.then(r => r.json())
				.then(updatedStat => setThisStat(updatedStat))
			window.alert("Progress Updated")
			e.target.reset()
		}

		const tableRows = habitStats.map((stat) => {


			return (
				<div>
					<TableRow key={stat.id} sx={{ maxWidth: 800 }} size="small" aria-label="a dense table">
						<TableCell> <button onClick={() => handleDelete(stat.id)}><DeleteIcon fontSize="small" /></button>  {stat.habit.name}</TableCell>
						<TableCell align="right">{stat.habit.category}</TableCell>
						<TableCell align="right">{stat.habit.goal} </TableCell>
						<TableCell align="right" value={stat.amount}>{stat.amount} <button className='addBtn' onClick={() => handleModalOpen(stat)}><AddIcon /></button></TableCell>
					</TableRow>
				</div>
			)
		})

		// const modal = habitStats.map((stat) => {

		// 	return (
		// 		<div>
		// 			<ProgressModal modalOpen={modalOpen} setModalOpen={setModalOpen} stat={stat} statId={stat.Id} />
		// 		</div>
		// 	)
		// })



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
						<Table sx={{ maxWidth: 800 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>Habit</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Goal</TableCell>
									<TableCell>Progress</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableRows}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					{/* {modal} */}
					<Modal
						isOpen={modalOpen}
						onRequestClose={() => setModalOpen(false)}
					>
						<div className='Login'>
							{/* onSubmit={addProgress} */}
							<form onSubmit={handleSubmit}>
								<label for="amount"> Enter Progress: </label>
								<br />
								<input onChange={handleChange} type="number" name="amount" value={anAmount} />
								<br />
								<Button variant='outlined' sx={{ marginTop: 2 }} type="submit">Submit Progress</Button>
							</form>
							<br />
							<Button variant='outlined' sx={{ marginTop: 10 }} onClick={() => setModalOpen(false)} >
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