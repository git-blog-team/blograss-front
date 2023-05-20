import { daysText } from '@/constants/optioins';
import styled from '@emotion/styled';

export default function CalenderHeader() {
    return (
        <>
            {daysText.map((item) => (
                <StyledCalenderHeader key={item}>{item}</StyledCalenderHeader>
            ))}
        </>
    );
}

const StyledCalenderHeader = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: #fff;
    border: unset;
`;
