import { APPROVAL, DENY, PENDING } from '@/constants/common';

export const statusToWord = (status: string) => {
    if (status === PENDING) {
        return '조치 대기중';
    }
    if (status === DENY) {
        return '승인거절';
    }
    if (status === APPROVAL) {
        return '승인';
    }
};
