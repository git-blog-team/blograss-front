import { type MenuPlacement, type ValueType } from 'react-select';

// dropdown
export type ValueTypeObject = Record<string, ValueType<any, any>>;
// dropdown
export interface IDropDownProps {
    isDisabled?: boolean;
    name: string;
    options: readonly  any[] | undefined;
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

// table
export interface ICommonTableProps {
    headers:Array<{ contents: string; width?: string }>;
    children: JSX.Element;
    isEmptyList?: boolean;
}