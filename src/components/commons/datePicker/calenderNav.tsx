import { YYMMDDToYYMM, dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';

interface ICalenderNavProps {
    currentMonth: string;
    setIsCurrentMonth: (changeMonth: string) => void;
}

export default function CalenderNav({
    currentMonth,
    setIsCurrentMonth,
}: ICalenderNavProps) {
    const handleCalenderMonth = (type: string) => {
        const date = new Date(currentMonth);
        if (type === 'prev') {
            date.setMonth(date.getMonth() - 1);
        } else if (type === 'next') {
            date.setMonth(date.getMonth() + 1);
        }
        setIsCurrentMonth(dateToYYMMDD(date));
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
            <span>{YYMMDDToYYMM(currentMonth)}</span>
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
