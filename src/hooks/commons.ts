import { type RefObject, useState, useId } from 'react';
import { type Editor } from '@toast-ui/react-editor';
import {
    type IUseGenerateId,
    type ValueTypeObject,
} from '@/types/interfaces/commons';
import { type ValueType } from 'react-select';
import { useDispatch } from 'react-redux';

export const useDropdowns = (initialvalue: ValueTypeObject) => {
    const [state, setState] = useState(initialvalue);

    const handler = (name: string, value: ValueType<any, any>) => {
        setState((state) => ({ ...state, [name]: value }));
    };

    return [state, handler] as const;
};

export const useCheckBox = (initialValue: ValueTypeObject) => {
    const [checkBoxState, setCheckBoxState] = useState(initialValue);

    const onClickCheckBox = (label: string, isChecked: boolean) => {
        setCheckBoxState((prev) => ({ ...prev, [label]: !isChecked }));
    };

    return [checkBoxState, onClickCheckBox] as const;
};

export const useEditor = (initialValue: string) => {
    const [editorContent, setEditorContent] = useState(initialValue);

    const onChangeEditorContent = (
        type: string,
        contentRef: RefObject<Editor>,
    ) => {
        if (type === 'html') {
            setEditorContent(contentRef.current?.getInstance().getHTML() ?? '');
        }

        if (type === 'markdown') {
            setEditorContent(
                contentRef.current?.getInstance().getMarkdown() ?? '',
            );
        }
    };

    return [editorContent, onChangeEditorContent] as const;
};

export const useGenerateId = ({
    prefix = '',
    postfix = '',
}: IUseGenerateId) => {
    const prefixString = prefix !== '' ? `${prefix}-` : '';
    const postfixString = postfix !== '' ? `-${postfix}` : '';
    return `${prefixString}${useId()}${postfixString}`;
};

