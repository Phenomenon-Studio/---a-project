import { createSlice } from '@reduxjs/toolkit';
import { api, generateCancelRequest } from '../../api/axios';
import dayjs from '../../helpers/dayjs';
import { mergePdfsInB64 } from '../../helpers/utils';

const requestCancelGetResults = { cancel: null };
const transformResults = async results => {
    const list = [];

    for await (const result of results) {
        let transformedAttachment = result.attachments[0];

        if (result.attachments.length > 1) {
            transformedAttachment = await mergePdfsInB64(
                result.attachments.map(attachment => `data:application/pdf;base64,${attachment.data}`)
            );
        }

        const [date, time] = result.report_sent_datetime.split(' ');
        const data = {
            id: result.order_number,
            title: `${result.order.product_name} Testing Results`,
            name: result.order.product_name,
            image: result.order.product_thumbnail_url,
            observations: result.observations,
            attachment: transformedAttachment,
            date: dayjs(date).format('MMMM DD, YYYY'),
            time: dayjs(`${date} ${time}`).format('hh:mm a'),
        };

        list.push(data);
    }

    return list;
};

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        loading: false,
        list: null,
    },
    reducers: {
        setValueInResults: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        setResults: (state, action) => {
            const results = action.payload;

            if (Array.isArray(results)) {
                state.list = results;
            } else {
                state.list = null;
            }
        },
        clearStateInResults(state) {
            state.list = null;
            state.loading = true;
        },
    },
});

export const { setValueInResults, setResults, clearStateInResults } = resultsSlice.actions;

export const getResults = () => async dispatch => {
    const { cancelToken, isCancel } = generateCancelRequest(requestCancelGetResults);
    dispatch(setValueInResults({ name: 'loading', value: true }));

    try {
        const { status, data } = await api.get(`/api/results?timezone=${dayjs.tz.guess()}`, {
            cancelToken,
        });

        if (status < 200 && status >= 300) {
            throw Error(`Error with status ${status}`);
        }

        const transformedResults = await transformResults(data.data);

        dispatch(setResults(transformedResults));
        dispatch(setValueInResults({ name: 'loading', value: false }));

        return true;
    } catch (error) {
        if (isCancel(error)) {
            return;
        }

        dispatch(setResults(null));
        dispatch(setValueInResults({ name: 'loading', value: false }));

        return false;
    }
};

export const selectResultsList = state => state.results.list;
export const selectResultsLoading = state => state.results.loading;

export default resultsSlice.reducer;
