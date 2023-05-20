import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Input from '../src/components/commons/Input';

test('Input 컴포넌트 label 텍스트가 정상적으로 노출되는가?', () => {
    render(<Input id="test">테스트코드</Input>);
    const inputNode = screen.getByLabelText('테스트코드', {
        selector: 'input',
    });
    expect(inputNode).toBeInTheDocument();
});

test('Input 컴포넌트 Placeholder가 정상적으로 나오는가?', () => {
    render(<Input placeholder="플레이스홀더">테스트코드</Input>);
    const inputNode = screen.getByPlaceholderText('플레이스홀더');
    expect(inputNode).toBeInTheDocument();
});

test('Input 컴포넌트 isSearch === true일 때 아이콘이 노출 되는가', () => {
    const { getByTestId } = render(<Input isSearch={true} />);
    const searchIcon = getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
});
