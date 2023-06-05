import { type INaviMenuItem } from '@/types/interfaces/commons';
import { BANNER_PAGE_URL, NOTICE_PAGE_URL, REPORT_PAGE_URL } from './utl';
import { ASC, CREATED_AT, DESC, ENDED_AT, STARTED_AT } from './common';

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

export const bannerTypeOptions= [
    { label: 'Big Banner', value: 'Big Banner' },
    { label: 'Top Banner', value: 'Top Banner' },
    {
        label: 'Mobile Banner',
        value: 'Mobile Banner',
    },
]

export const bannerTypeFilterOptions =[
    { label: '배너타입 전체', value: '' },
    { label: 'Big Banner', value: 'Big Banner' },
    { label: 'Top Banner', value: 'Top Banner' },
    {
        label: 'Mobile Banner',
        value: 'Mobile Banner',
    },
]

export const bannerSortOptions=[
    { label: '생성일순 : 내림차순',value:{ sortField: CREATED_AT, value: DESC }},
    { label: '생성일순 : 오름차순',value:{sortField: CREATED_AT, value: ASC }},
    { label: '시작일순 : 내림차순',value:{ sortField: STARTED_AT, value: DESC}},
    { label: '시작일순 : 오름차순',value:{ sortField: STARTED_AT, value: ASC }},
    { label: '종료일순 : 내림차순', value:{sortField: ENDED_AT, value: DESC }},
    { label: '종료일순 : 오름차순', value:{sortField: ENDED_AT, value: ASC} },
]