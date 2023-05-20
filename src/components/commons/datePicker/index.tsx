import { daysText } from '@/constants/optioins';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import Calender from './calender';

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

    const onClickCalenderDay = (item: string) => {
        setIsSelectDay(item);
        if (handlingPickDate != null) {
            handlingPickDate(item);
        }
        setIsOpenCalender(false);
    };

    return (
        <StyledWrapper>
            <StyledWrapperDatePicker>
                <input type="text" value={isSelectDay} readOnly />
                <BsFillCalendarPlusFill
                    onClick={onClickCalenderIcon}
                    fontSize={20}
                />
            </StyledWrapperDatePicker>
            {isOpenCalender && (
                <StyledCalender>
                    <CalenderHaeder />
                    <Calender
                        isSelectDay={isSelectDay}
                        onClickCalenderDay={onClickCalenderDay}
                    />
                </StyledCalender>
            )}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    position: relative;
`;

const StyledWrapperDatePicker = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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
