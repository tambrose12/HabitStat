import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Navigate } from "react-router-dom";
import Charts from "./Charts";
import TempDrawer from "./TempDrawer";
import useSession from "./useSession";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";





const UserDash = () => {
	const { user } = useContext(UserContext)


	const mdTheme = createTheme();


	if (user == null) {
		return <Navigate replace to='/login' />
	} else {

		const renderUnits = () => {
			if (user.habits.name == "Water Intake") {
				return 'cups'
			} else if (user.habits.category == 'exercise') {
				return 'minutes'
			}
		}
		console.log(user.habits)
		let habits = user.habits
		const uniqueHabits = [...new Map(habits.map((h) => [h.name, h])).values()];
		console.log(uniqueHabits)
		const userHabits = uniqueHabits.map((habit) => {
			return (
				<TableRow key={habit.id}>
					<TableCell>{habit.name}</TableCell>
					<TableCell>{habit.category}</TableCell>
					<TableCell>{habit.goal} {renderUnits}</TableCell>
				</TableRow>
			)
		})

		return (
			<div>
				<TempDrawer />
				<h2>Hello, {user.username}!</h2>
				<p>Welcome to your Dashboard</p>
				<h3>Your Habit Goals:</h3>
				<TableContainer>
					<Table sx={{ maxWidth: 600 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Habit</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Goal</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userHabits}
						</TableBody>
					</Table>
				</TableContainer>
				<br />

				<Charts />
			</div>
		);
	}
};

export default UserDash;