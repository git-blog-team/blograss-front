import { type AxiosError, type AxiosRequestConfig } from 'axios';

export interface IUseReactQueryParams {
    url: string;
    // api 요청 주소
    onError?: (err: AxiosError<{ details: string }, any>) => void;
    renderLater?: boolean;
    // 비동기랜더링원할때 기본값 false로 화면랜더링시 바로 query 작동함 true 값이면 query 작동X
}

export interface IUseReactQueryMutationParams {
    url: string;
    // api 요청 주소
    onError?: (err: AxiosError<{ details: string }, any>) => void;
    onSuccess?: (
        data: unknown,
        variables: AxiosRequestConfig,
        context: unknown,
    ) => unknown;
    cancel?: string;
    hasCatch?: boolean;
    isUsingMessage?: boolean;
    message?: string;
}

export type MutationMethodType = 'post' | 'put' | 'delete';
