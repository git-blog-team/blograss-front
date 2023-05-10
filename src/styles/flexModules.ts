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
