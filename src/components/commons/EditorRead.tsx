import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from '@emotion/styled';

export default function EditorRead(props: { content: string }) {
    const { content } = props;
    const [initialized, setInitialized] = useState(false);
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        setInitialized(true);
    }, [content]);

    useEffect(() => {
        if (initialized && viewerRef.current) {
            viewerRef.current.getInstance()?.setMarkdown(content);
        }
    }, [content, initialized]);

    return (
        <Wrapper>
            <Viewer initialValue={content} ref={viewerRef} />
        </Wrapper>
    );
}
const Wrapper = styled.article`
    width: 100%;
`;
