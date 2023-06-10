import { MenuPlacement, ValueType } from 'react-select';

// dropdown
export type ValueTypeObject = Record<string, ValueType<any, any>>;
// dropdown
export interface IDropDownProps {
    isDisabled?: boolean;
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

export interface ICommonTableProps {
    headers: Array<{ contents: string; width?: string }>;
    children: JSX.Element;
    isEmptyList?: boolean;
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

export interface IPaginationProps {
    totalItems: number;
    itemsPerPage: number;
    pagesPerBlock: number;
    currentPage: number;
}

export interface IStyledLinkItemProps {
    iscurrentpage?: 'true' | 'false';
}

export interface IPropsButton {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    href?: string | undefined;
    style?: {
        width?: string;
        height?: string;
        fontSize?: string;
        color?: string;
    };
}

export interface IPropsStyledButton {
    buttonStyle: {
        normal: string;
        hover: string;
        style?: {
            width?: string;
            height?: string;
            fontSize?: string;
            color?: string;
        };
    };
    disabled?: boolean;
}

export interface IStyledInputProps {
    width?: string;
    height?: string;
    border?: string;
    margin?: string;
    fontSize?: string;
    color?: string;
    borderRadius?: string;
    status?: 'error' | undefined | '' | string;
    inputId?: string;
}

export interface IInputProps extends IStyledInputProps {
    children?: React.ReactNode;
    id?: string;
    type?: 'text' | 'password' | 'number' | 'email' | undefined;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickReset?: () => void;
    onClickSearch?: () => void;
    isSearch?: boolean;
    maxLength?: number;
}

export interface IUseGenerateId {
    prefix?: string;
    postfix?: string;
}

export interface IDatePickerProps {
    today: Date | null;
    handlingPickDate?: (pickDate: string) => void;
}

export interface ICalenderProps {
    isSelectDay: string;
    isMonthFirstDay: string;
    onClickCalenderDay: (item: string) => void;
}

export interface IStyledCalenderItemProps {
    isSelected?: boolean;
}

export interface ICalenderNavProps {
    isMonthFirstDay: string;
    setIsMonthFirstDay: (changeMonth: string) => void;
}

export interface IUserInitialState {
    accessToken?: string;
    refreshToken?: string;
    isLogin?: boolean;
    adminInfo?: {
        adminId: string;
        adminName: string;
    };
}

export interface IHeaderReduxState {
    user: {
        accessToken: string;
        adminInfo: {
            adminName: string;
        };
        isLogin: boolean;
    };
}
