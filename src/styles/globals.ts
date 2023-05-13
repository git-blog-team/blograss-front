import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { CustomThemeType } from '@/styles/theme';
import theme from '@/styles/theme';

export const globalStyles = (props: CustomThemeType) => css`
    ${emotionReset};

    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    input {
        border: 1px solid ${theme.colors.line_default};
        width: 100%;
        height: 40px;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
        font-size: 14px;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
