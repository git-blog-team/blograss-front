import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useEffect, useRef } from 'react';
import { type EditorOptions } from '@/types/interfaces/commons';

import { HookCallback } from '@toast-ui/editor/types/editor';
import axios from '../../api/middlewares';
import { AxiosResponse } from 'axios';

export default function EditorWrite(options: EditorOptions) {
    const { height = '400px', type, initialValue = ' ', onChange } = options;
    const contentRef = useRef<Editor>(null);

    const imgUpload = async (file: File, callback: HookCallback) => {
        const formData = new FormData();
        formData.append('file', file);
        await axios({
            method: 'post',
            url: 'https://api.blograss.com/image',
            data: formData,
        })
            .then((res: any) => {
                const result = `https://blograss-bucket.s3.ap-northeast-2.amazonaws.com/images/${res.result[0]}`;
                callback(result, 'alt_text');
            })
            .catch((error) => {
                alert(error);
            });
    };

    // img upload hook (기존 훅 제거 후, 같은 이름의 커스텀한 훅을 추가 [기존의(BASE64) 이미지 업로드 로직 변경])
    useEffect(() => {
        const editorInstance = contentRef.current?.getInstance();
        editorInstance?.removeHook('addImageBlobHook'); // <- 훅 제거
        editorInstance?.addHook('addImageBlobHook', (file, callback) => {
            // 바꿀 이미지 업로드 로직 넣기..
            imgUpload(file, callback);
        }); // <- 훅 추가 },
    }, []);

    return (
        <div>
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
