import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import Input from '../commons/Input';
import { useReactQueryPost } from '@/api/http';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../commons/Button';
import { useRouter } from 'next/router';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import {
    ColumnFlexStartCenter,
    ColumnFlexStartFlexStart,
} from '@/styles/flexModules';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { updateUserData } from '@/store/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { mutation: loginMutation, isLoading } = useReactQueryPost({
        url: '/admin/login',
    });

    const [isEmail, setIsEmail] = useState('');
    const [isShowEmailWarning, setIsShowEmailWarning] = useState<
        null | boolean
    >(null);

    const [isPassword, setIsPassword] = useState('');
    const [isShowPasswordWarning, setIsShowPasswordWarning] = useState<
        null | boolean
    >(null);

    const validateEmail = (email: string) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    };

    const onChangeEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(target.value);
        setIsShowEmailWarning(validateEmail(target.value));
    };

    const validatePasswordLength = (password: string) => {
        return password.length > 7;
    };

    const onChangePassword = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsPassword(target.value);
        setIsShowPasswordWarning(validatePasswordLength(target.value));
    };

    /**
     * secretKey는 어드민 회원가입 시 필요한 키값입니다.
     * @param event
     */

    const onSubmitLogin = (event: FormEvent) => {
        event.preventDefault();
        loginMutation(
            {
                adminId: isEmail,
                password: isPassword,
            },
            {
                onSuccess: (res) => {
                    Cookies.set(ACCESS_TOKEN, res.result[0].accessToken, {
                        expires: 7,
                        secure: true,
                    });
                    Cookies.set(REFRESH_TOKEN, res.result[0].refreshToken, {
                        expires: 7,
                        secure: true,
                    });
                    dispatch(
                        updateUserData({ ...res.result[0], isLogin: true }),
                    );
                    router.push('/');
                },
                onError: (error) => {
                    !!error.response && alert(error.response);
                },
            },
        );
    };

    const isButtonDisabled = () => {
        return isLoading || !(isShowEmailWarning && isShowPasswordWarning);
    };

    return (
        <StyledCommonWrapper>
            <StyledSignUpWrapper>
                <StyledCommonMenuTitle>LogIn</StyledCommonMenuTitle>
                <form action="post" onSubmit={onSubmitLogin}>
                    <StyledInputWrapper>
                        <Input
                            id="user-email"
                            type="text"
                            onChange={onChangeEmail}
                            placeholder="이메일 주소"
                        >
                            이메일
                        </Input>
                        {isShowEmailWarning === false && (
                            <StyledWarningText>
                                이메일 형식이 아닙니다.
                            </StyledWarningText>
                        )}
                    </StyledInputWrapper>
                    <StyledInputWrapper>
                        <Input
                            id="user-password"
                            type="password"
                            onChange={onChangePassword}
                            placeholder="비밀번호(8자리 이상)"
                        >
                            비밀번호
                        </Input>

                        {isShowPasswordWarning === false && (
                            <StyledWarningText>
                                최소 8글자 이상 입력해주세요.
                            </StyledWarningText>
                        )}
                    </StyledInputWrapper>
                    <Button
                        type="submit"
                        disabled={isButtonDisabled()}
                        style={{ width: '100%' }}
                    >
                        로그인
                    </Button>
                </form>
            </StyledSignUpWrapper>
        </StyledCommonWrapper>
    );
}

const StyledSignUpWrapper = styled.div`
    ${ColumnFlexStartCenter()}
    width: 100%;
`;

const StyledInputWrapper = styled.div`
    ${ColumnFlexStartFlexStart()};
    width: 100%;
    min-width: 360px;
    margin: 0px 0px 10px 0px;
`;

const StyledWarningText = styled.p`
    font-size: 12px;
    color: ${theme.colors.point_orange};
    margin: 5px 0px 0px 0px;
    font-weight: bold;
`;
