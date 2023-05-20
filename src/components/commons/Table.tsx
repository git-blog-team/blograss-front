import { centerColumnStyles } from '@/styles/flexModules';
import { type ICommonTableProps } from '@/types/interfaces/commons';
import styled from '@emotion/styled';
import _ from 'lodash';
import Image from 'next/image';
import { type ValueType } from 'react-select';

export default function CommonTable(props: ICommonTableProps) {
    const { headers, children, isEmptyList } = props;

    return (
        <StyledCommonTable>
            <table>
                <colgroup>
                    {_.map(
                        headers,
                        (item: ValueType<any, any>, index: number) => (
                            <col key={index} width={item.width ?? '200px'} />
                        ),
                    )}
                </colgroup>
                <thead>
                    <tr>
                        {_.map(
                            headers,
                            (item: ValueType<any, any>, index: number) => (
                                <th key={index}>{item.contents}</th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
            {isEmptyList !== null &&
                isEmptyList !== undefined &&
                isEmptyList && (
                    <StyledNoData>
                        <p>해당 데이터가 없습니다.</p>
                        <Image
                            src="/logo.png"
                            height={120}
                            width={120}
                            alt="로고이미지"
                            style={{ margin: ' 0 10px 2px 0' }}
                        />
                    </StyledNoData>
                )}
        </StyledCommonTable>
    );
}

const StyledCommonTable = styled.div`
    position: relative;
    table {
        border-radius: 5px;
        > thead {
            height: 50px;
            background-color: ${(props) =>
                props.theme.colors.light_yellow_green};
            > tr > th {
                vertical-align: middle;
            }
        }

        > tbody {
            tr {
                height: 35px;
                vertical-align: middle;
                border: 1px solid gray;
            }
            td {
                vertical-align: middle;
                border: 1px solid ${(props) => props.theme.colors.light_gray};
                text-align: center;
            }
        }
    }
`;
const StyledNoData = styled.div`
    ${centerColumnStyles};
    position: absolute;
    top: calc(50% - 90px);
    left: calc(50% - 70px);
    > p {
        margin: 20px 0;
        font-size: 20px;
    }
`;
