import { useRef, useCallback } from 'react';

export const useDocumentLockScrollY = () => {
    const documentRef = useRef(document.documentElement);
    const scrollTopRef = useRef();

    const lockScrollY = useCallback(() => {
        const $html = documentRef.current;
        scrollTopRef.current = $html.scrollTop ? $html.scrollTop : document.body.scrollTop;

        requestAnimationFrame(() => {
            $html.style.top = `${-scrollTopRef.current}px`;
            $html.classList.add('lock-scroll-y');
        });
    }, []);

    const unlockScrollY = useCallback(() => {
        const $html = documentRef.current;
        const scrollTop = parseInt(scrollTopRef.current);

        requestAnimationFrame(() => {
            $html.classList.remove('lock-scroll-y');
            $html.style.removeProperty('top');
            $html.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
        });
    }, []);

    return { lockScrollY, unlockScrollY };
};
