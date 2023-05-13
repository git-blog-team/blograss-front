import Input from '@/components/commons/Input';
import { useState } from 'react';

export default function Components() {
    const [email, setEmail] = useState('');

    const onChangeInput = (event: any) => {
        setEmail(event.target.value);
    };

    const onClick = () => {
        setEmail('');
    };
    return (
        <div>
            <h1> 컴포넌트 테스트 페이지</h1>
            <label htmlFor="textInput"></label>
            <Input placeholder="이메일">
                <div>fdsa</div>
            </Input>
        </div>
    );
}
