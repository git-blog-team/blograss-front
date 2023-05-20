import { useGenerateId } from '@/hooks/commons';
import { normalRowStyles } from '@/styles/flexModules';
import theme from '@/styles/theme';
import {
    type IStyledCalenderItemProps,
    type ICalenderProps,
} from '@/types/interfaces/commons';
import {
    dateToYYMMDD,
    getDaysInMonth,
    getStartDayOfMonth,
} from '@/utils/dateUtils';
import styled from '@emotion/styled';

export default function Calender({
    isSelectDay,
    isMonthFirstDay,
    onClickCalenderDay,
}: ICalenderProps) {
    const startDay = getStartDayOfMonth(isMonthFirstDay);
    const startDayArr = new Array(startDay).fill('');

    const firstKey = useGenerateId({});
    const secondKey = useGenerateId({});

    const daysInMonthArr = new Array(getDaysInMonth(isMonthFirstDay))
        .fill({
            dateText: 0,
            date: '',
        })
        .map((_, index) => {
            return {
                dateText: index + 1,
                date: dateToYYMMDD(
                    new Date(isMonthFirstDay).setDate(index + 1),
                ),
            };
        });

    return (
        <StyledWrapperMonth>
            {startDayArr.map((item, index) => (
                <StyledEmptyItem key={`${firstKey}-${index}`}>
                    {item}
                </StyledEmptyItem>
            ))}
            {daysInMonthArr.map((item, index) => (
                <StyledCalenderItem
                    key={`${secondKey}-${index}`}
                    onClick={() => {
                        onClickCalenderDay(item.date);
                    }}
                    isSelected={item.date === isSelectDay}
                >
                    {Number(item.dateText)}
                </StyledCalenderItem>
            ))}
        </StyledWrapperMonth>
    );
}

const StyledWrapperMonth = styled.div`
    ${normalRowStyles()}
    width: 100%;
    flex-wrap: wrap;
`;

const StyledEmptyItem = styled.button<IStyledCalenderItemProps>`
    width: 24px;
    height: 24px;
    background-color: #fff;
    border: unset;
`;

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
