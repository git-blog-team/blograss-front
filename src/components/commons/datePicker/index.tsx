import { dateToYYMM01, dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import Calender from './calender';
import CalenderHeader from './calenderHeader';
import CalenderNav from './calenderNav';
import { type IDatePickerProps } from '@/types/interfaces/commons';
import { normalRowStyles } from '@/styles/flexModules';
import theme from '@/styles/theme';

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
    const [isMonthFirstDay, setIsMonthFirstDay] = useState(dateToYYMM01(today));

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
                <StyledCalenderIcon onClick={onClickCalenderIcon} />
            </StyledWrapperDatePicker>
            {isOpenCalender && (
                <StyledWrapperCalender>
                    <CalenderNav
                        isMonthFirstDay={isMonthFirstDay}
                        setIsMonthFirstDay={setIsMonthFirstDay}
                    />
                    <CalenderHeader />
                    <Calender
                        isMonthFirstDay={isMonthFirstDay}
                        isSelectDay={isSelectDay}
                        onClickCalenderDay={onClickCalenderDay}
                    />
                </StyledWrapperCalender>
            )}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    position: relative;
`;

const StyledCalenderIcon = styled(BsFillCalendarPlusFill)`
    margin: 0px 0px 0px 5px;
    font-size: 20px;
    color: ${theme.colors.point_yellow_green2};
    cursor: pointer;
`;

const StyledWrapperDatePicker = styled.div`
    ${normalRowStyles()}
`;

const StyledWrapperCalender = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    height: auto;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 8px 15px;
    z-index: 10;
`;
