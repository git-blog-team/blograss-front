import { useReactQuery, useReactQueryPost } from '@/api/http';
import DropDown, { StyledDropdown } from '@/components/commons/DropDown';
import Input, { StyledWrapperInput } from '@/components/commons/Input';
import Pagination from '@/components/commons/Pagination';
import CommonTable from '@/components/commons/Table';
import {
    COMMENT_LIST_API_URL,
    POST_LIST_API_URL,
    REPORT_API_URL,
} from '@/constants/api';
import { ACCESS_TOKEN, CREATED_AT, DESC } from '@/constants/common';
import { reportSortOptions, reportStatusOptions } from '@/constants/optioins';
import { useDropdowns } from '@/hooks/commons';
import {
    StyledCommonMenuTitle,
    StyledCommonWrapper,
    statusColor,
} from '@/styles/commons';
import { normalRowStyles, spaceBetweenRowStyles } from '@/styles/flexModules';
import { statusToWord } from '@/utils';
import { dateToYYMMDD } from '@/utils/dateUtils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export default function Report() {
    const [reportMenuState, handleReportMenu] = useState('Post');
    const [dropdownStates, handleDropdowns] = useDropdowns({
        sort: {
            label: '신고일자 : 최근순',
            value: { sortField: CREATED_AT, value: DESC },
        },
        status: { label: '상태전체', value: '' },
    });

    const { mutation: loginMutation } = useReactQueryPost({
        url: '/admin/login',
    });
    const [keyWord, setKeyword] = useState('');

    const router = useRouter();
    const { page } = router.query;

    const { data, refetch } = useReactQuery({
        url: `${REPORT_API_URL}/${
            reportMenuState === 'Post'
                ? POST_LIST_API_URL
                : COMMENT_LIST_API_URL
        }`,
        params: {
            page: 1,
            type: null,
            status: dropdownStates.status.value ?? null,
            sortField: dropdownStates.sort.value.sortField ?? CREATED_AT,
            sortOrder: dropdownStates.sort.value.value ?? DESC,
            search: keyWord ?? null,
            rowCount: 10,
        },
    });
    const onChangeKeyword = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }, 500);
    const onClickReportMenu = (menu: string) => () => {
        handleReportMenu(menu);
    };

    return (
        <StyledMain>
            <StyledReportMenu reportMenuState={reportMenuState}>
                <button onClick={onClickReportMenu('Post')}>
                    게시물 신고 목록
                </button>
                <button onClick={onClickReportMenu('Comment')}>
                    댓글 신고 목록
                </button>
            </StyledReportMenu>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>신고 관리</StyledCommonMenuTitle>
                    <div>
                        <DropDown
                            options={reportSortOptions}
                            value={dropdownStates.sort}
                            name="sort"
                            onChange={handleDropdowns}
                        />
                        <DropDown
                            options={reportStatusOptions}
                            value={dropdownStates.status}
                            name="status"
                            onChange={handleDropdowns}
                        />
                        <Input
                            onChange={onChangeKeyword}
                            height="38px"
                            placeholder="게시물 유저 검색"
                            isSearch={true}
                        />
                    </div>
                </StyledTopContents>

                <CommonTable
                    isEmptyList={!data?.result}
                    headers={[
                        { contents: 'NO.', width: '200px' },
                        { contents: '신고날짜', width: '200px' },
                        { contents: '게시물/댓글', width: '200px' },
                        { contents: '신고자', width: '200px' },
                        { contents: '게시물 유저', width: '200px' },
                        { contents: '사유', width: '200px' },
                        { contents: '상태', width: '200px' },
                        { contents: '조치 날짜', width: '200px' },
                    ]}
                >
                    <>
                        {_.map(data?.result, (item, index) => (
                            <tr
                                onClick={() =>
                                    router.push(`/report/${item.reportId}`)
                                }
                                key={item.reportId}
                            >
                                <td>{index + 1}</td>
                                <td>{dateToYYMMDD(item.createdAt)}</td>
                                <td>{item.target}</td>
                                <td>{item.userId}</td>
                                <td>{item.targetObject?.userId}</td>
                                <td>{item.type}</td>
                                <StyledStatusColor status={item.status}>
                                    {statusToWord(item.status)}
                                </StyledStatusColor>
                                <td>
                                    {item.solvedAt
                                        ? dateToYYMMDD(item.solvedAt)
                                        : '-'}
                                </td>
                            </tr>
                        ))}
                    </>
                </CommonTable>
                {data?.count && (
                    <Pagination
                        totalItems={data.count}
                        itemsPerPage={10}
                        pagesPerBlock={10}
                        currentPage={Number(page)}
                    />
                )}
            </StyledCommonWrapper>
        </StyledMain>
    );
}
export const StyledStatusColor = styled.td<{ status: string }>`
    color: ${statusColor};
`;
const StyledMain = styled.div`
    > div > div:nth-of-type(2) {
        height: 600px;
        width: 100%;
        tbody {
            tr {
                &:hover {
                    box-shadow: 0px 0px 2px
                        ${(props) => props.theme.colors.line_default};
                    cursor: pointer;
                }
            }
        }
    }
`;
const StyledTopContents = styled.div`
    ${spaceBetweenRowStyles};
    > div {
        ${normalRowStyles}
    }
    ${StyledDropdown} {
        margin: 0 10px 0 0;
    }
    ${StyledWrapperInput} {
        width: 250px;
        border-radius: 5px;
        input {
            ::placeholder {
                font-size: 12px;
            }
        }
    }
`;

const StyledReportMenu = styled.div<{ reportMenuState: string }>`
    button {
        background-color: white;
        box-shadow: 0px 0px 2px ${(props) => props.theme.colors.line_default};
        width: 250px;
        height: 40px;
        font-size: 14px;
        font-weight: 700;
        border-bottom: unset;
        border: unset;
        border-radius: 5px 5px 0 0;
        margin: 0 10px 0 0;
        cursor: pointer;

        :first-of-type {
            ${(props) =>
                props.reportMenuState === 'Post' &&
                css`
                    color: ${props.theme.colors.point_orange};
                    font-weight: 700;
                `};
        }
        :last-of-type {
            ${(props) =>
                props.reportMenuState === 'Comment' &&
                css`
                    color: ${props.theme.colors.point_orange};
                    font-weight: 700;
                `};
        }
    }
`;
