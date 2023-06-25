import { useReactQuery } from '@/api/http';
import CommonTable from '@/components/commons/Table';
import {
    BANNER_LIST_API_URL,
    COMMENT_LIST_API_URL,
    NOTICE_LIST_API_URL,
    POST_LIST_API_URL,
    REPORT_API_URL,
} from '@/constants/api';
import { CREATED_AT, DESC } from '@/constants/common';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StyledStatusColor } from './report';
import { statusToWord } from '@/utils';
import { spaceBetweenRowStyles } from '@/styles/flexModules';

export default function Home() {
    const router = useRouter();
    const { data: noticeData, isLoading } = useReactQuery({
        url: NOTICE_LIST_API_URL,
        params: {
            search: null,
            sortField: CREATED_AT,
            sortOrder: DESC,
            page: 1,
            rowCount: 5,
        },
    });

    const { data: CommentReportData } = useReactQuery({
        url: `${REPORT_API_URL}/${COMMENT_LIST_API_URL}`,
        params: {
            page: 1,
            type: null,
            status: null,
            sortField: CREATED_AT,
            sortOrder: DESC,
            search: null,
            rowCount: 5,
        },
    });
    const { data: postReportData } = useReactQuery({
        url: `${REPORT_API_URL}/${POST_LIST_API_URL}`,
        params: {
            page: 1,
            type: null,
            status: null,
            sortField: CREATED_AT,
            sortOrder: DESC,
            search: null,
            rowCount: 5,
        },
    });

    const { data: bannerData } = useReactQuery({
        url: BANNER_LIST_API_URL,
        params: {
            search: null,
            bannerType: null,
            sortField: CREATED_AT,
            sortOrder: DESC,
            page: 1,
            rowCount: 5,
        },
    });
    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>
                        최근 등록된 컨텐츠
                    </StyledCommonMenuTitle>
                </StyledTopContents>
                <StyledMainContents>
                    <div>
                        {' '}
                        <div>
                            <label>
                                <span>new</span>공지사항
                            </label>
                            {noticeData?.result && (
                                <CommonTable
                                    isEmptyList={false}
                                    headers={[
                                        { contents: 'NO.', width: '50px' },
                                        {
                                            contents: '공지사항 제목',
                                            width: '400px',
                                        },
                                        { contents: '생성일', width: '130px' },
                                    ]}
                                >
                                    <>
                                        {_.map(
                                            noticeData?.result,
                                            (item, index) => (
                                                <tr
                                                    key={item.noticeId}
                                                    onClick={() =>
                                                        router.push(
                                                            `/notice/${item.noticeId}`,
                                                        )
                                                    }
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div> {item.title}</div>
                                                    </td>
                                                    <td>
                                                        {dateToYYMMDD(
                                                            item.createdAt,
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </>
                                </CommonTable>
                            )}
                        </div>
                        <div>
                            <label>
                                <span>new</span>배너
                                <CommonTable
                                    isEmptyList={
                                        !isLoading && !bannerData?.result
                                    }
                                    headers={[
                                        { contents: 'NO.', width: '50px' },
                                        {
                                            contents: '배너 제목',
                                            width: '270px',
                                        },
                                        {
                                            contents: '배너 타입',
                                            width: '130px',
                                        },
                                        { contents: '생성일', width: '130px' },
                                    ]}
                                >
                                    <>
                                        {_.map(
                                            bannerData?.result,
                                            (item, index) => (
                                                <tr
                                                    onClick={() =>
                                                        router.push(
                                                            `/banner/${item.bannerId}`,
                                                        )
                                                    }
                                                    key={item.bannerId}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div>
                                                            {' '}
                                                            {item.bannerName}
                                                        </div>
                                                    </td>
                                                    <td>{item.bannerType}</td>
                                                    <td>
                                                        {dateToYYMMDD(
                                                            item.createdAt,
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </>
                                </CommonTable>
                            </label>
                        </div>
                    </div>
                    <div>
                        {' '}
                        <div>
                            <label>
                                <span>new</span>신고 게시물
                            </label>
                            {postReportData?.result && (
                                <CommonTable
                                    isEmptyList={false}
                                    headers={[
                                        { contents: 'NO.', width: '50px' },
                                        {
                                            contents: '신고날짜',
                                            width: '110px',
                                        },
                                        { contents: '사유', width: '200px' },
                                        { contents: '상태', width: '100px' },
                                        {
                                            contents: '조치 날짜',
                                            width: '120px',
                                        },
                                    ]}
                                >
                                    <>
                                        {_.map(
                                            postReportData?.result,
                                            (item, index) => (
                                                <tr
                                                    onClick={() =>
                                                        router.push(
                                                            `/report/${item.reportId}`,
                                                        )
                                                    }
                                                    key={item.reportId}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {dateToYYMMDD(
                                                            item.createdAt,
                                                        )}
                                                    </td>

                                                    <td>{item.type}</td>
                                                    <StyledStatusColor
                                                        status={item.status}
                                                    >
                                                        {statusToWord(
                                                            item.status,
                                                        )}
                                                    </StyledStatusColor>
                                                    <td>
                                                        {item.solvedAt
                                                            ? dateToYYMMDD(
                                                                  item.solvedAt,
                                                              )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </>
                                </CommonTable>
                            )}
                        </div>
                        <div>
                            <label>
                                <span>new</span>신고 댓글
                            </label>
                            {CommentReportData?.result && (
                                <CommonTable
                                    isEmptyList={false}
                                    headers={[
                                        { contents: 'NO.', width: '50px' },
                                        {
                                            contents: '신고날짜',
                                            width: '110px',
                                        },

                                        { contents: '사유', width: '200px' },
                                        { contents: '상태', width: '100px' },
                                        {
                                            contents: '조치 날짜',
                                            width: '120px',
                                        },
                                    ]}
                                >
                                    <>
                                        {_.map(
                                            CommentReportData?.result,
                                            (item, index) => (
                                                <tr
                                                    onClick={() =>
                                                        router.push(
                                                            `/report/${item.reportId}`,
                                                        )
                                                    }
                                                    key={item.reportId}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {dateToYYMMDD(
                                                            item.createdAt,
                                                        )}
                                                    </td>

                                                    <td>{item.type}</td>
                                                    <StyledStatusColor
                                                        status={item.status}
                                                    >
                                                        {statusToWord(
                                                            item.status,
                                                        )}
                                                    </StyledStatusColor>
                                                    <td>
                                                        {item.solvedAt
                                                            ? dateToYYMMDD(
                                                                  item.solvedAt,
                                                              )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </>
                                </CommonTable>
                            )}
                        </div>
                    </div>
                </StyledMainContents>
            </StyledCommonWrapper>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    > div > div:last-of-type {
        min-height: 600px;
        width: 100%;
    }
`;

const StyledTopContents = styled.div``;
const StyledMainContents = styled.div`
    > div {
        ${spaceBetweenRowStyles}
        > div {
            margin: 0 0 30px 0;
            > label {
                font-size: 16px;
                > span {
                    font-size: 13px;
                    color: ${(props) => props.theme.colors.point_orange};
                    margin: 0 5px 0 0;
                }
            }
            tbody {
                tr {
                    :hover {
                        background-color: ${(props) =>
                            props.theme.colors.bg_orange};
                    }
                    cursor: pointer;
                }
            }
        }
    }
`;
