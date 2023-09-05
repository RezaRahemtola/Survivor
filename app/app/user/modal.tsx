import UserLayout, { UserLayoutProps } from "../../layouts/User";
import { useLocalSearchParams } from "expo-router";

export default function ModalScreen() {
	const params = useLocalSearchParams<UserLayoutProps>();
	const { email, name, surname, birth_date, gender, work, picture } = params;

	return (
		<UserLayout
			email={email}
			name={name}
			surname={surname}
			birth_date={birth_date}
			gender={gender}
			work={work}
			picture={picture}
		/>
	);
}
