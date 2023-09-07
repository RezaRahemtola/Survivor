import { useEffect, useState } from "react";
import UserLayout from "@/layouts/User";
import axios from "@/config/axios";
import { FullUser } from "@/types/user";
import { getAccessToken, getPicture } from "@/config/cache";

const UserScreen = () => {
	const [user, setUser] = useState<FullUser | undefined>(undefined);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<FullUser>(`/employees/me`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				const user = response.data;
				user.picture = await getPicture(user.id);
				setUser(user);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return user ? <UserLayout user={user} /> : <></>;
};

export default UserScreen;
