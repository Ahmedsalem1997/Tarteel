import { useState } from "react";

const baseUrl = "";

const useHTTP = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                baseUrl+requestConfig.url, {
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    body: JSON.stringify(requestConfig.body)
                }
            );
            
            if(!response.ok) {
                throw new Error('Request Failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'something went wrong')
        }
        setIsLoading(false);
    };
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;