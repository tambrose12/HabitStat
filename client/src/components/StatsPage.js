import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import Charts from "./Charts";
import TempDrawer from "./TempDrawer";
import { TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Modal from "react-modal"
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Button } from "@mui/material";

const StatsPage = ({ }) => {
    const { user, setUser } = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [thisStat, setThisStat] = useState('')

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

        fetch(`/history/${thisStat.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStat)
        })
            .then(r => r.json())
            .then(updatedStat => {
                setThisStat(updatedStat)
                const updatedHistoryStat = historyStat.map((stat) => {
                    if (stat.id === thisStat.id) {
                        return updatedStat
                    } else {
                        return stat
                    }
                })
                setUser({ ...user, history: updatedHistoryStat })
            })
        setModalOpen(false)


    }

    const historyStat = user ? user.history : []

    const tableRows = historyStat.map((stat) => {

        return (
            <TableRow key={stat.id} sx={{ maxWidth: 800 }} size="small" aria-label="a dense table">
                <TableCell>{stat.habit.name}</TableCell>
                <TableCell>{stat.created_at}</TableCell>
                <TableCell align="right">{stat.habit.category}</TableCell>
                <TableCell align="right">{stat.habit.goal} </TableCell>
                <TableCell align="right" value={stat.amount}>{stat.amount} <button className='addBtn' onClick={() => handleModalOpen(stat)}><AddIcon /></button></TableCell>
            </TableRow>
        )
    })


    return (
        <div>
            <TempDrawer />
            <div className="chartDiv">
                {/* {renderUserHeader} */}
                <h2>{user.username}'s Stats</h2>
                <img className="userImage2" src={user.image} alt={user.username} />
                <br />
                {/* <UserDataGrid setStats={setStats} /> */}
                <Charts />
                <br />
                <h2 className="historyHeader">Your HabitStat History</h2>
                <br />
                <TableContainer sx={{ display: "grid", justifyContent: "center", textAlign: "center" }}>
                    <Table sx={{ maxWidth: 900, justifyContent: "center", textAlign: "center" }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} >Habit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}> Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Goal</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Progress</TableCell>
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
                    className='modal'
                >
                    <div className='modal'>
                        {/* onSubmit={addProgress} */}
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


            </div>
        </div>
    )

}

export default StatsPage