import { MenuPlacement, ValueType } from 'react-select';

// dropdown
export interface ValueTypeObject {
    [key: string]: ValueType<any, any>;
}
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

export interface IInputProps {
    type?: 'text' | 'password' | 'number' | 'email';
    placeholder?: string;
    id?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    width?: string;
    height?: string;
    padding?: string;
    border?: string;
    margin?: string;
    fontSize?: string;
    color?: string;
}

export interface IStyledInputProps {
    width?: string;
    height?: string;
    padding?: string;
    border?: string;
    margin?: string;
    fontSize?: string;
    color?: string;
}
