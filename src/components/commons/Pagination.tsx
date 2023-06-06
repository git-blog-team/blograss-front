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
    pageUrl,
}: IPaginationProps) {
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

    const routePages = (url: string) => {
        router.push(url);
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
                <StyledLinkItem onClick={() => routePages(`${pageUrl}/1`)}>
                    처음
                </StyledLinkItem>
                <StyledLinkItem
                    onClick={() => routePages(`${pageUrl}/${prevBlock}`)}
                >
                    이전
                </StyledLinkItem>
                {isBlockArray.map((item) => (
                    <StyledLinkItem
                        key={item}
                        onClick={() => routePages(`${pageUrl}/${item}`)}
                        iscurrentpage={currentPage === item ? 'true' : 'false'}
                    >
                        {item}
                    </StyledLinkItem>
                ))}
                <StyledLinkItem
                    onClick={() => routePages(`${pageUrl}/${nextBlock}`)}
                >
                    다음
                </StyledLinkItem>
                <StyledLinkItem
                    onClick={() => routePages(`${pageUrl}/${totalPages}`)}
                >
                    끝
                </StyledLinkItem>
            </StyledWrapperRow>
        </StyledWrapperColumn>
    );
}
