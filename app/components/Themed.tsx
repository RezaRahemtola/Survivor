/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme as defaultUseColorScheme, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";
import { useAtom } from "jotai";
import { userSettingsAtom } from "@/stores/widgets";

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useColorScheme() {
	const [userSettings] = useAtom(userSettingsAtom);
	const deviceTheme = defaultUseColorScheme() ?? "light";
	const userTheme = userSettings?.interfaceTheme
		? userSettings.interfaceTheme === "auto"
			? deviceTheme
			: userSettings.interfaceTheme
		: undefined;

	return userTheme ?? deviceTheme;
}

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
