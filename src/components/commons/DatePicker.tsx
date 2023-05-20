import { daysText } from '@/constants/optioins';
import { dateToYYMMDD, getDaysInMonth } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';

interface IDatePickerProps {
    today: Date;
    onChange?: (date: Date) => void;
}

const CalenderHaeder = () => {
    return (
        <>
            {daysText.map((item) => (
                <StyledCalenderHeader key={item}>{item}</StyledCalenderHeader>
            ))}
        </>
    );
};

export default function DatePicker({ today, onChange }: IDatePickerProps) {
    const [isOpenCalender, setIsOpenCalender] = useState(false);
    const [isSelectDay, setIsSelectDay] = useState(dateToYYMMDD(today));

    const onClickCalenderIcon = () => {
        setIsOpenCalender(!isOpenCalender);
    };

    const dateToYYMM = (date: Date) => {
        return dayjs(date).format('YYYY-MM');
    };

    /**
     * 매월 1일의 요일 구하기
     * 0: 일요일
     */

    const startDay = dayjs(`${dateToYYMM(today)}-01`).get('day');
    const startDayArr = new Array(startDay).fill('');

    /**
     * 달력 날짜 출력용 배열 만들기
     */
    const daysInMonthArr = new Array(getDaysInMonth(today))
        .fill({
            dateText: 0,
            date: `${startDay}-01`,
        })
        .map((item, index) => {
            return {
                dateText: index + 1,
                date: `${dateToYYMM(today)}-${index + 1}`,
            };
        });

    const onClickCalenderDay = (item: string) => {
        setIsSelectDay(item);
        setIsOpenCalender(false);
    };

    return (
        <StyledWrapperDatePicker>
            <div>
                <input type="text" value={isSelectDay} readOnly />
                <BsFillCalendarPlusFill
                    onClick={onClickCalenderIcon}
                    fontSize={20}
                />
            </div>
            {isOpenCalender && (
                <StyledCalender>
                    <CalenderHaeder />
                    {startDayArr.map((item) => (
                        <StyledCalenderItem key={item}>
                            {item}
                        </StyledCalenderItem>
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
                </StyledCalender>
            )}
        </StyledWrapperDatePicker>
    );
}

const StyledWrapperDatePicker = styled.div`
    position: relative;
`;

const StyledCalender = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 8px 15px;
    z-index: 10;
    position: absolute;
`;

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

const StyledCalenderHeader = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: #fff;
    border: unset;
`;
