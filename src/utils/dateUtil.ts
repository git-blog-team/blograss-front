import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const dateToYYMMDD = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD');
};

export const getThisYear = (date: Date) => {
    return dayjs(date).format('YY');
};

export const getThisMonth = (date: Date) => {
    return dayjs(date).format('MM');
};

export const getThisDay = (date: Date) => {
    return dayjs(date).format('DD');
};

export const getDaysInMonth = (date: Date) => {
    return dayjs(dateToYYMMDD(date)).daysInMonth();
};
