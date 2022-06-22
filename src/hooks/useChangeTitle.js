import { useEffect } from 'react';

export const useChangeTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};
