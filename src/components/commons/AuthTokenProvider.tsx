import { useReactQuery } from '@/api/http';
import {
    AUTH_TOKEN_REISSUE_API_URL,
    GET_USER_DATA_API_URL,
} from '@/constants/api';
import { ACCESSTOKEN_NOTEXPIRED } from '@/constants/responseMessage';
import { updateUserData } from '@/store/userSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AuthTokenProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const isToken =
        !!Cookies.get('accessToken') && !!Cookies.get('refreshToken');
    const isLogin = useSelector((state: any) => state.user.isLogin);

    const { data, refetch, isLoading } = useReactQuery({
        url: AUTH_TOKEN_REISSUE_API_URL,
        params: {},
        onError: (error: any) => {
            if (error.response?.data.message === ACCESSTOKEN_NOTEXPIRED) {
                dispatch(updateUserData({ isLogin: true }));
            } else {
                dispatch(updateUserData({ isLogin: false }));
                router.push('/login');
            }
        },
    });

    const { data: userData } = useReactQuery({
        url: GET_USER_DATA_API_URL,
        params: {},
    });

    useEffect(() => {
        if (data === undefined) return;
        dispatch(
            updateUserData({
                isLogin: true,
            }),
        );
    }, [data]);

    useEffect(() => {
        dispatch(
            updateUserData({
                adminInfo: {
                    adminId: userData?.result[0].adminId,
                    adminName: userData?.result[0].adminName,
                },
            }),
        );
    }, [userData]);

    useEffect(() => {
        if (!isLoading) {
            if (!isLogin) router.push('/login');
        }
    }, [router, isLogin]);

    return <>{children}</>;
}
