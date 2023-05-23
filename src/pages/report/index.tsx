import { useReactQuery, useReactQueryPost } from '@/api/http';
import CommonTable from '@/components/commons/Table';
import { TOKEN } from '@/constants/common';
import { sampleReportData } from '@/constants/sampleReportData';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Report() {
    const router = useRouter();
    const { mutation: signUpMutation } = useReactQueryPost({
        url: '/admin/signup',
    });
    const { mutation: loginMutation } = useReactQueryPost({
        url: '/admin/login',
    });

    const onClickMutation = () => {
        signUpMutation(
            {
                adminId: 'm71kr@naver.com',
                password: 'test1234',
                adminName: '관리자1',
                secretKey: 'f9ebfe89-52e4-450d-8fa4-6cee5eb6008c',
            },
            {
                onSuccess: (res) => {
                    Cookies.set(TOKEN, res.token);
                    alert('회원가입 성공쓰');
                },
                onError: (error) => {
                    !!error.response && console.log(error.response);
                },
            },
        );
    };
    const onClickLogin = () => {
        loginMutation(
            { adminId: 'm71kr@naver.com', password: 'test1234' },
            {
                onSuccess: (res) => {
                    const token = res.result[0].accessToken;
                    Cookies.set(TOKEN, token);
                    alert('로그인 성공쓰');
                    refetch();
                },
                onError: (error) => {
                    !!error.response && console.log(error.response);
                },
            },
        );
    };

    const { data, isLoading, refetch } = useReactQuery({
        // renderLater: true,
        url: 'https://api.blograss.com/report/list?page=1&target=&type=&status=&sortField=&sortOrder=&search=',
    });

    console.log(data);
    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                </StyledTopContents>
                <button onClick={onClickMutation}>회원가입</button>
                <button onClick={onClickLogin}>로그인</button>
                <CommonTable
                    isEmptyList={!data?.result}
                    headers={[
                        { contents: 'NO.', width: '200px' },
                        { contents: '신고날짜', width: '200px' },
                        { contents: '게시물/댓글', width: '200px' },
                        { contents: '신고자', width: '200px' },
                        { contents: '게시물 유저', width: '200px' },
                        { contents: '사유', width: '200px' },
                        { contents: '상태', width: '200px' },
                        { contents: '게시물 정지 날짜', width: '200px' },
                    ]}
                >
                    <>
                        {_.map(data?.result, (item, index) => (
                            <tr key={item.reportId}>
                                <td>{index + 1}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.target}</td>
                                <td>{item.userId}</td>
                                <td>{item.author}</td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                                <td>{item.solvedAt ?? '-'}</td>
                            </tr>
                        ))}
                    </>
                </CommonTable>
            </StyledCommonWrapper>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    > div > div:last-of-type {
        height: 600px;
        width: 100%;
    }
`;
const StyledTopContents = styled.div``;
