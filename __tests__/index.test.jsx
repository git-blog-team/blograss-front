import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Components from '../src/pages/Components';

test('components 페이지', () => {
    render(<Components />);
    const heading = screen.getByRole('heading', {
        name: '컴포넌트 테스트 페이지',
    });
    expect(heading).toBeInTheDocument();
});
