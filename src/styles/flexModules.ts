import { css } from '@emotion/react';

export const centerRowStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const normalRowStyles = () => css`
    display: flex;
    align-items: center;
`;

export const spaceBetweenRowStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const centerColumnStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const normalColumnStyles = () => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

/**
 * 네이밍 규칙을 아래와 같이 정의 했습니다.
 * - FlexDirection
 * - JustifyContent
 * - AlignItems
 * @returns
 */

export const ColumnFlexStartFlexStart = () => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ColumnFlexStartCenter = () => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
