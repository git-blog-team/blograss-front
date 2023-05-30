import { ACCESS_TOKEN } from '@/constants/common';
import Axios from 'axios';

import Cookies from 'js-cookie';

const axios = Axios.create({
    baseURL: 'https://api.blograss.com',
    timeout: 1000,
});

axios.interceptors.request.use(
    // request시 사용될것들
    // 첫번째인자 : request 진행시, 두번째인자 : request 실패시

    (conf) => {
        conf.headers = conf.headers ?? {};
        const accessToken = Cookies.get(ACCESS_TOKEN);
        const refreshToken = Cookies.get('refreshToken');
        // 로컬스토리지에서 token 가져옴
        conf.headers['Content-Type'] = 'application/json; charset=utf-8';
        // 서버에게 json 형식을 사용할거라고 알려줌

        if (accessToken !== undefined) {
            conf.headers.Authorization = `Bearer ${accessToken}`;
            // 토큰값이 있으면 헤더 Authorization에 넣어줌
        }
        if (refreshToken !== undefined) {
            conf.headers.RAuthorization = `Bearer ${refreshToken}`;
        }
        return conf;
    },

    async (error) => {
        // 요청실패시
        await Promise.reject(error);
    },
);

axios.interceptors.response.use(
    // response 시 사용될것들
    // 첫번째인자 : response 진행시, 두번째인자 : response 실패시
    (res) => {
        return res.data;
    },
    async (error) => {
        // 토큰만료관련 작성될 로직 여기

        await Promise.reject(error);
    },
);

export default axios;
