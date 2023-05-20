import theme from '@/styles/theme';
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
                    isSelected={item.date === isSelectDay}
                >
                    {Number(item.dateText)}
                </StyledCalenderItem>
            ))}
        </>
    );
}

interface IStyledCalenderItemProps {
    isSelected?: boolean;
}

const StyledCalenderItem = styled.button<IStyledCalenderItemProps>`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: ${(props) =>
        props.isSelected ?? false ? theme.colors.point_green : '#fff'};
    color: ${(props) => (props.isSelected ?? false ? '#fff' : '#000')};
    border: unset;
    :hover {
        background-color: ${(props) =>
            !(props.isSelected ?? false) && '#e5e5e5'};
    }
    cursor: pointer;
`;
