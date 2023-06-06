import { centerColumnStyles, centerRowStyles } from '@/styles/flexModules';
import {
    type IPaginationProps,
    type IStyledLinkItemProps,
} from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';

const StyledWrapperColumn = styled.div`
    ${centerColumnStyles()}
`;

const StyledWrapperRow = styled.div`
    ${centerRowStyles()}
`;

const StyledLinkItem = styled.span<IStyledLinkItemProps>`
    font-size: 14px;
    margin: 0px 5px 0px 5px;
    color: ${(props) =>
        props.iscurrentpage === 'true'
            ? theme.colors.point_green2
            : theme.colors.point_green};
    font-weight: ${(props) =>
        props.iscurrentpage === 'true' ? 'bold' : 'normal'};
    :hover {
        color: ${(props) => theme.colors.point_green2};
        font-weight: bold;
    }
`;

export default function Pagination({
    totalItems,
    itemsPerPage,
    pagesPerBlock,
    currentPage,
}: //     pageUrl, 사용단에서 router.query.page 를 사용하면 될것같습니당
IPaginationProps) {
    const [isBlockArray, setIsBlockArray] = useState<number[]>([]);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startPage =
        currentPage % pagesPerBlock === 0
            ? currentPage - pagesPerBlock + 1
            : Math.floor(currentPage / pagesPerBlock) * pagesPerBlock + 1;
    const prevBlock =
        startPage - pagesPerBlock < 0 ? 1 : startPage - pagesPerBlock;
    const nextBlock =
        startPage + pagesPerBlock > totalPages
            ? totalPages
            : startPage + pagesPerBlock;

    const router = useRouter();

    const routePages = (page: number) => {
        //      router.push(url); 리스트에서 이렇게 보내니까 디테일페이지로 가버리는 이슈가 있어서
        // 아래와 같은 방식을 건의드립니답
        router.push({ pathname: router.pathname, query: { page } });
    };

    useEffect(() => {
        const blockArray = new Array(pagesPerBlock)
            .fill(startPage)
            .map((_, index) => startPage + index)
            .filter((item) => item <= totalPages);
        setIsBlockArray(blockArray);
    }, [currentPage]);

    return (
        <StyledWrapperColumn>
            <StyledWrapperRow>
                <StyledLinkItem onClick={() => routePages(1)}>
                    처음
                </StyledLinkItem>
                <StyledLinkItem onClick={() => routePages(prevBlock)}>
                    이전
                </StyledLinkItem>
                {isBlockArray.map((item) => (
                    <StyledLinkItem
                        key={item}
                        onClick={() => routePages(item)}
                        iscurrentpage={currentPage === item ? 'true' : 'false'}
                    >
                        {item}
                    </StyledLinkItem>
                ))}
                <StyledLinkItem onClick={() => routePages(nextBlock)}>
                    다음
                </StyledLinkItem>
                <StyledLinkItem onClick={() => routePages(totalPages)}>
                    끝
                </StyledLinkItem>
            </StyledWrapperRow>
        </StyledWrapperColumn>
    );
}
