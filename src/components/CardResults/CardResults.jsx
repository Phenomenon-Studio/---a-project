import { memo } from 'react';
import PropTypes from 'prop-types';
import CardResult from './CardResult';
import classes from './CardResults.module.css';

const CardResults = ({ list }) => {
    return (
        <div className={classes.mainWrap}>
            {list.map(({ id, title, image, name, date, time, observations, attachment }) => (
                <CardResult
                    key={id}
                    title={title}
                    image={image}
                    name={name}
                    date={date}
                    time={time}
                    observations={observations}
                    attachment={attachment}
                />
            ))}
        </div>
    );
};

CardResults.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            observations: PropTypes.arrayOf(
                PropTypes.shape({
                    test_id: PropTypes.number.isRequired,
                    test_name: PropTypes.string.isRequired,
                    result: PropTypes.string.isRequired,
                }).isRequired
            ).isRequired,
            attachment: PropTypes.shape({
                file_name: PropTypes.string.isRequired,
                content_type: PropTypes.string.isRequired,
                data: PropTypes.string.isRequired,
            }),
        }).isRequired
    ).isRequired,
};

export default memo(CardResults);
