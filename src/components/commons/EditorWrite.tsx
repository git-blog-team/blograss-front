import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useEffect, useRef } from 'react';

interface EditorOptions {
    height?: string;
    type: 'html' | 'markdown';
    initialValue?: string;
    onChange: (type: string, ref: any) => void;
}

export default function EditorWrite(options: EditorOptions) {
    const { height = '400px', type, initialValue = ' ', onChange } = options;
    const contentRef = useRef<Editor>(null);

    // img upload hook (기존 훅 제거 후, 같은 이름의 커스텀한 훅을 추가 [기존의(BASE64) 이미지 업로드 로직 변경])
    useEffect(() => {
        const editorInstance = contentRef.current?.getInstance();
        editorInstance?.removeHook('addImageBlobHook'); // <- 훅 제거
        editorInstance?.addHook('addImageBlobHook', () => {
            // 바꿀 이미지 업로드 로직 넣기..
        }); // <- 훅 추가 },
    }, []);

    return (
        <div style={{ padding: '10px' }}>
            <Editor
                ref={contentRef}
                onChange={() => {
                    onChange(type, contentRef);
                }}
                initialValue={initialValue}
                previewStyle="vertical"
                height={height}
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
            />
        </div>
    );
}
