import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import Input from '../commons/Input';
import { useReactQueryPost } from '@/api/http';
import { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { TOKEN } from '@/constants/common';
import Button from '../commons/Button';

export default function SignUp() {
    const { mutation: signUpMutation, isLoading } = useReactQueryPost({
        url: '/admin/signup',
    });

    const [isEmail, setIsEmail] = useState('');
    const [isName, setIsName] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [isConfirmPassword, setIsConfirmPassword] = useState('');

    const onChangeEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(target.value);
    };

    const onChangeName = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsName(target.value);
    };

    const onChangePassword = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setIsPassword(target.value);
    };

    const onChangeConfirmPassword = ({
        target,
    }: ChangeEvent<HTMLInputElement>) => {
        setIsConfirmPassword(target.value);
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

    return (
        <StyledCommonWrapper>
            <StyledCommonMenuTitle>SignUpPage</StyledCommonMenuTitle>
            <form action="post" onSubmit={onSubmitSignUp}>
                <Input id="user-email" type="text" onChange={onChangeEmail}>
                    이메일
                </Input>
                <Input id="user-name" type="text" onChange={onChangeName}>
                    이름
                </Input>
                <Input
                    id="user-password"
                    type="password"
                    onChange={onChangePassword}
                >
                    비밀번호
                </Input>
                <Input
                    id="user-confirm-password"
                    type="password"
                    onChange={onChangeConfirmPassword}
                >
                    비밀번호 확인
                </Input>
                <Button type="submit" disabled={isLoading}>
                    회워가입
                </Button>
            </form>
        </StyledCommonWrapper>
    );
}
