import theme from '@/styles/theme';
import {
    type IPropsButton,
    type IPropsStyledButton,
} from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledButton = styled.button<IPropsStyledButton>`
    padding: 10px 20px 10px 20px;
    background-color: #fff;
    border: 1px solid ${(props) => props.buttonStyle.normal};
    border-radius: 5px;
    color: ${(props) => props.buttonStyle.normal};
    font-size: 14px;
    line-height: calc(
        (${(props) => props.buttonStyle.style?.fontSize ?? '14px'}) * 1.5
    );
    font-weight: bold;
    cursor: ${(props) => (props.disabled ?? false ? 'not-allowed' : 'pointer')};
    width: ${(props) => props.buttonStyle.style?.width ?? 'auto'};
    ${(props) => props.buttonStyle.style};
    :hover {
        border: 1px solid ${(props) => props.buttonStyle.hover};
        color: ${(props) => props.buttonStyle.hover};
    }
`;

export default function Button({
    children,
    disabled = false,
    onClick,
    type = 'button',
    href,
    style,
}: IPropsButton) {
    const buttonStyle = {
        normal: disabled ? theme.colors.txt_gray : theme.colors.point_green,
        hover: disabled ? theme.colors.txt_gray : theme.colors.point_green2,
        style,
    };
    return (
        <>
            {href !== undefined && (
                <Link href={href}>
                    <StyledButton
                        disabled={disabled}
                        buttonStyle={buttonStyle}
                        onClick={onClick}
                        type={type}
                    >
                        {children}
                    </StyledButton>
                </Link>
            )}

            {href === undefined && (
                <StyledButton
                    disabled={disabled}
                    buttonStyle={buttonStyle}
                    onClick={onClick}
                    type={type}
                >
                    {children}
                </StyledButton>
            )}
        </>
    );
}
