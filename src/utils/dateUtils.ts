import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const dateToYYMMDD = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD');
};

export const getDaysInMonth = (YYMMDD: string) => {
    return dayjs(YYMMDD).daysInMonth();
};

export const YYMMDDToYYMM = (YYMMDD: string) => {
    return dayjs(YYMMDD).format('YYYY-MM');
};

export const getStartDayOfMonth = (YYMMDD: string) => {
    return dayjs(`${YYMMDDToYYMM(YYMMDD)}-01`).get('day');
};
