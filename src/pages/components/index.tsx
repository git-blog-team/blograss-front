import Input from '@/components/commons/Input';
import { useState } from 'react';

export default function Components() {
    const [email, setEmail] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isError, setIsError] = useState('');

    const onChangeInput = (event: any) => {
        setEmail(event.target.value);
    };

    const onClickSearch = () => {
        alert('검색');
    };

    const onClickReset = () => {
        setEmail('');
    };

    const onClickIsSearch = () => {
        setIsSearch(!isSearch);
    };

    const onClickIsError = () => {
        if (isError === 'error') setIsError('');
        else setIsError('error');
    };

    return (
        <div>
            <h1> Input 컴포넌트 테스트 페이지</h1>
            <Input
                placeholder="플레이스 홀더"
                isSearch={isSearch}
                width="300px"
                onChange={onChangeInput}
                value={email}
                onClickReset={onClickReset}
                onClickSearch={onClickSearch}
                status={isError}
            >
                라벨텍스트입니다
            </Input>
            <button onClick={onClickIsSearch}>검색바 전환</button>
            <button onClick={onClickIsError}>에러 상태</button>
        </div>
    );
}
