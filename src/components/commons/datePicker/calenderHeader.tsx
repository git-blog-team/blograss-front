import { daysText } from '@/constants/optioins';
import { useGenerateId } from '@/hooks/commons';
import { normalRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function CalenderHeader() {
    const key = useGenerateId({});
    return (
        <StyledWrapperHeader>
            {daysText.map((item) => (
                <StyledCalenderHeader key={`${key}-${item}`}>
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

    &:first-child {
        color: red;
    }
`;
