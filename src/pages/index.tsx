import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import styled from '@emotion/styled';

export default function Home() {
    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                </StyledTopContents>
                <div>dddd</div>
            </StyledCommonWrapper>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    > div > div:last-of-type {
        height: 600px;
        width: 100%;
    }
`;

const StyledTopContents = styled.div``;
