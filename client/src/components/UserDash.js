import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";

const UserDash = ({ user }) => {

	if (!user) {
		return <Navigate replace to='/login' />
	} else {
		return (
			<div>
				{/* <NavBar /> */}
				<h2>Hello, {user.username}!</h2>
				<p>Welcome to your Dashboard</p>
			</div>
		);
	}
};

export default UserDash;