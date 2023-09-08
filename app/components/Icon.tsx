import { ComponentProps } from "react";
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";

type FontAwesomeIconProps = {
	name: ComponentProps<typeof FontAwesome>["name"];
	source: "FontAwesome";
} & ComponentProps<typeof FontAwesome>;

type AntDesignIconProps = {
	name: ComponentProps<typeof AntDesign>["name"];
	source: "AntDesign";
} & ComponentProps<typeof AntDesign>;

type MaterialIconsIconProps = {
	name: ComponentProps<typeof MaterialIcons>["name"];
	source: "MaterialIcons";
} & ComponentProps<typeof MaterialIcons>;

type MaterialCommunityIconsIconProps = {
	name: ComponentProps<typeof MaterialCommunityIcons>["name"];
	source: "MaterialCommunityIcons";
} & ComponentProps<typeof MaterialCommunityIcons>;

export type IconProps =
	| FontAwesomeIconProps
	| AntDesignIconProps
	| MaterialIconsIconProps
	| MaterialCommunityIconsIconProps;

const Icon = ({ name, source, ...props }: IconProps) => {
	const color = useThemeColor({}, "text");

	if (source === "FontAwesome") {
		return <FontAwesome name={name} color={color} {...props} />;
	} else if (source === "AntDesign") {
		return <AntDesign name={name} color={color} {...props} />;
	} else if (source === "MaterialIcons") {
		return <MaterialIcons name={name} color={color} {...props} />;
	} else if (source === "MaterialCommunityIcons") {
		return <MaterialCommunityIcons name={name} color={color} {...props} />;
	}
};

export default Icon;
