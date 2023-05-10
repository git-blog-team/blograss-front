import { centerRowStyles, spaceBetweenRowStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function Header() {
    return (
        <StyledHeader>
            <div>
                <p>
                    Blograss<span>ADMIN</span>
                </p>
                <div>
                    우진택님 고생하십니다. 🥬 <button>로그아웃</button>
                </div>
            </div>
        </StyledHeader>
    );
}
const StyledHeader = styled.div`
    ${centerRowStyles};
    background-color: white;
    border-bottom: 1px solid ${(props) => props.theme.colors.line_default};
    height: 80px;

    > div {
        ${spaceBetweenRowStyles}
        min-width: 1200px;
        width: 90%;
        height: 100%;
        > p {
            color: ${(props) => props.theme.colors.point_yellow_green2};
            font-size: 50px;
            font-weight: 700;

            > span {
                font-size: 15px;
                margin: 0 0 0 7px;
            }
        }
        > div {
            > button {
                box-shadow: 0px 0px 2px
                    ${(props) => props.theme.colors.point_yellow_green2};
                background-color: unset;
                padding: 10px 20px;
                margin: 0 0 0 20px;
                border-radius: 5px;
                color: ${(props) => props.theme.colors.point_green2};
                cursor: pointer;
                border: unset;
            }
        }
    }
`;
