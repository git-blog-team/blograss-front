import { type CheckboxOptions } from '@/types/interfaces/commons';
import styled from '@emotion/styled';

export default function CheckBox(options: CheckboxOptions) {
    const {
        isChecked, // 체크 유무 (state)
        label, // 라벨 문구
        onChange, // onChange 함수, label과 isChecked 값을 받음
        labelPosition = 'right', // 라벨 문구 위치 (오른쪽, 왼쪽)
        fontSize = '12px', // 라벨 문구 사이즈
        fontColor = 'black', // 라벨 문구 색상
        boxSize = 'normal', // 체크박스 크기 (small, big)
        accentColor = 'limegreen', // 체크 시, 체크박스 배경 색상
        borderSize = '2px', // 체크박스 보더의 사이즈
        borderColor = 'lightgrey', // 체크박스 보더의 색상
        radius = '5px', // 체크박스 보더의 둥글기
    } = options;

    return (
        <Label fontSize={fontSize} fontColor={fontColor}>
            {labelPosition === 'left' && <span>{label}</span>}
            <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                    onChange(label, isChecked);
                }}
                accentColor={accentColor}
                boxSize={boxSize}
                radius={radius}
                borderSize={borderSize}
                borderColor={borderColor}
            />
            {labelPosition === 'right' && <span>{label}</span>}
        </Label>
    );
}

const Label = styled.label<{ fontSize: string; fontColor: string }>`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: ${(options) => options.fontSize};
    color: ${(options) => options.fontColor};
`;

const Checkbox = styled.input<{
    radius: string;
    accentColor: string;
    boxSize: 'small' | 'big' | 'normal';
    borderSize: string;
    borderColor: string;
}>`
    cursor: pointer;
    // 기본 체크박스 스타일 초기화
    appearance: none;
    // 체크 전 스타일
    border: ${(options) => options.borderSize} solid
        ${(options) => options.borderColor};
    border-radius: ${(options) => options.radius};
    ${(options) =>
        options.boxSize === 'small' &&
        `
            width: 13px;
            height: 13px;
        `};
    ${(options) =>
        options.boxSize === 'big' &&
        `
            width: 19px;
            height: 19px;
        `};
    ${(options) =>
        options.boxSize === 'normal' &&
        `
            width: 15px;
            height: 15px;
        `};

    // 체크 후 스타일
    &:checked {
        background-color: ${(options) => options.accentColor};
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
    }
`;
