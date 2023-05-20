import CommonTable from '@/components/commons/Table';
import { sampleReportData } from '@/constants/sampleReportData';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import styled from '@emotion/styled';
import _ from 'lodash';

export default function Report() {
    return (
        <StyledMain>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>공지사항 관리</StyledCommonMenuTitle>
                </StyledTopContents>

                <CommonTable
                    // isEmptyList={true} 데이터 유무 내려주세유
                    headers={[
                        { contents: 'NO.', width: '200px' },
                        { contents: '신고날짜', width: '200px' },
                        { contents: '게시물/댓글', width: '200px' },
                        { contents: '신고자', width: '200px' },
                        { contents: '게시물 유저', width: '200px' },
                        { contents: '사유', width: '200px' },
                        { contents: '상태', width: '200px' },
                        { contents: '게시물 정지 날짜', width: '200px' },
                    ]}
                >
                    <>
                        {_.map(sampleReportData, (item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.reportDate}</td>
                                <td>{item.target}</td>
                                <td>{item.reporter}</td>
                                <td>{item.author}</td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                                <td>{item.solvedDate ?? '-'}</td>
                            </tr>
                        ))}
                    </>
                </CommonTable>
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
