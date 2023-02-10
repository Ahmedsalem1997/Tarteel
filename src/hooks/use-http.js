import { useCallback, useState } from "react";


const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        let baseUrl = "http://ec2-34-246-200-235.eu-west-1.compute.amazonaws.com/api/v1/front/";
        setIsLoading(true);
        setError(null);
        if (requestConfig.baseUrl) {
            baseUrl = requestConfig.baseUrl;
        }
        try {
            const response = await fetch(
                baseUrl + requestConfig.url,
                {
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    body: JSON.stringify(requestConfig.body)
                }
            );

            if (!response.ok) {
                throw new Error('Request Failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'something went wrong')
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;