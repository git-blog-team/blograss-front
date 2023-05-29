import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useEffect, useRef } from 'react';
import { type EditorOptions } from '@/types/interfaces/commons';
import axios from 'axios';
import { HookCallback } from '@toast-ui/editor/types/editor';

export default function EditorWrite(options: EditorOptions) {
    const { height = '400px', type, initialValue = ' ', onChange } = options;
    const contentRef = useRef<Editor>(null);

    const imgUpload = async (file: File, callback: HookCallback) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log('이미지 파일 정보', file);
        console.log('폼데이터', formData);
        axios({
            method: 'post',
            url: 'https://api.blograss.com/image',
            data: formData,
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtNzFrckBuYXZlci5jb20iLCJleHAiOjE2ODUzNzEyODksInR5cGUiOiJBY2Nlc3MiLCJhdXRob3JpdHkiOiJST0xFX1VTRVIifQ.kQ7Fk046mg0mPiaI3qh8Cgg-OJkMJDN4iaLMOoBqJEdTlGKvZ_AhRvFPcrMYFUJiBj8vsIXfL5ITHpqr3FwOQg',
            },
        })
            .then((res) => {
                console.log(res);
                const result = `https://blograss-bucket.s3.ap-northeast-2.amazonaws.com/images/${res.data.result[0]}`;
                callback(result, 'alt_text');
            })
            .catch((error) => {
                console.log('폼데이터', formData);
                console.log(error);
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
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                hideModeSwitch={true}
            />
        </div>
    );
}
