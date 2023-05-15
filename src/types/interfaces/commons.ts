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

export interface IPaginationProps {
    totalItems: number;
    itemsPerPage: number;
    pagesPerBlock: number;
    currentPage: number;
    pageUrl: string;
}

export interface IStyledLinkItemProps {
    iscurrentpage?: 'true' | 'false';
}
