import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from './middlewares';
import { type AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {
    type IUseReactQueryMutationParams,
    type IUseReactQueryParams,
    type MutationMethodType,
} from '@/types/api';
import qs from 'query-string';
import { IMAGE_API_URL } from '@/constants/api';

const MutationMethod = {
    delete: 'delete',
    post: 'post',
    put: 'put',
} as const;

export const useReactQuery = (props: IUseReactQueryParams) => {
    const { url, renderLater, onError, params } = props;
    // const queryClient = useQueryClient();
    const [renderLaterState, setRenderLater] = useState(renderLater);

    const requestUrl =  !!url && !!params
    ? `${url}?${qs.stringify(params as Record<string, number>)}`
    : url

    const uniqueKey = requestUrl.split('/').slice(1) ?? [''];

    const { data, isFetching, error, refetch } = useQuery<
        any,
        AxiosError<{ details: string }>,
        any
    >(
        [...uniqueKey, params],
        async () => {
            const response = await axios.get(
                requestUrl
            );
            return response;
        },
        {
            onError,
            // 에러시 하고싶은거있으면 넣으셈
            enabled: !(renderLaterState ?? false),
            // 비동기로 query 하고싶을까바 만듦
        },
    );
    // const refetch = async () => {
    //     await queryClient.invalidateQueries([...uniqueKey]);
    // };
    // 데이터 리패치기능 (수정삭제후 사용하셔유)
    const handleRenderLater = () => {
        setRenderLater(renderLater);
    };

    useEffect(() => {
        handleRenderLater();
        // renderLater값 바뀌면 바로 리랜더링되면서 useQuery요청 부름
    }, [renderLater]);

    return {
        data,
        error,
        isLoading: isFetching,
        refetch,
    } as const;
};

export const useReactQueryMutation =
    (method: MutationMethodType) => (params: IUseReactQueryMutationParams) => {
        const { url, onError, onSuccess } = params;

        const { mutate, isLoading } = useMutation<
            any,
            AxiosError<{ details: string }>,
            any,
            any
        >({
            mutationFn: async (variables: any, headers?: any) => {
                return await axios[method](url, variables, {
                    headers: headers,
                });
            },
            onSuccess,
            onError,
        });
        return {
            mutation: mutate,
            isLoading,
        } as const;
    };

export const useReactQueryDelete = useReactQueryMutation(MutationMethod.delete);
export const useReactQueryPost = useReactQueryMutation(MutationMethod.post);
export const useReactQueryPut = useReactQueryMutation(MutationMethod.put);

export const fileUpload = async (formData: any): Promise<string[]> => {
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    const data: { result: string[] } = await axios.post(
        IMAGE_API_URL,
        formData,
        { headers },
    );

    return data.result ?? [];
};
