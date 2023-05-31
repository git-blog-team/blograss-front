import { type ReactNode } from 'react';
import Header from './Header';
import TopNavigation from './TopNavigation';
import styled from '@emotion/styled';
import { centerRowStyles } from '@/styles/flexModules';
import Footer from './Footer';

export default function Layout(props: { children: ReactNode }) {
    const { children } = props;
    // const token = Cookies.get(TOKEN); // TODO: 추후 로그인 도입후 토큰유무로 사이드바 노출고려

    return (
        <StyledLayout>
            <Header />
            <TopNavigation />
            <Body>{children}</Body>
            <Footer />
        </StyledLayout>
    );
}

const StyledLayout = styled.div`
    width: 100vw;
    min-width: 1320px;
`;
const Body = styled.div`
    ${centerRowStyles}
    align-items: flex-start;
    min-height: calc(100vh - 200px);
    background-color: ${(props) => props.theme.colors.light_gray};
    padding: 20px;
`;
