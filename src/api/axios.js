import axios from 'axios';
import { API_URL } from '../constants';

const generateCancelRequest = req => {
    if (req.cancel) {
        req.cancel();
        req.cancel = null;
    }

    const source = axios.CancelToken.source();
    req.cancel = source.cancel;

    return {
        cancelToken: source.token,
        isCancel: axios.isCancel,
    };
};

const api = axios.create({
    baseURL: API_URL,
});

export { api, generateCancelRequest };
