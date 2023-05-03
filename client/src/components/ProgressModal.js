// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { Button } from "@mui/material";
// import { useParams } from "react-router-dom";

// function ProgressModal({ modalOpen, setModalOpen, statId }) {
//     const [stat, setStat] = useState('')
//     const [anAmount, setAnAmount] = useState(stat.amount)
//     const { id } = useParams()

//     useEffect(() => {
//         fetch(`/stats/${statId}`)
//             .then(r => r.json())
//             .then(thisStat => setStat(thisStat))
//     }, [id])

//     const handleChange = e => {
//         setAnAmount(e.target.value)
//     }

//     const handleSubmit = e => {
//         e.preventDefault()
//         fetch(`/stats/${statId}`, {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 amount: anAmount,
//             })
//         })
//             .then(r => r.json())
//             .then(updatedStat => setAnAmount(updatedStat))
//         window.alert("Progress Updated")
//         e.target.reset()
//     }

//     return (
//         <Modal
//             isOpen={modalOpen}
//             onRequestClose={() => setModalOpen(false)}
//         >
//             <div className='Login'>
//                 {/* onSubmit={addProgress} */}
//                 <form onSubmit={handleSubmit}>
//                     <label for="amount"> Enter Progress: </label>
//                     <br />
//                     <input onChange={handleChange} type="number" name="amount" value={anAmount} />
//                     <br />
//                     <Button variant='outlined'  type="submit">Submit Progress</Button>
//                 </form>
//                 <br />
//                 <Button variant='outlined' onClick={() => setModalOpen(false)} >
//                     Close Update Form
//                 </Button>
//             </div>
//         </Modal>
//     )

// }

// export default ProgressModal