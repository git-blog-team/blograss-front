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
