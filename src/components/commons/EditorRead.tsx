import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function EditorRead(props: { content: string }) {
    const { content } = props;
    return (
        <Wrapper>
            <Viewer initialValue={content} />
        </Wrapper>
    );
}

const Wrapper = styled.article`
    width: 100%;
`;
