import { IInputProps, IStyledInputProps } from '@/types/interfaces/commons';
import styled from '@emotion/styled';

const StyledInput = styled.input<IStyledInputProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    margin: ${(props) => props.margin};
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
`;

export default function Input({
    type,
    placeholder,
    id,
    onChange,
    value,
    width,
    height,
    padding,
    border,
    margin,
    fontSize,
    color,
}: IInputProps) {
    return (
        <>
            <StyledInput
                type={type}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
                value={value}
                width={width}
                height={height}
                padding={padding}
                border={border}
                margin={margin}
                fontSize={fontSize}
                color={color}
            />
        </>
    );
}
