import { DENY, PENDING } from '@/constants/common';
import { statusColorType } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import { normalRowStyles, spaceBetweenRowStyles } from './flexModules';
import { StyledDropdown } from '@/components/commons/DropDown';
import { StyledWrapperInput } from '@/components/commons/Input';

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
export const StyledTopContents = styled.div`
    ${spaceBetweenRowStyles};
    > div {
        ${normalRowStyles}
        ${StyledDropdown} {
            margin: 0 10px 0 0;
        }
        ${StyledWrapperInput} {
            width: 250px;
            border-radius: 5px;
            transition: all 100ms ease;
            :hover {
                border: 2px solid ${(props) => props.theme.colors.point_orange};
            }
            :focus-within {
                border: 2px solid ${(props) => props.theme.colors.point_orange};
            }
            input {
                ::placeholder {
                    font-size: 12px;
                }
            }
        }
    }
`;
