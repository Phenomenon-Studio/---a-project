import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../components/helpers/withReducer';
import resultsReducer, {
    clearStateInResults,
    getResults,
    selectResultsList,
    selectResultsLoading,
} from '../../store/slices/resultsSlice';
import { useChangeTitle } from '../../hooks/useChangeTitle';
import DashboardLayout from '../../layouts/DashboardLayout';
import EmptyState from '../../components/EmptyState';
import CardResults from '../../components/CardResults';
import Spinner from '../../components/Spinner';

const Results = () => {
    useChangeTitle('Results');

    const dispatch = useDispatch();
    const loading = useSelector(selectResultsLoading);
    const list = useSelector(selectResultsList);

    useEffect(() => {
        dispatch(getResults());

        return () => {
            dispatch(clearStateInResults());
        };
    }, [dispatch]);

    if (loading) {
        return <Spinner fullScreen={false} />;
    }

    return (
        <DashboardLayout title="Results">{list?.length ? <CardResults list={list} /> : <EmptyState />}</DashboardLayout>
    );
};

export default withReducer('results', resultsReducer)(Results);
