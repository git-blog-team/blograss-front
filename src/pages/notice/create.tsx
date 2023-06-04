import { useReactQuery, useReactQueryPost, useReactQueryPut } from '@/api/http';
import Button, { StyledButton } from '@/components/commons/Button';
import Input, { StyledWrapperInput } from '@/components/commons/Input';
import { NOTICE_API_URL } from '@/constants/api';
import { NOTICE_PAGE_URL } from '@/constants/utl';
import { useEditor } from '@/hooks/commons';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { centerColumnStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const EditorWrite = dynamic(
    async () => await import('@/components/commons/EditorWrite'),
    { ssr: false },
);

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
                        /* 
                        👇 title => title || '' 
                        client.js:1 Warning: A component is changing a controlled input to be uncontrolled.
                        This is likely caused by the value changing from a defined to undefined, which should not happen.
                        Decide between using a controlled or uncontrolled input element for the lifetime of the component.
                        */
                        value={title || ''}
                    />
                    {/* 삼항연산자를 사용하면 최초 렌더링 시, contents가 undefined이기 때문에,
                    빈값인 작성하기 경우의 에디터로 렌더링 되는 문제가 있어 다음과 같이 함. */}
                    {dataContents !== undefined && (
                        <EditorWrite
                            type={'markdown'}
                            // 받는 데이터의 타입이 html아닌, markdown형식의 글 내용이여야 함
                            initialValue={dataContents || ' '}
                            onChange={onChangeEditorContent}
                        />
                    )}
                    {dataContents == undefined && (
                        <EditorWrite
                            type={'markdown'}
                            // 받는 데이터의 타입이 html아닌, markdown형식의 글 내용이여야 함
                            initialValue={dataContents || ' '}
                            onChange={onChangeEditorContent}
                        />
                    )}
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
