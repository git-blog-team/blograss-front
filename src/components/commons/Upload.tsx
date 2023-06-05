import { fileUpload } from '@/api/http';
import { IMAGE_BASE_URL } from '@/constants/common';
import { centerColumnStyles } from '@/styles/flexModules';
import styled from '@emotion/styled';
import { ChangeEvent, useRef, useState } from 'react';

export default function Upload({
    imageId,
    label,
    handleImage,
}: {
    imageId: string;
    label?: string;
    handleImage: (imageId: string) => void;
}) {
    const [imageUrl, setImageUrl] = useState('');
    const fileRef = useRef<HTMLInputElement>(null);
    const onClickUpload = () => {
        fileRef.current?.click();
    };
    const imgUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const target = event?.target as HTMLInputElement;
        const file: FileList = target?.files as FileList;
        if (!!file) {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = (data) => {
                if (typeof data.target?.result === 'string') {
                    setImageUrl(data.target?.result);
                }
            };
            const formData = new FormData();
            formData.append('file', file[0]);

            try {
                const imageId = (await fileUpload(formData)) ?? [];
                handleImage(imageId[0]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <StyledUpload>
            {label && <label>{label}</label>}
            <div onClick={onClickUpload}>
                <img
                    src={imageId ? `${IMAGE_BASE_URL}/${imageId}` : imageUrl}
                />
            </div>
            <input ref={fileRef} type="file" onChange={imgUpload} />
        </StyledUpload>
    );
}
export const StyledUpload = styled.div`
    display: flex;

    label {
        width: 120px;
        font-size: 14px;
        height: fit-content;
        margin: 0 10px 0 0;
        line-height: 40px;
    }
    > div {
        ${centerColumnStyles};
        border: 2px solid ${(props) => props.theme.colors.line_default};
        border-style: dotted;
        width: 900px;
        height: 250px;
        cursor: pointer;
        background-image: url('/images/icons/plus.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80px;
        > img {
            width: 100%;
            max-width: 880px;
            max-height: 230px;
            object-fit: contain;
        }
    }
    input {
        display: none;
    }
`;
