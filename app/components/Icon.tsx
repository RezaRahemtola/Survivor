import { ComponentProps } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

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

export type IconProps = FontAwesomeIconProps | AntDesignIconProps | MaterialIconsIconProps;

const Icon = ({ name, source, color, ...props }: IconProps) => {
	if (source === "FontAwesome") {
		return <FontAwesome name={name} {...props} />;
	} else if (source === "AntDesign") {
		return <AntDesign name={name} {...props} />;
	} else if (source === "MaterialIcons") {
		return <MaterialIcons name={name} {...props} />;
	}
};

export default Icon;
