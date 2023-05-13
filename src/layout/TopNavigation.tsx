import { navigationMenu } from '@/constants/optioins';
import { MAIN_PAGE_URL } from '@/constants/utl';
import { centerRowStyles, normalRowStyles } from '@/styles/flexModules';
import { type INaviMenuItem } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TopNavigation() {
    const router = useRouter();

    const url = router.asPath;

    return (
        <StyledTopNavigation>
            <ul>
                <StyledNavItem isSelected={url === MAIN_PAGE_URL}>
                    <Link href={MAIN_PAGE_URL}>MAIN</Link>
                </StyledNavItem>
                {_.map(navigationMenu, (item: INaviMenuItem) => {
                    const isSelected = url.startsWith(item.path);

                    return (
                        <StyledNavItem key={item.id} isSelected={isSelected}>
                            <Link href={item.path}>{item.name}</Link>
                        </StyledNavItem>
                    );
                })}
            </ul>
        </StyledTopNavigation>
    );
}

const StyledTopNavigation = styled.nav`
    ${centerRowStyles};
    background-color: white;
    height: 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.line_default};

    > ul {
        ${normalRowStyles};
        width: 90%;
        height: 100%;
        padding: 0 3rem;
    }
`;

const StyledNavItem = styled.li<{ isSelected?: boolean }>`
    width: 300px;
    height: 100%;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 900;
    line-height: 42px;
    text-align: center;

    cursor: pointer;
    > a {
        text-decoration-line: none;
        text-decoration: none;
        color: ${(props) =>
            props.isSelected ?? false
                ? props.theme.colors.point_orange
                : props.theme.colors.point_yellow_green2};
    }

    :hover {
        box-shadow: 0px 0px 5px #c1cfc1;
    }
`;
