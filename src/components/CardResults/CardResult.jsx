import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CardResultAttachments from './CardResultAttachments';
import classes from './CardResults.module.css';

const CardResult = ({ title, observations, name, image, date, time, attachment }) => {
    return (
        <div className={classes.wrap}>
            <h3 className="title title--sm tracking-tight">{title}</h3>
            <div className={clsx(classes.inner, 'mt-20')}>
                <ul className={classes.leftBox}>
                    {observations.map(item => (
                        <li key={item.test_id}>
                            <div className={clsx(classes.leftBoxTitle, 'fw-500 fz-12')}>{item.test_name}</div>
                            <div className={clsx(classes.leftBoxText, 'fw-600 fz-14')}>{item.result}</div>
                        </li>
                    ))}
                </ul>
                <div className={classes.rightBox}>
                    <div className={classes.head}>
                        <div className={classes.imgWrap}>
                            <img src={image} alt="" />
                        </div>
                        <div className="fw-500">
                            <div className={clsx(classes.headTitle, 'fz-12')}>Kit</div>
                            <div className={clsx(classes.headValue, 'fz-14')}>{name}</div>
                        </div>
                    </div>
                    <ul className={clsx(classes.rightBoxList, 'fw-500')}>
                        <li>
                            <div className={clsx(classes.rightBoxLabel, 'fz-12')}>Date</div>
                            <div className="fz-14">{date}</div>
                        </li>
                        <li>
                            <div className={clsx(classes.rightBoxLabel, 'fz-12')}>Time</div>
                            <div className="fz-14">{time}</div>
                        </li>
                    </ul>
                    <CardResultAttachments attachment={attachment} />
                </div>
            </div>
        </div>
    );
};

CardResult.propTypes = {
    title: PropTypes.string.isRequired,
    observations: PropTypes.arrayOf(
        PropTypes.shape({
            test_id: PropTypes.number.isRequired,
            test_name: PropTypes.string.isRequired,
            result: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    attachment: PropTypes.shape({
        file_name: PropTypes.string.isRequired,
        content_type: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
    }),
};

export default memo(CardResult);
