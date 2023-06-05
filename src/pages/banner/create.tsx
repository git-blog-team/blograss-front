import {
    fileUpload,
    useReactQuery,
    useReactQueryPost,
    useReactQueryPut,
} from '@/api/http';
import Button, { StyledButton } from '@/components/commons/Button';
import DropDown, { StyledDropdown } from '@/components/commons/DropDown';
import Input, { StyledWrapperInput } from '@/components/commons/Input';
import Upload from '@/components/commons/Upload';
import DatePicker, {
    StyledWrapperDatePicker,
} from '@/components/commons/datePicker';
import { BANNER_API_URL } from '@/constants/api';
import { bannerTypeOptions } from '@/constants/optioins';

import { BANNER_PAGE_URL } from '@/constants/utl';
import { useDropdowns } from '@/hooks/commons';
import { StyledCommonMenuTitle, StyledCommonWrapper } from '@/styles/commons';
import {
    ColumnFlexStartCenter,
    ColumnFlexStartFlexStart,
} from '@/styles/flexModules';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ValueType } from 'react-select';

export default function BannerCreate() {
    const router = useRouter();
    const bannerId = router.query.id;
    const isEdit = !!bannerId;
    const [dropdownStates, handleDropdowns] = useDropdowns({
        bannerType: { label: '배너타입을 입력하세요', value: '' },
    });
    const [bannerName, setBannerName] = useState('');
    const [dates, setDates] = useState({ start: null, end: null });
    const [isValid, setIsValid] = useState(false);
    const [imageId, setImageId] = useState('');

    const handleDates = (name: string, value: ValueType<any, any>) => {
        setDates((state) => ({ ...state, [name]: value }));
    };

    const { mutation: createNotice } = useReactQueryPost({
        url: BANNER_API_URL,
    });
    const { mutation: editNotice } = useReactQueryPut({
        url: BANNER_API_URL,
    });

    const { data } = useReactQuery({
        url: BANNER_API_URL,
        renderLater: !bannerId,
        params: {
            bannerId,
        },
    });

    const handleValid = () => {
        const isValid = !!dates.end && !!dates.start && !!bannerName && imageId;
        setIsValid(isValid);
    };

    const onClickSubmit = () => {
        const mutation = isEdit ? editNotice : createNotice;

        const variables = {
            bannerName,
            imageId: imageId,
            startedAt: dates.start,
            endedAt: dates.end,
            bannerType: dropdownStates.bannerType.value,
            ...(isEdit ? { bannerId } : {}),
        };

        mutation(variables, {
            onSuccess: () => {
                alert(`배너${isEdit ? '수정' : '등록'}되었습니다.`);
                router.push(BANNER_PAGE_URL);
            },
        });
    };

    const handleImageId = (imageId: string) => {
        setImageId(imageId);
    };

    useEffect(() => {
        if (!!data) {
            const { bannerName, bannerType, endedAt, imageId, startedAt } =
                data?.result?.[0] ?? '';
            setBannerName(bannerName);
            handleDropdowns('bannerType', {
                label: bannerType,
                value: bannerType,
            });
            handleDates('start', startedAt);
            handleDates('end', endedAt);
            handleImageId(imageId);
        }
    }, [data]);

    useEffect(() => {
        handleValid();
    }, [dates, bannerName, imageId]);

    return (
        <StyledCreateNotice>
            <StyledCommonWrapper>
                <StyledTopContents>
                    <StyledCommonMenuTitle>
                        배너 {isEdit ? '수정' : '등록'}
                    </StyledCommonMenuTitle>
                </StyledTopContents>
                <StyledContents>
                    <div>
                        <Input
                            children={<p>배너이름</p>}
                            onChange={(e) => setBannerName(e.target.value)}
                            placeholder="배너이름을 작성해주세요"
                            value={bannerName ?? ''}
                            maxLength={30}
                        />
                    </div>
                    <div>
                        <Upload
                            label={'배너 이미지'}
                            imageId={imageId}
                            handleImage={handleImageId}
                        />
                    </div>
                    <div>
                        <label>배너 타입</label>
                        <DropDown
                            options={bannerTypeOptions}
                            value={dropdownStates.bannerType}
                            name="bannerType"
                            onChange={handleDropdowns}
                        />
                    </div>

                    <div>
                        <label>배너 시작일</label>
                        <DatePicker
                            handlingPickDate={(pickDate) => {
                                handleDates('start', pickDate);
                            }}
                            today={dates.start}
                        ></DatePicker>
                    </div>
                    <div>
                        <label>배너 종료일</label>
                        <DatePicker
                            handlingPickDate={(pickDate) => {
                                handleDates('end', pickDate);
                            }}
                            today={dates.end}
                        ></DatePicker>
                    </div>
                </StyledContents>
                <Button onClick={onClickSubmit} disabled={!isValid}>
                    {isEdit ? '수정하기' : '등록하기'}
                </Button>
            </StyledCommonWrapper>
        </StyledCreateNotice>
    );
}
const StyledCreateNotice = styled.div`
    ${StyledCommonWrapper} {
        ${ColumnFlexStartCenter};
    }
    ${StyledButton} {
        width: 300px;
    }
    ${StyledWrapperDatePicker} {
        > input {
            background-color: #fff;
            width: 200px;
            font-size: 12px;
            min-height: 40px;
            padding: 0px 10px 0px 10px;
            border: 1px solid ${(props) => props.theme.colors.line_default};
            border-radius: 5px;
        }
    }
`;
const StyledTopContents = styled.div`
    width: 100%;
    padding: 0 0 0 50px;
`;
const StyledContents = styled.div`
    ${ColumnFlexStartFlexStart};
    margin: 15px 0 30px 0;
    > div {
        display: flex;
        margin: 15px 0 0 0;
        label {
            width: 120px;
            font-size: 14px;
            height: fit-content;
            margin: 0 10px 0 0;
            line-height: 40px;
        }
        ${StyledWrapperInput} {
            border-radius: 5px;
            width: 900px;
        }
    }
`;
