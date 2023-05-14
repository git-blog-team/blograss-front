import Input from '@/components/commons/Input';
import { useState } from 'react';

export default function Components() {
    const [email, setEmail] = useState('');

    const onChangeInput = (event: any) => {
        setEmail(event.target.value);
    };

    const onClickSearch = () => {
        alert('검색');
    };

    const onClickReset = () => {
        setEmail('');
    };
    return (
        <div>
            <h1> 컴포넌트 테스트 페이지</h1>
            <Input
                placeholder="이메일"
                isSearch={true}
                width="300px"
                onChange={onChangeInput}
                value={email}
                onClickReset={onClickReset}
                onClickSearch={onClickSearch}
                status={email.length > 0 ? 'error' : ''}
            >
                라벨텍스트입니다
            </Input>
        </div>
    );
}
