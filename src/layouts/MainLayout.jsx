import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSnackbarIsError, selectSnackbarText } from '../store/slices/snackbarSlice';
import MainLayoutContext from '../context/MainLayoutContext';
import { useToggle } from '../hooks/useToggle';

const Snackbar = lazy(() => import('../components/Snackbar'));

const MainLayout = ({ children }) => {
    const snackbarText = useSelector(selectSnackbarText);
    const isErrorSnackbar = useSelector(selectSnackbarIsError);
    const [openedSnackbar, toggleSnackbar] = useToggle();

    return (
        <MainLayoutContext.Provider value={{ openedSnackbar, toggleSnackbar }}>
            <main className="wrap__holder">{children}</main>
            <Suspense fallback={'Loading...'}>
                <Snackbar opened={openedSnackbar} close={toggleSnackbar} isError={isErrorSnackbar}>
                    {snackbarText}
                </Snackbar>
            </Suspense>
        </MainLayoutContext.Provider>
    );
};

MainLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default MainLayout;
