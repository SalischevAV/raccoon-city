import React, {useState, useCallback} from 'react';
import {HistoryTable} from './HistoryTable';

export const History = () => {
    const [page, setPage] = useState(1);

    const handlePaginationChange = useCallback(
        async (page: number) => {
            setPage(page);
        },
        [setPage, page]
    );

    return (
        <div>
            <h2>История {page}</h2>
            <HistoryTable page={page} handlePaginationChange={handlePaginationChange} />
        </div>
    );
};
