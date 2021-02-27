import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const { enabled = true } = options;

    const handleRefetch = async () => {
        setIsFetching(true);

        try {
            const response = await fetch(url);
            const fetchedData = await response.json();

            setData(fetchedData);
        } catch (e) {
            setError(e);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (!enabled) return;

        handleRefetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, url]);

    return { data, error, refetch: handleRefetch, isFetching };
};
