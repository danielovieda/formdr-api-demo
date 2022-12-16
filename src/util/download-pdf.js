
import axios from 'axios';
import makeConfig from './make-config';

async function downloadPdf(submissionId, filename, practiceId, accessToken) {
  await axios(
    makeConfig(
      "get",
      `/practice/${practiceId}/submissions/${submissionId}/pdf`,
      accessToken
    ),
    { responseType: "arraybuffer" }
  ).then((response) => {
    triggerDownload(response.data, filename)
  });
}

function triggerDownload(pdf, name) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export default downloadPdf;
