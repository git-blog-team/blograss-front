import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '../src/pages/banner';
import React from 'react';

test('배너페이지 테스트', () => {
    render(<Banner />);

    const heading = screen.getByRole('heading', { name: '공지사항관리' });
    expect(heading).toBeInTheDocument();
});
