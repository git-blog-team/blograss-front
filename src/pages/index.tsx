import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import styled from '@emotion/styled';
import { useEditor } from '@/hooks/commons';
import dynamic from 'next/dynamic';

const EditorWrite = dynamic(
    async () => await import('@/components/commons/EditorWrite'),
    { ssr: false },
);

export default function Home() {
    const [, onChangeEditorContent] = useEditor('');
    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                </StyledTopContents>
                <div>dddd</div>
            </StyledCommonWrapper>
            <EditorWrite type={'html'} onChange={onChangeEditorContent} />
        </StyledMain>
    );
}
const StyledMain = styled.div`
    > div > div:last-of-type {
        height: 600px;
        width: 100%;
    }
`;

const StyledTopContents = styled.div``;
