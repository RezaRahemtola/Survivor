import React, { ReactNode } from "react";
import { Card, Icon } from "react-native-elements";
import { Image, ImageBackground, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import Email from "./Email";
import Tel from "./Tel";

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "#FFF",
		borderWidth: 0,
		flex: 1,
		margin: 0,
		padding: 0,
	},
	container: {
		flex: 1,
	},
	emailContainer: {
		backgroundColor: "#FFF",
		flex: 1,
		paddingTop: 30,
	},
	headerBackgroundImage: {
		paddingBottom: 20,
		paddingTop: 45,
	},
	headerContainer: {},
	headerColumn: {
		backgroundColor: "transparent",
		...Platform.select({
			ios: {
				alignItems: "center",
				elevation: 1,
				marginTop: -1,
			},
			android: {
				alignItems: "center",
			},
		}),
	},
	placeIcon: {
		color: "white",
		fontSize: 26,
	},
	scroll: {
		backgroundColor: "#FFF",
	},
	telContainer: {
		backgroundColor: "#FFF",
		flex: 1,
		paddingTop: 30,
	},
	userAddressRow: {
		alignItems: "center",
		flexDirection: "row",
	},
	userCityRow: {
		backgroundColor: "transparent",
	},
	userCityText: {
		color: "#A5A5A5",
		fontSize: 15,
		fontWeight: "600",
		textAlign: "center",
	},
	userImage: {
		borderColor: "#FFF",
		borderRadius: 85,
		borderWidth: 3,
		height: 170,
		marginBottom: 15,
		width: 170,
	},
	userNameText: {
		color: "#FFF",
		fontSize: 22,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
});

type HeadComponentProps = {
	avatar: string;
	avatarBackground: string;
	name: string;
	address: {
		city: string;
		country: string;
	};
};
const HeadComponent = ({ avatar, avatarBackground, name, address }: HeadComponentProps) => {
	const onPressPlace = () => console.log("press place");

	return (
		<View style={styles.headerContainer}>
			<ImageBackground style={styles.headerBackgroundImage} blurRadius={10} source={{ uri: avatarBackground }}>
				<View style={styles.headerColumn}>
					<Image style={styles.userImage} source={{ uri: avatar }} />
					<Text style={styles.userNameText}>{name}</Text>
					<View style={styles.userAddressRow}>
						<View>
							<Icon name="place" underlayColor="transparent" iconStyle={styles.placeIcon} onPress={onPressPlace} />
						</View>
						<View style={styles.userCityRow}>
							<Text style={styles.userCityText}>
								{address.city}, {address.country}
							</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

type TelComponentProps = {
	tels: { id: number; name: string; number: string }[];
};
const TelComponent = ({ tels }: TelComponentProps): ReactNode => {
	const onPressTel = (number: string) => {
		Linking.openURL(`tel://${number}`).catch((err) => console.log("Error:", err));
	};

	const onPressSms = () => {
		console.log("sms");
	};

	return (
		<>
			{tels.map((item, index) => {
				const { id, name, number } = item;

				return (
					<Tel
						key={`tel-${id}`}
						index={index}
						name={name}
						number={number}
						onPressSms={onPressSms}
						onPressTel={onPressTel}
					/>
				);
			})}
		</>
	);
};

type EmailComponentProps = {
	emails: { id: number; email: string; name: string }[];
};
const EmailComponent = ({ emails }: EmailComponentProps) => {
	const onPressEmail = (email: string | undefined = undefined) => {
		Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch((err) => console.log("Error:", err));
	};

	return (
		<>
			{emails.map((item, index) => {
				const { email, id, name } = item;
				return <Email key={`email-${id}`} index={index} name={name} email={email} onPressEmail={onPressEmail} />;
			})}
		</>
	);
};

type ContactProps = HeadComponentProps & TelComponentProps & EmailComponentProps;
const Contact = (props: ContactProps) => {
	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.container}>
				<Card>
					<HeadComponent {...props} />

					<TelComponent {...props} />
					<EmailComponent {...props} />
				</Card>
			</View>
		</ScrollView>
	);
};

export default Contact;
