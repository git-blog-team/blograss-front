import { IInputProps, IStyledInputProps } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import { useId } from 'react';

const StyledInput = styled.input<IStyledInputProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    margin: ${(props) => props.margin};
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    border-radius: ${(props) => props.borderRadius};
    border: ${(props) => props.status === 'error' && '1px solid red'};
    :focus {
        outline: none;
        border-color: ${(props) => props.status === 'error' && '1px solid red'};
    }
`;

export default function Input({ children, ...props }: IInputProps) {
    const inputId = useId();
    return (
        <>
            <label htmlFor={inputId}>{children}</label>
            <StyledInput id={inputId} {...props} />
        </>
    );
}
