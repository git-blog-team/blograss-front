import styled from '@emotion/styled';

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
    boxSize: 'small' | 'big';
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
            width: 15px;
            height: 15px;
        `};
    ${(options) =>
        options.boxSize === 'big' &&
        `
            width: 18px;
            height: 18px;
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

interface CheckboxOptions {
    label: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accentColor: string;
    labelPosition: 'left' | 'right';
    fontSize: string;
    fontColor: string;
    boxSize: 'small' | 'big';
    radius: string;
    borderSize: string;
    borderColor: string;
}

export default function CheckBox(options: CheckboxOptions) {
    const {
        isChecked, // 체크 유무
        onChange, // onChange 함수
        label, // 라벨 문구
        labelPosition, // 라벨 문구 위치 (오른쪽, 왼쪽)
        fontSize, // 라벨 문구 사이즈
        fontColor, // 라벨 문구 색상
        boxSize, // 체크박스 크기 (small, big)
        accentColor, // 체크 시, 체크박스 배경 색상
        borderSize, // 체크박스 보더의 사이즈
        borderColor, // 체크박스 보더의 색상
        radius, // 체크박스 보더의 둥글기
    } = options;
    return (
        <Label fontSize={fontSize} fontColor={fontColor}>
            {labelPosition == 'right' && (
                <Checkbox
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    accentColor={accentColor}
                    boxSize={boxSize}
                    radius={radius}
                    borderSize={borderSize}
                    borderColor={borderColor}
                />
            )}
            {label}
            {labelPosition == 'left' && (
                <Checkbox
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    accentColor={accentColor}
                    boxSize={boxSize}
                    radius={radius}
                    borderSize={borderSize}
                    borderColor={borderColor}
                />
            )}
        </Label>
    );
}
