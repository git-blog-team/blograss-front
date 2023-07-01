import { useEffect, type ReactNode } from 'react';
import Header from './Header';
import TopNavigation from './TopNavigation';
import styled from '@emotion/styled';
import { centerRowStyles } from '@/styles/flexModules';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { IHeaderReduxState } from '@/types/interfaces/commons';
import useToast from '@/components/commons/ToastPopup';
import { showToast } from '@/store/toast';
import Login from '@/components/login';

export default function Layout(props: { children: ReactNode }) {
    const { children } = props;
    const { toastMessage, color } = useSelector(
        (state: IHeaderReduxState) => state.toast,
    );
    const dispatch = useDispatch();
    const { openToast, ToastComponent } = useToast(toastMessage);
    const isLogin = useSelector((state: any) => state.user.isLogin);

    useEffect(() => {
        if (toastMessage) {
            openToast();

            setTimeout(() => {
                dispatch(showToast({ toastMessage: '', color: null }));
            }, 3000);
        }
    }, [toastMessage]);
    return (
        <StyledLayout>
            <Header />
            <TopNavigation />
            {isLogin ? (
                <Body>{children}</Body>
            ) : (
                <Body>
                    <Login />
                </Body>
            )}
            <Footer />
            <ToastComponent color={color} />
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
