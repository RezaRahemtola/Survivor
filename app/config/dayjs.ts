import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import customParsePlugin from "dayjs/plugin/customParseFormat";
import en from "dayjs/locale/en";
import fr from "dayjs/locale/fr";
import es from "dayjs/locale/es";
import zh from "dayjs/locale/zh-cn";
import hi from "dayjs/locale/hi";
import pt from "dayjs/locale/pt";
import ja from "dayjs/locale/ja";
import de from "dayjs/locale/de";
import ko from "dayjs/locale/ko";
import it from "dayjs/locale/it";

dayjs.extend(weekday);
dayjs.extend(customParsePlugin);

export const locales = {
	en,
	fr,
	es,
	zh,
	hi,
	pt,
	ja,
	de,
	ko,
	it,
};
export default dayjs;
