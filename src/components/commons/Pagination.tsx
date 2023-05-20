import { centerColumnStyles, centerRowStyles } from '@/styles/flexModules';
import {
    type IPaginationProps,
    type IStyledLinkItemProps,
} from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';

const StyledWrapperColumn = styled.div`
    ${centerColumnStyles()}
`;

const StyledWrapperRow = styled.div`
    ${centerRowStyles()}
`;

const StyledLinkItem = styled(Link)<IStyledLinkItemProps>`
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
                <StyledLinkItem href={`${pageUrl}/1`}>처음</StyledLinkItem>
                <StyledLinkItem href={`${pageUrl}/${prevBlock}`}>
                    이전
                </StyledLinkItem>
                {isBlockArray.map((item) => (
                    <StyledLinkItem
                        key={item}
                        href={`${pageUrl}/${item}`}
                        iscurrentpage={currentPage === item ? 'true' : 'false'}
                    >
                        {item}
                    </StyledLinkItem>
                ))}
                <StyledLinkItem href={`${pageUrl}/${nextBlock}`}>
                    다음
                </StyledLinkItem>
                <StyledLinkItem href={`${pageUrl}/${totalPages}`}>
                    끝
                </StyledLinkItem>
            </StyledWrapperRow>
        </StyledWrapperColumn>
    );
}