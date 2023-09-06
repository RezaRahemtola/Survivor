import React, { useEffect, useState } from "react";
import UserLayout from "@/layouts/User";
import axios from "@/config/axios";
import { FullUser } from "@/types/user";
import { getPicture } from "@/config/cache";
import { useAuthContext } from "@/context/auth";

const UserScreen = () => {
	const { accessToken } = useAuthContext();
	const [user, setUser] = useState<FullUser | undefined>(undefined);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get<FullUser>(`/employees/me`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				const user = response.data;
				user.picture = await getPicture(user.id, accessToken);
				setUser(user);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return user ? <UserLayout user={user} /> : <></>;
};

export default UserScreen;
