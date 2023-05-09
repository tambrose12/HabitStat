import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import TempDrawer from "./TempDrawer";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from "react-modal";
import { Button } from "@mui/material";
import { StatsContext } from './context/stats';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Card, CardMedia, CardContent, Typography } from "@mui/material";



const UserDash = ({ }) => {
	const { user, setUser } = useContext(UserContext)
	const { stats, setStats } = useContext(StatsContext)
	const [modalOpen, setModalOpen] = useState(false);
	const [thisStat, setThisStat] = useState('')
	// const [quotes, setQuotes] = useState([])
	// const [randomQuote, setRandomQuote] = useState('')


	let habitStats = user.habitstats

	// useEffect(() => {
	// 	fetch("https://type.fit/api/quotes")
	// 		.then(function (response) {
	// 			return response.json();
	// 		})
	// 		.then(function (data) {
	// 			setQuotes(data);
	// 		})
	// }, [])


	// const randomizeQuotes = (array) => {
	// 	return array[Math.floor(Math.random() * array.length)]
	// }

	// let randomQuote = randomizeQuotes(quotes)
	// console.log(randomizeQuotes(quotes).text)
	// setRandomQuote(randomizeQuotes(quotes))

	const removeStatfromState = (deleteStatId) => {
		setStats(stats => stats.filter(stat => {
			return stat.id != deleteStatId
		}))
	}

	const handleDelete = (id) => {
		fetch(`/stats/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(r => r.json().then(console.log(r)))
			.then(removeStatfromState(id))
		const updatedHabitStats = habitStats.filter((stat) => {
			return stat.id != id
		})
		// const updatedHabits = habits.filter((habit) => {
		// 	return habit.habitstats.id != id
		// })
		// setUser({ ...user, habitstats: updatedHabitStats, habits: updatedHabits })
		setUser({ ...user, habitstats: updatedHabitStats })
		window.alert("Habit removed from list")

	}

	// let habitNames = habitStats.map(s => s.habit.name)

	const uniqueStats = [...new Map(habitStats.map((h) => [h.name, h])).values()];


	const handleModalOpen = (aStat) => {
		setModalOpen(true)
		setThisStat(aStat)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setThisStat(thisStat => ({ ...thisStat, [name]: value }))
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newStat = {
			amount: parseInt(thisStat.amount),
			user_id: user.id,
			habit_id: thisStat.habit.id
		}

		function handleErrors(response) {
			if (!response.ok) {
				window.alert("Error: Ensure field is valid. Cannot exceed 100.");
				throw Error(response.statusText)
			}
			return response.json();
		}

		fetch(`/stats/${thisStat.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newStat)
		})
			.then(handleErrors)
			.then(updatedStat => {
				setThisStat(updatedStat)
				const updatedHabitStats = habitStats.map((stat) => {
					if (stat.id === thisStat.id) {
						return updatedStat
					} else {
						return stat
					}
				})
				setUser({ ...user, habitstats: updatedHabitStats })
			})
		setModalOpen(false)


	}

	const tableRows = habitStats.map((stat) => {

		return (
			<TableRow key={stat.id} sx={{ maxWidth: 800 }} size="small" aria-label="a dense table">
				<TableCell><button onClick={() => handleDelete(stat.id)} className='deleteBtn'><DeleteIcon fontSize="small" /></button></TableCell>
				<TableCell>{stat.habit.name}</TableCell>
				<TableCell align="right">{stat.habit.category}</TableCell>
				<TableCell align="right">{stat.habit.goal} </TableCell>
				<TableCell align="right" value={stat.amount}>{stat.amount} </TableCell>
				<TableCell> <button className='addBtn' onClick={() => handleModalOpen(stat)}><AddIcon /></button> </TableCell>
			</TableRow>
		)
	})


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
			<Box bgcolor='background.default' height="100vh">
				<TempDrawer />
				<Box className="mainDiv" bgcolor='background.default'>
					{/* <div className="topDiv"> */}
					{/* <div className="topLeft"> */}
					<Typography variant="h5" color='text.primary' margin='20px'> Hello, {user.username}! </Typography>
					<img className="userImage" src={user.image} alt={user.username} />
					<Typography variant="p" color='text.primary' margin='20px'> Welcome to your Dashboard! </Typography>
					<Typography variant="p" color='text.primary' margin='20px'> Click the Menu to find the option to add habits to your list of goals. </Typography>
					{/* </div> */}
					{/* <div className="topRight">
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
										<Typography gutterBottom variant="h6" component="div">
											{/* {randomQuote.text} */}
					{/* </Typography>
										<Typography variant="body2" color="text.secondary">
											{/* -{randomQuote.author} */}
					{/* </Typography>
									</CardContent>
								</Card>
							</Box>
						</div> */}
					{/* </div> */}
					<Typography variant="h5" color='text.primary' marginTop='20px'> Your Habit Goals: </Typography>
					<br />
					<TableContainer sx={{ display: "grid", justifyContent: "center", textAlign: "center" }}>
						<Table sx={{ maxWidth: 900, justifyContent: "center", textAlign: "center" }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ maxWidth: 10 }}> </TableCell>
									<TableCell sx={{ fontWeight: 'bold' }} >Habit</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }} align="right">Category</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }} align="right">Goal</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }} align="right">Progress</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}> Add Progress</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableRows}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					<Modal
						ariaHideApp={false}
						isOpen={modalOpen}
						onRequestClose={() => setModalOpen(false)}
						size="xs"
					>
						<div className='Login'>

							<form onSubmit={handleSubmit}>

								<TextField
									label='Edit Progress'
									variant='outlined'
									onChange={handleChange}
									name="amount"
									id="amount"
									type="number"
									value={thisStat.amount}
									sx={{ margin: 1 }}
								/>
								<br />
								<Box textAlign="center">
									<Button variant='contained' sx={{ marginTop: 2 }} type="submit">Submit Progress Change</Button>
								</Box>
							</form>
							<br />
							<Button variant='contained' color="secondary" sx={{ marginTop: 10 }} onClick={() => setModalOpen(false)} >
								Close Form
							</Button>
						</div>
					</Modal>


				</Box>
			</Box>
		);
	}


}

export default UserDash;