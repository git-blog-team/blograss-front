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

    label {
        font-size: 24px;
        line-height: 36px;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
