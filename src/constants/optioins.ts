import { type INaviMenuItem } from '@/types/interfaces/commons';
import { BANNER_PAGE_URL, NOTICE_PAGE_URL, REPORT_PAGE_URL } from './utl';

export const noticeListDropdownOptions = [
    { label: '공지생성일', value: 'CreatedAt' },
    { label: '공지 제목', value: 'title' },
];

export const bannerListDropdownOptions = [
    { label: '배너생성일', value: 'CreatedAt' },
    { label: '배너타입', value: 'BannerType' },
    { label: '시작일', value: 'Start' },
    { label: '종료일', value: 'End' },
];

export const reportListDropdownOptions = [
    { label: '신고날짜', value: 'ReportDate' },
    { label: 'Target', value: 'Target' },
    { label: '타입', value: 'Type' },
    { label: '상태', value: 'Status' },
    { label: 'SolcedDate', value: 'SolcedDate' },
];

export const navigationMenu: INaviMenuItem[] = [
    {
        id: 1,
        name: '공지사항 관리',
        path: NOTICE_PAGE_URL,
    },
    {
        id: 2,
        name: '배너 관리',
        path: BANNER_PAGE_URL,
    },
    {
        id: 3,
        name: '신고 관리',
        path: REPORT_PAGE_URL,
    },
];

export const daysText = ['일', '월', '화', '수', '목', '금', '토'];
