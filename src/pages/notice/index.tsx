import { useReactQuery } from '@/api/http';
import DropDown from '@/components/commons/DropDown';
import Pagination from '@/components/commons/Pagination';
import CommonTable from '@/components/commons/Table';
import { NOTICE_LIST_API_URL } from '@/constants/api';
import { ASC, CREATED_AT, DESC } from '@/constants/common';
import { NOTICE_CREATE_PAGE_URL } from '@/constants/utl';
import { useDropdowns } from '@/hooks/commons';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { normalRowStyles } from '@/styles/flexModules';
import { spaceBetweenRowStyles } from '@/styles/flexModules';
import { centerRowStyles } from '@/styles/flexModules';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Notice() {
    const [dropdownStates, handleDropdowns] = useDropdowns({
        sort: { label: '최신순', value: DESC },
    });

    const router = useRouter();
    const { page } = router.query;
    const { data, isLoading } = useReactQuery({
        url: NOTICE_LIST_API_URL,
        params: {
            search: null,
            sortField: CREATED_AT,
            sortOrder: dropdownStates.sort.value,
            page: page ?? 1,
            rowCount: 10,
        },
    });

    return (
        <StyledNotice>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                    <div>
                        <DropDown
                            options={[
                                { label: '최신순', value: DESC },
                                { label: '오래된 순', value: ASC },
                            ]}
                            value={dropdownStates.sort}
                            name="sort"
                            onChange={handleDropdowns}
                        />
                        <Link href={NOTICE_CREATE_PAGE_URL}>
                            <StyledLink>작성하기</StyledLink>
                        </Link>
                    </div>
                </StyledTopContents>
                <CommonTable
                    isEmptyList={!isLoading && !data?.result}
                    headers={[
                        { contents: 'NO.', width: '200px' },
                        { contents: '공지사항 제목', width: '1000px' },
                        { contents: '생성일', width: '300px' },
                    ]}
                >
                    <>
                        {_.map(data?.result, (item, index) => (
                            <tr key={item.noticeId}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link href={`/notice/${item.noticeId}`}>
                                        <div> {item.title}</div>
                                    </Link>
                                </td>
                                <td>{dateToYYMMDD(item.createdAt)}</td>
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
        </StyledNotice>
    );
}
const StyledNotice = styled.div`
    > div > div:nth-of-type(2) {
        height: 600px;
        width: 100%;
        tbody > tr > td {
            :nth-of-type(2) {
                &:hover {
                    box-shadow: 0px 0px 2px
                        ${(props) => props.theme.colors.point_green2};
                    cursor: pointer;
                }
                > a {
                    text-decoration: none;
                    color: black;
                    ${centerRowStyles}
                    > div {
                        width: 100%;
                    }
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
`;

const StyledLink = styled.p`
    padding: 0 15px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: ${(props) => props.theme.colors.point_green};
    border: 1px solid ${(props) => props.theme.colors.line_default};
    margin: 0 0 0 10px;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
`;
