// import * as React from 'react';
// import { useContext, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { UserContext } from "./context/user";
// import EditIcon from '@mui/icons-material/Edit';


// function UserDataGrid(setStats) {
//     const { user } = useContext(UserContext);
//     // const apiRef = useGridApiRef()

//     let habitStats = user.habitstats
//     const [rows, setRows] = useState(habitStats);

//     let habitNames = habitStats.map(s => s.habit.name);

//     const uniqueStats = [...new Map(habitStats.map((h) => [h.name, h])).values()];

//     const columns = [
//         { field: 'name', headerName: 'Habit', width: 180, editable: false, valueGetter: (habitStats) => habitStats.row.habit.name },
//         { field: 'category', headerName: 'Category', editable: false, valueGetter: (habitStats) => habitStats.row.habit.category },
//         {
//             field: 'habit.goal',
//             headerName: 'Goal',
//             type: 'number',
//             width: 100,
//             editable: false,
//             valueGetter: (habitStats) => habitStats.row.habit.goal
//         },
//         {
//             field: 'amount',
//             headerName: 'Progress',
//             type: 'number',
//             width: 100,
//             editable: true,

//         },
//     ];



    // const userHabitStats = habitStats.map((s) => {
    //     // setNewAmount(s.amount)

    //     id: s.id,
    //         habit: s.habit.name,
    //             category: s.habit.category,
    //                 goal: s.habit.goal,
    //                     amount: s.amount,


    //     // return (
    //     //     <TableRow key={s.id}>
    //     //         <TableCell> <button onClick={() => handleDelete(s.id)}><DeleteIcon fontSize="small" /></button>  {s.habit.name}</TableCell>
    //     //         <TableCell>{s.habit.category}</TableCell>
    //     //         <TableCell>{s.habit.goal} </TableCell>
    //     //         <TableCell align="right" value={s.amount}>{s.amount} <button className='addBtn' onClick={() => addProgress(s.id)}><AddIcon /></button></TableCell>
    //     //     </TableRow>
    //     // )
    // });

//     const handleCellEditCommit = React.useCallback(
//         ({ id, field, value }) => {
//             if (field === 'amount') {
//                 const newAmount = value
//                 const updatedRows = rows.map((row) => {
//                     if (row.id === id) {
//                         return { ...row, newAmount };
//                     }
//                     return row;
//                 });
//                 setRows(updatedRows);
//                 fetch(`/stats/${id}`, {
//                     method: 'PATCH',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         amount: newAmount
//                     })
//                 })
//                     .then(r => r.json)
//                     .then(setStats({ ...habitStats, amount: [...habitStats.amount, newAmount] }))
//             }

//         },
//         [rows],


//     );


//     return (
//         <div style={{ height: 600, width: '100%', marginTop: 25 }}>
//             <DataGrid rows={habitStats} columns={columns} onCellEditCommit={handleCellEditCommit} />
//         </div>
//     );
// }

// export default UserDataGrid

// // const rows = [
// //     {
// //         id: 1,
// //         name: randomTraderName(),
// //         age: 25,
// //         dateCreated: randomCreatedDate(),
// //         lastLogin: randomUpdatedDate(),
// //     },
// //     {
// //         id: 2,
// //         name: randomTraderName(),
// //         age: 36,
// //         dateCreated: randomCreatedDate(),
// //         lastLogin: randomUpdatedDate(),
// //     },
// //     {
// //         id: 3,
// //         name: randomTraderName(),
// //         age: 19,
// //         dateCreated: randomCreatedDate(),
// //         lastLogin: randomUpdatedDate(),
// //     },
// //     {
// //         id: 4,
// //         name: randomTraderName(),
// //         age: 28,
// //         dateCreated: randomCreatedDate(),
// //         lastLogin: randomUpdatedDate(),
// //     },
// //     {
// //         id: 5,
// //         name: randomTraderName(),
// //         age: 23,
// //         dateCreated: randomCreatedDate(),
// //         lastLogin: randomUpdatedDate(),
// //     },
// // ];