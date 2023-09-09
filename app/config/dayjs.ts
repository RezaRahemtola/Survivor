import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import customParsePlugin from "dayjs/plugin/customParseFormat";
import en from "dayjs/locale/en";
import fr from "dayjs/locale/fr";
import es from "dayjs/locale/es";

dayjs.extend(weekday);
dayjs.extend(customParsePlugin);

export const locales = {
	en,
	fr,
	es,
};
export default dayjs;
