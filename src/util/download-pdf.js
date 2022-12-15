async function downloadPdf(submissionId, filename) {
    await fetch(`http://localhost:1337/download-pdf?submissionId=${submissionId}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        triggerDownload(data, filename);
      })
      .catch((e) => {
        console.log(e);
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

  export default downloadPdf