import { centerRowStyles } from '@/styles/flexModules';
import { IInputProps, IStyledInputProps } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import { useId } from 'react';
import { BsSearch, BsFillXCircleFill } from 'react-icons/bs';
import theme from '@/styles/theme';

const StyledWrapperInput = styled.div<IStyledInputProps>`
    ${centerRowStyles}
    background-color: #fff;
    width: ${(props) => props.width || '100%'};
    min-height: ${(props) => props.height || '40px'};
    padding: 0px 10px 0px 10px;
    border: 1px solid ${(props) => props.border || theme.colors.line_default};
    border-radius: ${(props) => props.borderRadius};
    ${(props) =>
        props.status === 'error' &&
        `border-color: ${theme.colors.point_orange};`}

    input {
        width: 100%;
        border: unset;
        padding: 0px 10px 0px 10px;
        font-size: ${(props) => props.fontSize || '14px'};
        line-height: calc(${(props) => props.fontSize || '14px'} * 1.5);
        color: ${(props) => props.color || theme.colors.black};
        :focus {
            outline: unset;
            border: unset;
        }
    }
    svg {
        cursor: pointer;
    }
`;

export default function Input({
    children,
    id,
    type,
    placeholder,
    onChange,
    value,
    onClickReset,
    onClickSearch,
    ...props
}: IInputProps) {
    const inputId = id || useId();
    const inputType = type || 'text';

    return (
        <>
            <label htmlFor={inputId}>{children}</label>
            <StyledWrapperInput {...props}>
                {props.isSearch && (
                    <BsSearch
                        fontSize={props.fontSize}
                        onClick={onClickSearch}
                    />
                )}
                <input
                    id={inputId}
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                {props.isSearch && value && (
                    <BsFillXCircleFill
                        fontSize={props.fontSize}
                        onClick={onClickReset}
                    />
                )}
            </StyledWrapperInput>
        </>
    );
}
