export const mergePdfsInB64 = async urls => {
    try {
        const PDFDocument = await import('pdf-lib').then(mod => mod.PDFDocument);
        const pdfDoc = await PDFDocument.create();
        const donorsPdfDocx = [];
        let pages = [];

        for await (const url of urls) {
            const donorPdfBytes = await fetch(url).then(res => res.arrayBuffer());
            const donorPdfDoc = await PDFDocument.load(donorPdfBytes);

            donorsPdfDocx.push(donorPdfDoc);
        }

        for await (const donorPdfDocx of donorsPdfDocx) {
            const totalPages = donorPdfDocx.getPageCount();
            const arrayOfPages = [...Array(totalPages)].map((_, i) => i);
            const donorPages = await pdfDoc.copyPages(donorPdfDocx, arrayOfPages);

            pages = pages.concat(donorPages);
        }

        for (const page of pages) {
            pdfDoc.addPage(page);
        }

        const pdfDataUri = await pdfDoc.saveAsBase64();

        return {
            data: pdfDataUri,
            content_type: 'application/pdf',
            file_name: 'results.pdf',
        };
    } catch (error) {
        console.error(`Merge PDFs has error: ${error.message}`);

        return null;
    }
};

export const b64toBlob = (dataUri, contentType = '', sliceSize = 512) => {
    const byteCharacters = window.atob(dataUri);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};
