import { type MenuPlacement, type ValueType } from 'react-select';

// dropdown
export type ValueTypeObject = Record<string, ValueType<any, any>>;
// dropdown
export interface IDropDownProps {
    isDisabled: boolean;
    name: string;
    options: readonly any[] | undefined;
    value: ValueTypeObject;
    onChange: (value: ValueType<any, any>, name: string) => void;
    direction?: MenuPlacement;
}

// navigation
export interface INaviMenuItem {
    id: number;
    name: string;
    path: string;
}

export interface IStyledInputProps {
    width?: string;
    height?: string;
    border?: string;
    margin?: string;
    fontSize?: string;
    color?: string;
    borderRadius?: string;
    status?: 'error' | undefined | '';
    inputId?: string;
}

export interface IInputProps extends IStyledInputProps {
    children?: React.ReactNode;
    id?: string;
    type?: 'text' | 'password' | 'number' | 'email';
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickReset?: () => void;
    onClickSearch?: () => void;
    isSearch?: boolean;
}

export interface IUseGenerateId {
    prefix?: string | undefined | '';
    postfix?: string | undefined | '';
}
