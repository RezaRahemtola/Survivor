import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import customParsePlugin from "dayjs/plugin/customParseFormat";
import en from "dayjs/locale/en";
import fr from "dayjs/locale/fr";
import es from "dayjs/locale/es";
import zh from "dayjs/locale/zh-cn";
import hi from "dayjs/locale/hi";
import pt from "dayjs/locale/pt";

dayjs.extend(weekday);
dayjs.extend(customParsePlugin);

export const locales = {
	en,
	fr,
	es,
	zh,
	hi,
	pt,
};
export default dayjs;
