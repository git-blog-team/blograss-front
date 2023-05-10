import { normalRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function Footer() {
    return (
        <StyledFooter>
            <p>소재지 : 방구석</p>
            <p>작업자 : 우진택 문혜민 조준영</p>
        </StyledFooter>
    );
}
const StyledFooter = styled.div`
    ${normalRowStyles}
    justify-content: end;
    height: 50px;
    padding: 0 50px;
    font-size: 12px;
    min-width: 1200px;
    width: 90%;
    > p {
        &:first-of-type {
            margin: 0 30px 0 0;
        }
        color: ${(props) => props.theme.colors.txt_gray};
    }
`;
