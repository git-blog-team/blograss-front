import { centerRowStyles, normalRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function Footer() {
    return (
        <StyledFooter>
            <div>
                <p>프론트 : 문혜민 우진택 조준영</p>
                <p>백엔드 : 김진성 최창서</p>
            </div>
        </StyledFooter>
    );
}
const StyledFooter = styled.div`
    ${centerRowStyles}
    height: 50px;
    font-size: 12px;
    min-width: 1200px;

    > div {
        width: 1280px;
        ${normalRowStyles}
        justify-content: end;

        padding: 20px 0 0;
        > p {
            &:first-of-type {
                margin: 0 30px 0 0;
            }
            color: ${(props) => props.theme.colors.txt_gray};
        }
    }
`;
