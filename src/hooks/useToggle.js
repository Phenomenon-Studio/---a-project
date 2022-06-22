import { useState, useCallback, useRef, useEffect } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null);

    const toggle = useCallback(cb => {
        cbRef.current = cb;
        setState(state => !state);
    }, []);

    useEffect(() => {
        if (typeof cbRef.current === 'function') {
            cbRef.current(state);
            cbRef.current = null;
        }

    }, [state]);

    return [state, toggle];
};
