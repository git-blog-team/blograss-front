import { daysText } from '@/constants/optioins';
import { useGenerateId } from '@/hooks/commons';
import { normalRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function CalenderHeader() {
    const calendarHeaderKey = useGenerateId({});
    return (
        <StyledWrapperHeader>
            {daysText.map((item) => (
                <StyledCalenderHeader key={`${calendarHeaderKey}-${item}`}>
                    {item}
                </StyledCalenderHeader>
            ))}
        </StyledWrapperHeader>
    );
}

const StyledWrapperHeader = styled.div`
    ${normalRowStyles()}
    width: 100%;
    margin: 4px 0px 0px 0px;
`;

const StyledCalenderHeader = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    background-color: #fff;
    border: unset;
    &:first-of-type {
        // ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".
        // 위 오류로 인해 선택자이름 변경
        color: red;
    }
`;
