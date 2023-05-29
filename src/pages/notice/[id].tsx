import { useReactQuery, useReactQueryDelete } from '@/api/http';
import { NOTICE_API_URL } from '@/constants/api';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { normalRowStyles } from '@/styles/flexModules';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Button, { StyledButton } from '@/components/commons/Button';
import { NOTICE_CREATE_PAGE_URL, NOTICE_PAGE_URL } from '@/constants/utl';

const EditorRead = dynamic(
    async () => await import('@/components/commons/EditorRead'),
    {
        ssr: false,
    },
);

export default function NoticeDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useReactQuery({
        url: NOTICE_API_URL,
        renderLater: !id,
        params: {
            noticeId: id,
        },
    });
    const { mutation: deleteNotice } = useReactQueryDelete({
        url: NOTICE_API_URL,
    });
    const { title, noticeId, content, createdAt, imageIds } =
        data?.result?.[0] ?? '';

    const onClickEdit = () => {
        router.push({
            pathname: NOTICE_CREATE_PAGE_URL,
            query: { id: noticeId },
        });
    };

    const onClickDelete = () => {
        deleteNotice(
            { noticeIds: [noticeId] },
            {
                onSuccess: () => {
                    alert('공지가 삭제되었습니다.');
                    router.push(NOTICE_PAGE_URL);
                },
                onError: (err) => console.log(err),
            },
        );
    };
    return (
        <StyledNoticeDetail>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>{title}</StyledCommonMenuTitle>
                    <p>작성일 : {dateToYYMMDD(createdAt)}</p>
                    <Button onClick={onClickEdit}>수정</Button>
                    <Button onClick={onClickDelete}>삭제</Button>
                </StyledTopContents>
                <EditorRead content={content} />
            </StyledCommonWrapper>
        </StyledNoticeDetail>
    );
}

const StyledNoticeDetail = styled.div``;
const StyledTopContents = styled.div`
    ${normalRowStyles}
    >p {
        color: ${(props) => props.theme.colors.txt_gray};
        font-size: 12px;
        margin: 5px 0 0 0;
    }
    ${StyledButton} {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 11px;
        margin: 0 0 0 10px;
        :last-of-type {
            margin: 0 0 0 5px;
        }
    }
`;
