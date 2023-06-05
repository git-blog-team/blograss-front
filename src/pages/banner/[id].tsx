import { useReactQuery, useReactQueryDelete } from '@/api/http';
import Button, { StyledButton } from '@/components/commons/Button';
import { BANNER_API_URL } from '@/constants/api';
import { IMAGE_BASE_URL } from '@/constants/common';
import { BANNER_CREATE_PAGE_URL, BANNER_PAGE_URL } from '@/constants/utl';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import { normalRowStyles } from '@/styles/flexModules';
import { dateToYYMMDD } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function BannerDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useReactQuery({
        url: BANNER_API_URL,
        renderLater: !id,
        params: {
            bannerId: id,
        },
    });

    const { mutation: deleteNotice } = useReactQueryDelete({
        url: BANNER_API_URL,
    });

    const {
        bannerId,
        imageId,
        bannerType,
        bannerName,
        createdAt,
        endedAt,
        startedAt,
    } = data?.result?.[0] ?? '';

    const onClickEdit = () => {
        router.push({
            pathname: BANNER_CREATE_PAGE_URL,
            query: { id: bannerId },
        });
    };

    const onClickDelete = () => {
        deleteNotice(
            {
                data: {
                    bannerIds: [bannerId],
                },
            },
            {
                onSuccess: () => {
                    alert('배너가 삭제되었습니다.');
                    router.push(BANNER_PAGE_URL);
                },
                onError: (err) => console.log(err),
            },
        );
    };
    return (
        <StyledBannerDetail>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>{bannerName}</StyledCommonMenuTitle>
                    <p>작성일 : {dateToYYMMDD(createdAt)}</p>
                    <Button onClick={onClickEdit}>수정</Button>
                    <Button onClick={onClickDelete}>삭제</Button>
                </StyledTopContents>
                <div>
                    <div>
                        <label>배너타입</label>
                        <p>{bannerType}</p>
                    </div>
                    <div>
                        <label>시작일</label>
                        <p>{dateToYYMMDD(startedAt)}</p>
                    </div>
                    <div>
                        <label>종료일</label>
                        <p>{dateToYYMMDD(endedAt)}</p>
                    </div>
                    <div>
                        <label>미리보기</label>
                        <img src={`${IMAGE_BASE_URL}/${imageId}`} />
                    </div>
                </div>
            </StyledCommonWrapper>
        </StyledBannerDetail>
    );
}
const StyledBannerDetail = styled.div`
    > div > div:last-of-type {
        margin: 15px 0 0 20px;
        > div {
            display: flex;
            margin: 15px 0 0 0;

            > label {
                width: 150px;
                font-size: 14px;
                height: fit-content;
                margin: 0 10px 0 0;
                line-height: 20px;
            }
            > img {
                width: 600px;
                max-height: 300px;
                object-fit: contain;
            }
        }
    }
`;
const StyledTopContents = styled.div`
    ${normalRowStyles}
    >p {
        color: ${(props) => props.theme.colors.txt_gray};
        font-size: 12px;
        margin: 5px 0 0 0;
    }
    ${StyledButton} {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 11px;
        margin: 0 0 0 10px;
        :last-of-type {
            margin: 0 0 0 5px;
        }
    }
`;
