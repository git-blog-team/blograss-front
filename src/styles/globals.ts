import { css } from '@emotion/react';
import reset from 'react-style-reset';

import { CustomThemeType } from '@/styles/theme';

export const globalStyles = (props: CustomThemeType) => css`
    ${reset};
`;

export default globalStyles;
