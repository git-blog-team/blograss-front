import { type ICalenderNavProps } from '@/types/interfaces/commons';
import { YYMMDDToYYMM, dateToYYMM01 } from '@/utils/dateUtils';
import styled from '@emotion/styled';

export default function CalenderNav({
    isMonthFirstDay,
    setIsMonthFirstDay,
}: ICalenderNavProps) {
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
        setIsMonthFirstDay(dateToYYMM01(date));
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
