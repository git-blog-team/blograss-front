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

export const useCheckBox = (initialValue: ValueTypeObject) => {
    const [checkBoxState, setCheckBoxState] = useState(initialValue);

    const onClickCheckBox = (label: string, isChecked: boolean) => {
        setCheckBoxState((prev) => ({ ...prev, [label]: !isChecked }));
    };

    return [checkBoxState, onClickCheckBox] as const;
};

export const useEditor = (initialValue: string) => {
    const [editorContent, setEditorContent] = useState(initialValue);

    const onChangeEditorContent = (type: string, contentRef: any) => {
        if (type === 'html') {
            setEditorContent(contentRef.current?.getInstance().getHTML());
            console.log(editorContent);
        }

        if (type === 'markdown') {
            setEditorContent(contentRef.current?.getInstance().getMarkdown());
            console.log(editorContent);
        }
    };

    return [editorContent, onChangeEditorContent] as const;
};
