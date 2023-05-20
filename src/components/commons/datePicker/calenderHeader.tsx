import { daysText } from '@/constants/optioins';
import { useGenerateId } from '@/hooks/commons';
import styled from '@emotion/styled';

export default function CalenderHeader() {
    const key = useGenerateId({});
    return (
        <>
            {daysText.map((item) => (
                <StyledCalenderHeader key={`${key}-${item}`}>
                    {item}
                </StyledCalenderHeader>
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
