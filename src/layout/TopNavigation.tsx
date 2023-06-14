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
    return (
        <StyledTopNavigation>
            <ul>
                <Link href={MAIN_PAGE_URL}>
                    <StyledNavItem
                        isSelected={router.pathname === MAIN_PAGE_URL}
                    >
                        MAIN
                    </StyledNavItem>
                </Link>
                {_.map(navigationMenu, (item: INaviMenuItem) => (
                    <Link href={item.path} key={item.id}>
                        <StyledNavItem
                            isSelected={
                                router.pathname !== MAIN_PAGE_URL &&
                                item.path.includes(router.pathname)
                            }
                        >
                            {item.name}
                        </StyledNavItem>
                    </Link>
                ))}
            </ul>
        </StyledTopNavigation>
    );
}

const StyledTopNavigation = styled.nav`
    ${centerRowStyles};
    background-color: white;
    height: 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.line_default};
    min-width: 1280px;
    width: 100%;
    > ul {
        ${normalRowStyles};
        width: 1280px;
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
    text-decoration-line: none;
    text-decoration: none;
    color: ${(props) =>
        props.isSelected ?? false
            ? props.theme.colors.point_orange
            : props.theme.colors.point_yellow_green2};

    cursor: pointer;

    :hover {
        box-shadow: 0px 0px 5px #c1cfc1;
    }
`;
