import React from "react";

import { useAuthContext } from "../../context/auth";
import UserLayout from "../../layouts/User";

const UserScreen = () => {
	const { user } = useAuthContext();

	return <UserLayout {...user!} />;
};

export default UserScreen;
