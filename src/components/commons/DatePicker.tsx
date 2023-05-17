mport { dateToYYMMDD, getDaysInMonth } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';

interface IDatePickerProps {
    today: Date;
    onChange?: (date: Date) => void;
}

const WrapperDatePicker = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 4% 8% 4% 8%;
    z-index: 10;
`;

const DateItem = styled.button`
    width: 12%;
    height: 12%;
    text-align: center;
    background-color: #fff;
    border: unset;
    :hover {
        background-color: #e5e5e5;
    }
    cursor: pointer;
`;
export default function DatePicker({ today, onChange }: IDatePickerProps) {
    const [isOpenCalender, setIsOpenCalender] = useState(false);
    const [isSelectDay, setIsSelectDay] = useState(today);

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
     * 매월 마지막 날짜 구하기
     */
    const daysInMonthArr = new Array(getDaysInMonth(today)).fill(1);

    return (
        <div>
            <div>
                <h1>DatePicker</h1>
                <input type="text" value={dateToYYMMDD(today)} />
                <BsFillCalendarPlusFill onClick={onClickCalenderIcon} />
            </div>
            <WrapperDatePicker>
                {startDayArr.map((item) => (
                    <DateItem key={item}>{item}</DateItem>
                ))}
                {daysInMonthArr.map((item, index) => (
                    <DateItem key={index}>{item + index}</DateItem>
                ))}
            </WrapperDatePicker>
        </div>
    );
}