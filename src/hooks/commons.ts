import { type ValueTypeObject } from '@/types/interfaces/commons';
import { useState } from 'react';
import { type ValueType } from 'react-select';

export const useDropdowns = (initialvalue: ValueTypeObject) => {
    const [state, setState] = useState(initialvalue);

    const handler = (name: string, value: ValueType<any, any>) => {
        setState((state) => ({ ...state, [name]: value }));
    };

    return [state, handler] as const;
};
