import { dateToYYMM01, dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import Calender from './calender';
import CalenderHeader from './calenderHeader';
import CalenderNav from './calenderNav';
import { type IDatePickerProps } from '@/types/interfaces/commons';
import { normalRowStyles } from '@/styles/flexModules';
import theme from '@/styles/theme';
import dayjs from 'dayjs';

export default function DatePicker({
    today,
    handlingPickDate,
    minimumDate = new Date('2000-01-01'),
    maximumDate = new Date('2100-12-31'),
}: IDatePickerProps) {
    const [isOpenCalender, setIsOpenCalender] = useState(false);
    /**
     * 초기 선택 날짜는 date형식으로 넘어오기 때문에 YYMMDD 형식으로 변환
     * 그 이후에는 YYMMDD 형식으로 관리
     */

    const [isSelectDay, setIsSelectDay] = useState(
        today ? dateToYYMMDD(today) : 'YYY-MM-DD',
    );
    const [isMonthFirstDay, setIsMonthFirstDay] = useState(
        dateToYYMM01(today ?? dayjs().toDate()),
    );

    const onClickCalenderIcon = () => {
        if (isOpenCalender) {
            setIsMonthFirstDay(isSelectDay);
        }
        setIsOpenCalender(!isOpenCalender);
    };

    const onClickCalenderDay = (item: string) => {
        setIsSelectDay(item);
        if (handlingPickDate != null) {
            handlingPickDate(item);
        }
        setIsOpenCalender(false);
    };
    useEffect(() => {
        if (isSelectDay === 'YYY-MM-DD' && !!today) {
            setIsSelectDay(dateToYYMMDD(today));
        }
    }, [today]);

    return (
        <StyledWrapper>
            <StyledWrapperDatePicker isValue={isSelectDay !== 'YYY-MM-DD'}>
                <input type="text" value={isSelectDay} readOnly />
                <StyledCalenderIcon onClick={onClickCalenderIcon} />
            </StyledWrapperDatePicker>
            {isOpenCalender && (
                <StyledWrapperCalender>
                    <CalenderNav
                        isMonthFirstDay={isMonthFirstDay}
                        setIsMonthFirstDay={setIsMonthFirstDay}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
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

export const StyledWrapperDatePicker = styled.div<{ isValue: boolean }>`
    ${normalRowStyles()}
    >input {
        color: ${(props) =>
            props.isValue ? 'black' : props.theme.colors.txt_gray};
    }
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
