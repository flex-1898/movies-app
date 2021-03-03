import { useState } from 'react';

const DEFAULT_METHOD = 'POST';

const noop = () => null;

export const useMutation = (options = {}) => {
    const { onSuccess = noop, onError = noop, ...initialOptions } = options;

    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleMutate = async (body, mutationOptions = {}) => {
        const mergedOptions = { ...initialOptions, ...mutationOptions };

        const { url, method = DEFAULT_METHOD, headers, body: initialBody } = mergedOptions;

        setIsLoading(true);

        try {
            const response = await fetch(url, { method, headers, body: body || initialBody });
            const mutationData = await response.json();

            setData(mutationData);
            onSuccess(mutationData);
        } catch (e) {
            setError(e);
            onError(e);
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate: handleMutate, data, error, isLoading };
};
