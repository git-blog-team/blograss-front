import { centerRowStyles, spaceBetweenRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
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

    return (
        <StyledHeader>
            <Head>
                <title>Blograss</title>
            </Head>
            <div>
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
                <div>
                    {userName}님 🥬{' '}
                    <button>{accessToken ? '로그아웃' : '로그인'}</button>
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
    min-width: 1280px;
    width: 100%;

    > div {
        ${spaceBetweenRowStyles}
        width: 1200px;
        height: 100%;
        > p {
            color: ${(props) => props.theme.colors.point_yellow_green2};
            font-size: 50px;
            font-weight: 700;

            > span {
                font-size: 15px;
                margin: 0 0 0 7px;
            }
        }
        > div {
            > button {
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
