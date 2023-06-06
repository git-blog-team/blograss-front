import Pagination from '@/components/commons/Pagination';
import { useRouter } from 'next/router';

export default function DetailPage() {
    const router = useRouter();
    const { page } = router.query;
    return (
        <div>
            <h1>디테일 페이지</h1>
            <h2>{router.query.page} 페이지</h2>
            <Pagination
                totalItems={989}
                itemsPerPage={10}
                pagesPerBlock={5}
                currentPage={Number(page)}
            />
        </div>
    );
}
