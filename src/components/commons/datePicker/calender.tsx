import {
    YYMMDDToYYMM,
    getDaysInMonth,
    getStartDayOfMonth,
} from '@/utils/dateUtils';
import styled from '@emotion/styled';

interface ICalenderProps {
    isSelectDay: string;
    onClickCalenderDay: (item: string) => void;
}

export default function Calender({
    isSelectDay,
    onClickCalenderDay,
}: ICalenderProps) {
    const startDay = getStartDayOfMonth(isSelectDay);
    const startDayArr = new Array(startDay).fill('');
    const daysInMonthArr = new Array(getDaysInMonth(isSelectDay))
        .fill({
            dateText: 0,
            date: `${startDay}-01`,
        })
        .map((_, index) => {
            return {
                dateText: index + 1,
                date: `${YYMMDDToYYMM(isSelectDay)}-${index + 1}`,
            };
        });

    return (
        <>
            {startDayArr.map((item) => (
                <StyledCalenderItem key={item}>{item}</StyledCalenderItem>
            ))}
            {daysInMonthArr.map((item, index) => (
                <StyledCalenderItem
                    key={index}
                    onClick={() => {
                        onClickCalenderDay(item.date);
                    }}
                >
                    {Number(item.dateText)}
                </StyledCalenderItem>
            ))}
        </>
    );
}

const StyledCalenderItem = styled.button`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: #fff;
    border: unset;
    :hover {
        background-color: #e5e5e5;
    }
    cursor: pointer;
`;
