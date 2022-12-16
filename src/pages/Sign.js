import { useEffect, useState, useContext } from "react";
import PdfViewerComponent from "../components/PdfViewerComponent";
import { useParams } from "react-router-dom";
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import axios from "axios";

const Sign = () => {
  const { submissionId } = useParams();
  const [pdf, setPdf] = useState(null);
  const {accessToken, practiceId} = useContext(TokenContext);

  useEffect(() => {
    async function getPdf(submissionId) {
        await axios(makeConfig(
            'get',
            `/practice/${practiceId}/submissions/${submissionId}/pdf`,
            accessToken
          ), {responseType: 'arraybuffer'}).then((response) => { setPdf(response.data)})
    }

    getPdf(submissionId);
  }, []);

  return (
    <>
      {pdf ? <PdfViewerComponent b64document={pdf} /> : <div>Loading PDF...</div>}
    </>
  );
};

export default Sign;
