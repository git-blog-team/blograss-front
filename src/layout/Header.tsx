import { useReactQueryDelete } from '@/api/http';
import { LOGIN_PAGE_URL } from '@/constants/utl';
import { centerRowStyles, spaceBetweenRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface IHeaderReduxState {
    user: {
        userName: string;
        accessToken: string;
    };
}

export default function Header() {
    const { userName, accessToken } = useSelector(
        (state: IHeaderReduxState) => state.user,
    );

    const { mutation: logoutMutation, isLoading } = useReactQueryDelete({
        url: '/admin/logout',
        onSuccess: () => {
            router.push(LOGIN_PAGE_URL);
        },
    });

    const router = useRouter();

    const onClickLogOut = () => {
        logoutMutation({});
    };

    return (
        <StyledHeader>
            <Head>
                <title>Blograss</title>
            </Head>
            <div>
                <a href="/">
                    <p>
                        <Image
                            src="/logo.png"
                            height={30}
                            width={30}
                            alt="로고이미지"
                            style={{ margin: ' 0 10px 2px 0' }}
                        />
                        Blograss<span>ADMIN</span>
                    </p>
                </a>
                <div>
                    {userName}님 🥬{' '}
                    {accessToken ? (
                        <button onClick={onClickLogOut}>로그아웃</button>
                    ) : (
                        <Link href="/login">
                            <button>로그인</button>
                        </Link>
                    )}
                </div>
            </div>
        </StyledHeader>
    );
}
const StyledHeader = styled.div`
    ${centerRowStyles};
    background-color: white;
    border-bottom: 1px solid ${(props) => props.theme.colors.line_default};
    height: 80px;

    > div {
        ${spaceBetweenRowStyles}
        min-width: 1200px;
        width: 90%;
        height: 100%;
        > a {
            cursor: pointer;
            text-decoration: none;
            > p {
                color: ${(props) => props.theme.colors.point_yellow_green2};
                font-size: 50px;
                font-weight: 700;

                > span {
                    font-size: 15px;
                    margin: 0 0 0 7px;
                }
            }
        }
        > div {
            button {
                box-shadow: 0px 0px 2px
                    ${(props) => props.theme.colors.point_yellow_green2};
                background-color: unset;
                padding: 10px 20px;
                margin: 0 0 0 20px;
                border-radius: 5px;
                color: ${(props) => props.theme.colors.point_green2};
                cursor: pointer;
                border: unset;
            }
        }
    }
`;
