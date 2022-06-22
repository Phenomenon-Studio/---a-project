import PropTypes from 'prop-types';
import { injectReducer } from '../../store';

const withReducer = (key, reducer) => WrappedComponent => {
    injectReducer(key, reducer);

    return props => <WrappedComponent {...props} />;
};

withReducer.propTypes = {
    props: PropTypes.object,
};

export default withReducer;
