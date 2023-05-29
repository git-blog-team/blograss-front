import { useReactQuery, useReactQueryPost, useReactQueryPut } from '@/api/http';
import Button, { StyledButton } from '@/components/commons/Button';
import EditorWrite from '@/components/commons/EditorWrite';
import Input, { StyledWrapperInput } from '@/components/commons/Input';
import { NOTICE_API_URL } from '@/constants/api';
import { NOTICE_PAGE_URL } from '@/constants/utl';
import { useEditor } from '@/hooks/commons';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { centerColumnStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CreateNotice() {
    const router = useRouter();
    const noticeId = router.query.id;
    const isEdit = !!noticeId;
    const [editorContent, onChangeEditorContent] = useEditor('');
    const [title, setTitle] = useState('');
    const [dataContents, setDataContent] = useState('');
    const { mutation: createNotice } = useReactQueryPost({
        url: NOTICE_API_URL,
    });
    const { mutation: editNotice } = useReactQueryPut({
        url: NOTICE_API_URL,
    });

    const { data } = useReactQuery({
        url: NOTICE_API_URL,
        renderLater: !noticeId,
        params: {
            noticeId: noticeId,
        },
    });

    const onClickSubmit = () => {
        const mutation = isEdit ? editNotice : createNotice;

        const variables = {
            title,
            content: editorContent,
            imageIds: [],
            ...(isEdit ? { noticeId } : {}),
        };

        mutation(variables, {
            onSuccess: () => {
                alert(`공지사항이 ${isEdit ? '수정' : '등록'}되었습니다.`);
                router.push(NOTICE_PAGE_URL);
            },
        });
    };

    useEffect(() => {
        const { title, content } = data?.result?.[0] ?? '';
        setTitle(title);
        setDataContent(content);
    }, [data]);

    return (
        <StyledCreateNotice>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 작성</StyledCommonMenuTitle>
                </StyledTopContents>
                <StyledContents>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="타이틀을 작성해주세요"
                        value={title}
                    />
                    {/* <EditorWrite
                        type={'html'}
                        initialValue={dataContents}
                        onChange={onChangeEditorContent}
                    /> */}
                    <Button onClick={onClickSubmit} disabled={!editorContent}>
                        {isEdit ? '수정하기' : '등록하기'}
                    </Button>
                </StyledContents>
            </StyledCommonWrapper>
        </StyledCreateNotice>
    );
}

const StyledCreateNotice = styled.div``;
const StyledTopContents = styled.div``;
const StyledContents = styled.div`
    ${centerColumnStyles};
    ${StyledWrapperInput} {
        border-radius: 5px;
        margin: 10px 3px;
        width: 950px;
    }
    ${StyledButton} {
        width: 300px;
    }
`;
