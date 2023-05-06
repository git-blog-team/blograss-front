import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { CustomThemeType } from '@/styles/theme';

export const globalStyles = (props: CustomThemeType) => css`
    ${emotionReset};
`;

export default globalStyles;
