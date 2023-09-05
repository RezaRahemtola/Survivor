import React from "react";

import Profile from "../../components/user/Profile";
import { useAuthContext } from "../../context/auth";

// export default function UserScreen() {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>User</Text>
// 			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
// 			<EditScreenInfo path="app/(tabs)/user.tsx" />
// 		</View>
// 	);
// }

const mockData = {
	name: "Darrell Schmeler",
	username: "Leola_VonRueden",
	address: {
		streetA: "Abbott Shoals",
		streetB: "505 Winona Place",
		streetC: "4306 Hudson Street Suite 875",
		streetD: "Suite 489",
		city: "Ginatown",
		state: "Massachusetts",
		country: "Nepal",
		zipcode: "41428-0189",
		geo: {
			lat: "-75.8513",
			lng: "81.3262",
		},
	},
	website: "destany.org",
	bio: "Web & Mobile UI/UX designer, Motion designer following the latest ui & ux trends",
	company: {
		name: "Streich, Harber and Hilpert",
		catchPhrase: "Team-oriented hybrid neural-net",
		bs: "user-centric embrace vortals",
	},
	avatar: "https://i.imgur.com/GfkNpVG.jpg",
	avatarBackground: "https://i.imgur.com/rXVcgTZ.jpg",
	tels: [
		{ id: 1, name: "Mobile", number: "+66 (089)-928-2134" },
		{ id: 2, name: "Work", number: "+41 (112)-435-9887" },
	],
	emails: [
		{ id: 1, name: "Personal", email: "elsie-goodman@mail.com" },
		{ id: 2, name: "Work", email: "elsie@work.com" },
	],
	posts: [
		{
			id: 1,
			words: "cupiditate qui cum",
			sentence: "Ipsum laborum quasi debitis dolores veniam.",
			sentences:
				"Impedit veritatis harum nihil dolores dolorem optio assumenda. Laborum saepe voluptas officia odit. Ut voluptas mollitia mollitia eum autem quisquam qui aut. Et ipsa hic harum molestias et quam qui cum. Sint sit soluta.",
			paragraph:
				"Beatae voluptas ea magni quibusdam dolorem sit aut qui. Dolorem rerum et consequuntur inventore officia excepturi dolore architecto fuga. Quia consequatur asperiores rerum qui corporis dolorum. At harum velit adipisci iste odit modi veniam ut. Deserunt quibusdam velit non ea.",
			image: "https://d25tv1xepz39hi.cloudfront.net/2016-12-19/files/foodphotoghacks_image8.jpg",
			createdDate: "2017-11-21T02:33:53.770Z",
			user: {
				name: "Ronaldo",
				username: "Ronaldo.Effertz",
				avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/samuelkraft/128.jpg",
				email: "Ronaldo.Effertz.Deckow@hotmail.com",
			},
		},
		{
			id: 2,
			words: "est voluptatum aut",
			sentence: "Omnis omnis aut dolor quaerat sunt et optio.",
			sentences:
				"Nam numquam magni saepe. Deserunt aspernatur dolorem libero soluta sint molestias et sint sed. Maiores id quis assumenda voluptates quos ut saepe officia voluptatem. Ea placeat sed ut. Modi sed earum voluptas cumque unde eum doloribus ipsam.",
			paragraph:
				"Quam aut reprehenderit asperiores aut. Sunt quis aspernatur incidunt. Illo et perferendis ex incidunt eos ut maxime dolorem voluptatem. Qui rem nihil quos cumque eum doloribus. Quae beatae tempore commodi.",
			createdDate: "2017-11-20T18:04:58.858Z",
			user: {
				name: "Markus",
				username: "Markus.Price68",
				avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kikillo/128.jpg",
				email: "Markus.Price68.Dicki@yahoo.com",
			},
		},
		{
			id: 3,
			words: "vitae voluptas quia",
			sentence: "Voluptates dolor ad rem amet voluptas.",
			sentences: "Rem ipsum quis. Animi ipsum ut at possimus. Beatae molestiae non odio soluta quidem ut suscipit.",
			paragraph:
				"Veniam veritatis nihil illum rerum et. Temporibus facere sed delectus corporis alias. Et odio aliquid est. Quas sit et quia tempora sit eveniet quam.",
			createdDate: "2017-03-24T10:56:15.461Z",
			image: "https://touristmeetstraveler.com/wp-content/uploads/sushi.jpg",
			user: {
				name: "Magali",
				username: "Magali16",
				avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/mastermindesign/128.jpg",
				email: "Magali1664@gmail.com",
			},
		},
	],
};

const UserScreen = () => {
	const { user } = useAuthContext();

	// return <Profile user={user} />;
	return <Profile {...mockData} />;
};

export default UserScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 	},
// 	separator: {
// 		marginVertical: 30,
// 		height: 1,
// 		width: "80%",
// 	},
// });
