import { useReactQuery } from '@/api/http';
import DropDown, { StyledDropdown } from '@/components/commons/DropDown';
import Input from '@/components/commons/Input';
import { StyledWrapperInput } from '@/components/commons/Input';
import CommonTable from '@/components/commons/Table';
import { BANNER_LIST_API_URL } from '@/constants/api';
import { CREATED_AT, DESC } from '@/constants/common';
import {
    bannerSortOptions,
    bannerTypeFilterOptions,
} from '@/constants/optioins';
import { BANNER_CREATE_PAGE_URL } from '@/constants/utl';
import { useDropdowns } from '@/hooks/commons';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { normalRowStyles } from '@/styles/flexModules';
import { spaceBetweenRowStyles } from '@/styles/flexModules';
import { centerRowStyles } from '@/styles/flexModules';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import _ from 'lodash';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export default function Banner() {
    const [dropdownStates, handleDropdowns] = useDropdowns({
        sort: {
            label: '생성일순 : 최근순',
            value: { sortField: CREATED_AT, value: DESC },
        },
        bannerType: { label: '배너타입 전체', value: '' },
    });
    const [keyWord, setKeyword] = useState('');

    const { data, isLoading } = useReactQuery({
        url: BANNER_LIST_API_URL,
        params: {
            search: keyWord ?? null,
            bannerType: dropdownStates.bannerType.value ?? null,
            sortField: dropdownStates.sort.value.sortField ?? CREATED_AT,
            sortOrder: dropdownStates.sort.value.value ?? DESC,
            page: 1,
        },
    });
    const onChangeKeyword = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }, 500);

    return (
        <StyledNotice>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                    <div>
                        <DropDown
                            options={bannerTypeFilterOptions}
                            value={dropdownStates.bannerType}
                            name="bannerType"
                            onChange={handleDropdowns}
                        />
                        <DropDown
                            options={bannerSortOptions}
                            value={dropdownStates.sort}
                            name="sort"
                            onChange={handleDropdowns}
                        />
                        <Input
                            onChange={onChangeKeyword}
                            height="38px"
                            isSearch={true}
                        />
                        <Link href={BANNER_CREATE_PAGE_URL}>
                            <StyledLink>배너등록하기</StyledLink>
                        </Link>
                    </div>
                </StyledTopContents>
                <CommonTable
                    isEmptyList={!isLoading && !data?.result}
                    headers={[
                        { contents: 'NO.', width: '200px' },
                        { contents: '배너 제목', width: '1000px' },
                        { contents: '배너 타입', width: '300px' },
                        { contents: '생성일', width: '300px' },
                        { contents: '시작일', width: '300px' },
                        { contents: '종료일', width: '300px' },
                    ]}
                >
                    <>
                        {_.map(data?.result, (item, index) => (
                            <tr key={item.bannerId}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link href={`/banner/${item.bannerId}`}>
                                        <div> {item.bannerName}</div>
                                    </Link>
                                </td>
                                <td>{item.bannerType}</td>
                                <td>{dateToYYMMDD(item.createdAt)}</td>
                                <td>{dateToYYMMDD(item.endedAt)}</td>
                                <td>{dateToYYMMDD(item.startedAt)}</td>
                            </tr>
                        ))}
                    </>
                </CommonTable>
            </StyledCommonWrapper>
        </StyledNotice>
    );
}
const StyledNotice = styled.div`
    > div > div:last-of-type {
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
        ${StyledDropdown} {
            margin: 0 10px 0 0;
        }
        ${StyledWrapperInput} {
            width: 250px;
            border-radius: 5px;
        }
    }
`;

const StyledLink = styled.p`
    padding: 0 15px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid ${(props) => props.theme.colors.line_default};
    margin: 0 0 0 10px;
    border-radius: 5px;
    font-size: 12px;
    color: black;
    cursor: pointer;
    :hover {
        border: 1px solid ${(props) => props.theme.colors.point_orange};
    }
`;
