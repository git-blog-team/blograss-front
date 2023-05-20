import { daysText } from '@/constants/optioins';
import { YYMMDDToYYMM, dateToYYMMDD, getDaysInMonth } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';

interface IDatePickerProps {
    today: Date;
    handlingPickDate?: (pickDate: string) => void;
}

export default function DatePicker({
    today,
    handlingPickDate,
}: IDatePickerProps) {
    const [isOpenCalender, setIsOpenCalender] = useState(false);
    /**
     * 초기 선택 날짜는 date형식으로 넘어오기 때문에 YYMMDD 형식으로 변환
     * 그 이후에는 YYMMDD 형식으로 관리
     */
    const [isSelectDay, setIsSelectDay] = useState(dateToYYMMDD(today));

    const onClickCalenderIcon = () => {
        setIsOpenCalender(!isOpenCalender);
    };

    const startDay = dayjs(`${YYMMDDToYYMM(isSelectDay)}-01`).get('day');

    /**
     * 달력 날짜 출력용 배열 만들기
     */
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

    const onClickCalenderDay = (item: string) => {
        setIsSelectDay(item);
        if (handlingPickDate != null) {
            handlingPickDate(item);
        }
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
                    <Calender
                        startDay={startDay}
                        daysInMonthArr={daysInMonthArr}
                        onClickCalenderDay={onClickCalenderDay}
                    />
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

/**
 *
 * @returns 월, 화, 수, 목, 금, 토, 일 렌더링
 */
const CalenderHaeder = () => {
    return (
        <>
            {daysText.map((item) => (
                <StyledCalenderHeader key={item}>{item}</StyledCalenderHeader>
            ))}
        </>
    );
};

const StyledCalenderHeader = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: #fff;
    border: unset;
`;

/**
 *
 * @param param0
 * @returns 달력 날짜 렌더링
 */
const Calender = ({
    startDay,
    daysInMonthArr,
    onClickCalenderDay,
}: {
    startDay: number;
    daysInMonthArr: Array<{ dateText: number; date: string }>;
    onClickCalenderDay: (item: string) => void;
}) => {
    const startDayArr = new Array(startDay).fill('');

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
};

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
