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
        min-height: 40px;
        padding: 10px 12px 12px 9px;
        margin: 0px 0px 0px 0px;
        font-size: 14px;
        line-height: 21px;
        color: ${theme.colors.black};
    }

    label {
        font-size: 24px;
        line-height: 36px;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
