import { showToast } from '@/store/toast';
import { type ICalenderNavProps } from '@/types/interfaces/commons';
import { YYMMDDToYYMM, dateToYYMM01, isBetweenDate } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

export default function CalenderNav({
    isMonthFirstDay,
    setIsMonthFirstDay,
    minimumDate,
    maximumDate,
}: ICalenderNavProps) {
    const dispatch = useDispatch();
    const handleCalenderMonth = (type: string) => {
        const date = new Date(isMonthFirstDay);
        switch (type) {
            case 'prev':
                date.setMonth(date.getMonth() - 1);
                break;
            case 'next':
                date.setMonth(date.getMonth() + 1);
                break;
        }
        if (isBetweenDate(date, minimumDate, maximumDate)) {
            setIsMonthFirstDay(dateToYYMM01(date));
        } else {
            dispatch(
                showToast({
                    toastMessage: '범위를 벗어난 날짜입니다.',
                    color: 'red',
                }),
            );
        }
    };

    return (
        <StyledWrapperCalenderNav>
            <button
                onClick={() => {
                    handleCalenderMonth('prev');
                }}
            >
                이전
            </button>
            <span>{YYMMDDToYYMM(isMonthFirstDay)}</span>
            <button
                onClick={() => {
                    handleCalenderMonth('next');
                }}
            >
                다음
            </button>
        </StyledWrapperCalenderNav>
    );
}

const StyledWrapperCalenderNav = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
