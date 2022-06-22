import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { b64toBlob } from '../../helpers/utils';

const CardResultAttachments = ({ attachment }) => {
    const bodyRef = useRef(document.body);

    const downloadHandler = () => {
        const $temporaryDownloadLink = document.createElement('a');
        const blob = b64toBlob(attachment.data, attachment.content_type);

        $temporaryDownloadLink.style.display = 'none';
        bodyRef.current.appendChild($temporaryDownloadLink);
        $temporaryDownloadLink.setAttribute('href', URL.createObjectURL(blob));
        $temporaryDownloadLink.setAttribute('download', attachment.file_name);
        $temporaryDownloadLink.click();
        URL.revokeObjectURL($temporaryDownloadLink.href);
        bodyRef.current.removeChild($temporaryDownloadLink);
    };

    return (
        <div className="mt-15">
            <div className="fw-500 fz-12 op06">Download Results</div>
            <button className="mt-10" onClick={downloadHandler}>
                Download
            </button>
        </div>
    );
};

CardResultAttachments.propTypes = {
    attachment: PropTypes.shape({
        file_name: PropTypes.string.isRequired,
        content_type: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
    }),
};

export default memo(CardResultAttachments);
