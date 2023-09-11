import { Dimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text, useThemeColor } from "@/components/Themed";
import { IcelandCarpoolingData } from "@/types/widgets/iceland-carpooling";
import { styles } from "@/components/widgets/cardStyles";

const { width } = Dimensions.get("window");

const IcelandCarpoolingCard = ({ item }: { item: IcelandCarpoolingData }) => {
	const borderColor = useThemeColor({}, "text");
	const { t } = useTranslation();

	return (
		<View style={{ ...styles.view, borderColor }}>
			<Text style={{ ...styles.text, width }}>
				{t("widgets.icelandCarpooling.from")} {item.from}
			</Text>
			<Text style={{ ...styles.text, width }}>
				{t("widgets.icelandCarpooling.to")} {item.to}
			</Text>
			<Text style={{ ...styles.text, width }}>
				{t("widgets.icelandCarpooling.date")} {item.date + ` ${t("widgets.icelandCarpooling.at")} ` + item.time}
			</Text>
		</View>
	);
};
export default IcelandCarpoolingCard;
