import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { modalsActions } from "../store/Modals/Modals";


const useHTTP = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        setIsLoading(true);
        setError(null);
        let baseUrl = "http://ec2-34-246-200-235.eu-west-1.compute.amazonaws.com/api/v1/front/";
        try {
            const response = await fetch(
                baseUrl + requestConfig.url,
                {
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    body: requestConfig.method === 'POST' && requestConfig.headers['Content-Type'] === 'application/json' ? JSON.stringify(requestConfig.body) : requestConfig.body
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(modalsActions.openLoginModal());
                }
                throw new Error('Request Failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'something went wrong');
            applyError(err);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const sendRequest = useCallback((requestConfig, applyData, applyError) => {
    //     setIsLoading(true);
    //     setError(null);
    //     let baseUrl = "http://ec2-34-246-200-235.eu-west-1.compute.amazonaws.com/api/v1/front/";
    //     // if (requestConfig.baseUrl) {
    //     //     baseUrl = requestConfig.baseUrl;
    //     // }
    //     fetch(
    //         baseUrl + requestConfig.url,
    //         {
    //             method: requestConfig.method,
    //             headers: requestConfig.headers,
    //             body: requestConfig.method === 'POST' && requestConfig.headers['Content-Type'] === 'application/json' ? JSON.stringify(requestConfig.body) : requestConfig.body
    //         }
    //     ).then(async res => {
    //         const data = await res.json();
    //         // console.log(data);
    //         if (!res.ok) {
    //             const error = (data && data.message) || res.statusText;
    //             // console.log('my error', error);
    //             if (res.status === 401) {
    //                 dispatch(modalsActions.openLoginModal());
    //             }
    //             throw new Error(error);
    //             // get error message from body or default to response statusText
    //         }

    //         applyData(data);
    //     }).catch(err => {
    //         setError(err.message);
    //         applyError(err);
    //     })
    //     setIsLoading(false);

    // }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;