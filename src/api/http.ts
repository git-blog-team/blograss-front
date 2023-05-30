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

const MutationMethod = {
    delete: 'delete',
    post: 'post',
    put: 'put',
} as const;

export const useReactQuery = (props: IUseReactQueryParams) => {
    const { url, renderLater, onError, params } = props;

    const queryClient = useQueryClient();
    const uniqueKey = url.split('/').slice(1) ?? [''];
    const [renderLaterState, setRenderLater] = useState(renderLater);

    const { data, isFetching, error } = useQuery<
        any,
        AxiosError<{ details: string }>,
        any
    >(
        [...uniqueKey, params],
        async () => {
            const response = await axios.get(
                !!url && !!params
                    ? `${url}?${qs.stringify(params as Record<string, number>)}`
                    : url,
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
    const refetch = async () => {
        await queryClient.invalidateQueries([...uniqueKey]);
    };
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
            mutationFn: async (variables: any) => {
                return await axios[method](url, variables);
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
