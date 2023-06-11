import { DENY, PENDING } from '@/constants/common';
import { statusColorType } from '@/types/interfaces/commons';
import styled from '@emotion/styled';

export const StyledCommonWrapper = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 1300px;
    min-height: 700px;
    box-shadow: 0px 0px 2px ${(props) => props.theme.colors.line_default};
    padding: 20px 50px;
`;

export const StyledCommonMenuTitle = styled.div`
    font-size: 20px;
    padding: 20px;
    font-weight: 700;
    width: fit-content;
`;
export const statusColor = (props: statusColorType) => {
    if (props.status === PENDING) {
        return 'black';
    } else if (props.status === DENY) {
        return props.theme.colors.point_orange;
    } else {
        return props.theme.colors.point_green;
    }
};
