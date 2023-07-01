import styled from '@emotion/styled';
import { useState } from 'react';

const useToast = (text: string, popUptime?: number) => {
    const [isShow, handleIsShow] = useState(false);

    const openToast = () => {
        handleIsShow(true);
        setTimeout(
            () => handleIsShow(false),
            popUptime ? popUptime * 1000 : 3000,
        );
    };
    const ToastComponent = ({ color }: { color?: string }) => {
        return (
            <>
                {isShow && text && (
                    <StyledToast color={color} isShow={isShow}>
                        {text}
                    </StyledToast>
                )}
            </>
        );
    };
    return { openToast, ToastComponent };
};

export default useToast;

const StyledToast = styled.div<{ isShow: boolean; color?: string }>`
    display: ${(props) => (props.isShow ? 'block' : 'none')};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    min-width: 300px;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.black};
    border-top: 10px solid
        ${(props) =>
            props.color ? props.color : props.theme.colors.point_green};
    text-align: center;
    font-size: 14px;
    line-height: 19px;
    color: ${(props) => props.theme.colors.white};
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    z-index: 9999;
    white-space: pre-line;
`;
