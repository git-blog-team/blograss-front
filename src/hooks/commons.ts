import {
    type IUseGenerateId,
    type ValueTypeObject,
} from '@/types/interfaces/commons';
import { useId, useState } from 'react';
import { type ValueType } from 'react-select';

export const useDropdowns = (initialvalue: ValueTypeObject) => {
    const [state, setState] = useState(initialvalue);

    const handler = (name: string, value: ValueType<any, any>) => {
        setState((state) => ({ ...state, [name]: value }));
    };

    return [state, handler] as const;
};

export const useGenerateId = ({
    prefix = '',
    postfix = '',
}: IUseGenerateId) => {
    const prefixString = prefix.length > 0 ? `${prefix}-` : '';
    const postfixString = postfix.length > 0 ? `-${postfix}` : '';
    return `${prefixString}${useId()}${postfixString}`;
};
