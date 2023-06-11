import { useReactQuery, useReactQueryPost } from '@/api/http';
import Button from '@/components/commons/Button';
import { REPORT_API_URL } from '@/constants/api';
import { APPROVAL, PENDING } from '@/constants/common';
import {
    StyledCommonMenuTitle,
    StyledCommonWrapper,
    statusColor,
} from '@/styles/commons';
import { normalColumnStyles, normalRowStyles } from '@/styles/flexModules';
import { statusToWord } from '@/utils';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function ReportDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data, refetch } = useReactQuery({
        renderLater: !id,
        url: `${REPORT_API_URL}`,
        params: {
            reportId: id,
        },
    });
    const { createdAt, status, target, targetObject, type, updatedAt, userId } =
        data?.result?.[0] ?? '';

    const { mutation: mutateDeny } = useReactQueryPost({
        url: `${REPORT_API_URL}/deny`,
    });
    const { mutation: mutateAccept } = useReactQueryPost({
        url: `${REPORT_API_URL}/accept`,
    });

    const onClickUpdateStatus = (mutateTarget: string) => () => {
        const mutation = mutateTarget === 'accept' ? mutateAccept : mutateDeny;

        mutation({ reportId: id }, { onSuccess: () => refetch() });
    };

    return (
        <StyledReportDetail>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>
                        {target === 'POST' ? '게시물' : '댓글'} 신고 심사하기
                    </StyledCommonMenuTitle>
                </StyledTopContents>
                <StyledContents status={status}>
                    <div>
                        <label>신고일</label> <p>{dateToYYMMDD(createdAt)}</p>
                    </div>
                    <div>
                        <label>유형</label>
                        <p>{target === 'POST' ? '게시물' : '댓글'}</p>
                    </div>
                    <div>
                        <label>신고자</label> <p>{userId}</p>
                    </div>
                    <div>
                        <label>
                            {target === 'POST' ? '게시물' : '댓글'} 작성자
                        </label>
                        <p>{targetObject?.userId}</p>
                    </div>
                    <div>
                        <label>신고사유</label> <p>{type}</p>
                    </div>
                    <div>
                        <label>상태</label> <p>{statusToWord(status)}</p>
                        <StyledStatusUpdateButtonWrapper>
                            {status === PENDING ? (
                                <>
                                    <Button
                                        onClick={onClickUpdateStatus('accept')}
                                    >
                                        승인
                                    </Button>
                                    <Button
                                        onClick={onClickUpdateStatus('deny')}
                                    >
                                        거절
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={onClickUpdateStatus(
                                        status === APPROVAL ? 'accept' : 'deny',
                                    )}
                                >
                                    {statusToWord(status)} 취소
                                </Button>
                            )}
                        </StyledStatusUpdateButtonWrapper>
                    </div>
                    <div>
                        <label>조치날짜</label>{' '}
                        <p>{dateToYYMMDD(updatedAt) ?? '-'}</p>
                    </div>
                    {target !== 'POST' && (
                        <div>
                            <label>해당 댓글</label>
                            <p>
                                <b>
                                    제목 : {targetObject?.title ?? '제목없음'}
                                </b>
                                <br />
                                <span>
                                    {targetObject?.content ?? '내용없음'}
                                </span>
                            </p>
                        </div>
                    )}
                    {/* TODO: 에디터 뷰어 수정후 게시물쪽 반영필요 */}
                </StyledContents>
            </StyledCommonWrapper>
        </StyledReportDetail>
    );
}

const StyledStatusUpdateButtonWrapper = styled.div`
    margin: 0 0 0 30px;
    button {
        height: 35px;
        line-height: 35px;
        padding: 0 15px;
        :last-of-type {
            margin: 0 0 0 10px;
        }
    }
`;
const StyledContents = styled.div<{ status: string }>`
    display: flex;
    margin: 15px 0 0 0;
    ${normalColumnStyles};
    > div {
        ${normalRowStyles}
        height: 40px;
        padding: 0 0 0 20px;
        > label {
            width: 100px;
            height: fit-content;
            margin: 0 10px 0 0;
            line-height: 20px;
            font-size: 14px;
        }
        > p {
            max-width: 1000px;
            word-break: break-all;
            font-size: 14px;
            line-height: 20px;
            > b {
                font-weight: 700;
            }
        }
        :nth-of-type(6) {
            align-items: center;
            height: 60px;
            width: fit-content;
            padding: 0 20px;
            border: 1px solid ${(props) => props.theme.colors.line_default};
            border-style: dotted;
            > p {
                color: ${statusColor};
                font-weight: 700;
            }
        }
    }
`;
const StyledReportDetail = styled.div`
    > div > div:last-of-type {
        margin: 15px 0 0 20px;
    }
`;
const StyledTopContents = styled.div`
    ${normalRowStyles};
`;
