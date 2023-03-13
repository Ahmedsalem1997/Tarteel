import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { modalsActions } from "../store/Modals/Modals";


const useHTTP = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        setIsLoading(true);
        setError(null);
        let baseUrl = 'https://tarteel.me/api/v1/front/';
        let headers = {operator: 'test_operator', ...requestConfig.headers};
        // console.log(headers);
        try {
            console.log('fetch start');
            const response = await fetch(
                baseUrl + requestConfig.url,
                {
                    method: requestConfig.method,
                    headers: headers,
                    body: (requestConfig.method === 'POST' && requestConfig.headers && requestConfig.headers['Content-Type'] === 'application/json') ? JSON.stringify(requestConfig.body) : requestConfig.body
                }
            );
            console.log('res: ', response);
            console.log('fetch done', response.status);
            setStatus(response.status);
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
            setStatus(err.status);
            applyError(err);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        isLoading,
        error,
        sendRequest,
        status
    }
}

export default useHTTP;