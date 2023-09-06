import { useLocalSearchParams } from "expo-router";

import UserLayout from "@/layouts/User";
import { ModalUser } from "@/types/user";

export default function ModalScreen() {
	const params = useLocalSearchParams<ModalUser>();

	return <UserLayout user={params} />;
}
