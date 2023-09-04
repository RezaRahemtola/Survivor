import { ComponentProps } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

export type IconProps = (
	| {
			name: ComponentProps<typeof FontAwesome>["name"];
			source: "FontAwesome";
	  }
	| { name: ComponentProps<typeof AntDesign>["name"]; source: "AntDesign" }
) & {
	color: string;
} & ComponentProps<typeof FontAwesome | typeof AntDesign>;

const Icon = ({ name, source, color, ...props }: IconProps) => {
	if (source === "FontAwesome") {
		return <FontAwesome name={name} {...props} />;
	} else if (source === "AntDesign") {
		return <AntDesign name={name} {...props} />;
	}
};

export default Icon;
