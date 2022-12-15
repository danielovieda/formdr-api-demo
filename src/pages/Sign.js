import { useEffect, useState } from "react";
import PdfViewerComponent from "../components/PdfViewerComponent";
import { useParams } from "react-router-dom";

const Sign = () => {
  const { submissionId } = useParams();
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    async function pipePdf(submissionId) {
      await fetch(
        `${process.env.REACT_APP_API_URL}/download-pdf?submissionId=${submissionId}`
      )
        .then((data) => {
            return data.json();
        })
        .then((data) => {
          setPdf(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    pipePdf(submissionId);
  }, []);

  return (
    <>
      {pdf ? <PdfViewerComponent b64document={pdf} /> : <div>Loading PDF...</div>}
    </>
  );
};

export default Sign;
