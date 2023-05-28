import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import Input from '../commons/Input';
import { useReactQueryPost } from '@/api/http';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../commons/Button';
import { useRouter } from 'next/router';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

export default function SignUp() {
    const router = useRouter();
    const { mutation: signUpMutation, isLoading } = useReactQueryPost({
        url: '/admin/signup',
    });

    const [isEmail, setIsEmail] = useState('');
    const [isShowEmailWarning, setIsShowEmailWarning] = useState<
        null | boolean
    >(null);

    const [isName, setIsName] = useState('');
    const [isShowNameWarning, setIsShowNameWarning] = useState<null | boolean>(
        null,
    );

    const [isPassword, setIsPassword] = useState('');
    const [isShowPasswordWarning, setIsShowPasswordWarning] = useState<
        null | boolean
    >(null);

    const [, setIsConfirmPassword] = useState('');
    const [isPasswordEqual, setIsPasswordEqual] = useState<null | boolean>(
        null,
    );

    const validateEmail = (email: string) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    };

    const onChangeEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(target.value);
        setIsShowEmailWarning(validateEmail(target.value));
    };

    const validateName = (name: string) => {
        return name.length > 2;
    };

    const onChangeName = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsName(target.value);
        setIsShowNameWarning(validateName(target.value));
    };

    const validatePasswordLength = (password: string) => {
        return password.length > 7;
    };

    const onChangePassword = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsPassword(target.value);
        setIsShowPasswordWarning(validatePasswordLength(target.value));
    };

    const validatePasswordIsEqual = (password: string) => {
        return isPassword === password;
    };

    const onChangeConfirmPassword = ({
        target,
    }: ChangeEvent<HTMLInputElement>) => {
        setIsConfirmPassword(target.value);
        setIsPasswordEqual(validatePasswordIsEqual(target.value));
    };

    const onSubmitSignUp = (event: FormEvent) => {
        event.preventDefault();
        signUpMutation(
            {
                adminId: isEmail,
                password: isPassword,
                adminName: isName,
                secretKey: 'f9ebfe89-52e4-450d-8fa4-6cee5eb6008c',
            },
            {
                onSuccess: () => {
                    router.push('/login');
                },
                onError: (error) => {
                    !!error.response && alert(error.response);
                },
            },
        );
    };

    const isButtonDisabled = () => {
        return (
            isLoading ||
            !(
                isShowEmailWarning &&
                isShowNameWarning &&
                isShowPasswordWarning &&
                isPasswordEqual
            )
        );
    };

    return (
        <StyledCommonWrapper>
            <StyledSignUpWrapper>
                <StyledCommonMenuTitle>SignUpPage</StyledCommonMenuTitle>
                <form action="post" onSubmit={onSubmitSignUp}>
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
                            id="user-name"
                            type="text"
                            onChange={onChangeName}
                            placeholder="이름(3글자 이상)"
                        >
                            이름
                        </Input>
                        {isShowNameWarning === false && (
                            <StyledWarningText>
                                최소 3글자 이상 입력해주세요.
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
                    <StyledInputWrapper>
                        <Input
                            id="user-confirm-password"
                            type="password"
                            onChange={onChangeConfirmPassword}
                            placeholder="비밀번호 확인"
                        >
                            비밀번호 확인
                        </Input>
                        {isPasswordEqual === false && (
                            <StyledWarningText>
                                비밀번호가 일치하지 않습니다.
                            </StyledWarningText>
                        )}
                    </StyledInputWrapper>
                    <Button
                        type="submit"
                        disabled={isButtonDisabled()}
                        style={{ width: '100%' }}
                    >
                        회원가입
                    </Button>
                </form>
            </StyledSignUpWrapper>
        </StyledCommonWrapper>
    );
}

const StyledSignUpWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const StyledInputWrapper = styled.div`
    width: 100%;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0px 0px 10px 0px;
`;

const StyledWarningText = styled.p`
    font-size: 12px;
    color: ${theme.colors.point_orange};
    margin: 5px 0px 0px 0px;
    font-weight: bold;
`;
