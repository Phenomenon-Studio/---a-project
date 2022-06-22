import { memo } from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ title = 'It`s empty here', text = 'Nothing was added yet', children }) => {
    return (
        <div className="items__empty flex items-center max-w-300">
            <div>
                <h3 className="title title--xs title--with-default-lh tracking-tight">{title}</h3>
                {text && <div className="fw-500 mt-10">{text}</div>}
                {children}
            </div>
        </div>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default memo(EmptyState);
