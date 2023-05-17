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

// checkbox
export interface CheckboxOptions {
    label: string;
    isChecked: boolean;
    onChange: (label: string, isChecked: boolean) => void;
    accentColor?: string;
    labelPosition?: 'left' | 'right';
    fontSize?: string;
    fontColor?: string;
    boxSize?: 'small' | 'big' | 'normal';
    radius?: string;
    borderSize?: string;
    borderColor?: string;
}

// editor-write
export interface EditorOptions {
    height?: string;
    type: 'html' | 'markdown';
    initialValue?: string;
    onChange: (type: string, ref: any) => void;
}
