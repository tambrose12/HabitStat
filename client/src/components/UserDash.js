import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Navigate } from "react-router-dom";
import Charts from "./Charts";


const UserDash = () => {
	const { user } = useContext(UserContext)

	if (!user) {
		return <Navigate replace to='/login' />
	} else {

		return (
			<div>
				<h2>Hello, {user.username}!</h2>
				<p>Welcome to your Dashboard</p>
				<Charts />
			</div>
		);
	}
};

export default UserDash;