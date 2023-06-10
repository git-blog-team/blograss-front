import { useReactQuery } from '@/api/http';
import { AUTH_TOKEN_REISSUE_API_URL } from '@/constants/api';
import { ACCESSTOKEN_NOTEXPIRED } from '@/constants/responseMessage';
import { updateUserData } from '@/store/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AuthTokenProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data, error } = useReactQuery({
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

    useEffect(() => {
        if (data === undefined) return;
        dispatch(updateUserData({ ...data.result[0], isLogin: true }));
    }, [data]);

    return <>{children}</>;
}
