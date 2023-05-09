import { decrement, increment } from '@/store/exampleSlice';
import { RootState } from '@/store/store';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const reduxTest = useSelector((state: RootState) => state.example.value);
    const dispatch = useDispatch();

    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                </StyledTopContents>
                <div>dddd</div>
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
