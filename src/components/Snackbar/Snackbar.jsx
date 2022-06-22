import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { clearStateInSnackbar } from '../../store/slices/snackbarSlice';
import { DEFAULT_TRANSITION } from '../../constants';
import IconClose from '../Icons/IconClose';
import IconTick from '../Icons/IconTick';
import classes from './Snackbar.module.css';

const Snackbar = ({ opened, close, isError = false, children, autoHideDuration = 3000, additionalClasses = '' }) => {
    const dispatch = useDispatch();
    const bodyRef = useRef(document.body);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!opened) {
            return;
        }

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            close();
            timerRef.current = null;
            dispatch(clearStateInSnackbar());
        }, autoHideDuration);
    }, [autoHideDuration, close, opened, dispatch]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {opened && (
                <motion.div
                    className={clsx(classes.wrap, 'flex items-center fw-500 lh-140', additionalClasses)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, transition: DEFAULT_TRANSITION }}
                    exit={{ opacity: 0, scale: 0, transition: DEFAULT_TRANSITION }}
                >
                    <div className={clsx(classes.iconWrap, 'flex items-center justify-center')}>
                        {isError ? (
                            <IconClose strokeWidth="2.5" additionalClasses={classes.icon} />
                        ) : (
                            <IconTick additionalClasses={classes.icon} />
                        )}
                    </div>
                    <div className={classes.content}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>,
        bodyRef.current
    );
};

Snackbar.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    additionalClasses: PropTypes.string,
    isError: PropTypes.bool,
    autoHideDuration: PropTypes.number,
};

export default Snackbar;
