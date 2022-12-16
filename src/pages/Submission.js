import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import axios from "axios";

export default function Submission() {
  const [submission, setSubmission] = useState(null);
  const { submissionId } = useParams();
  const {accessToken, practiceId} = useContext(TokenContext);

  async function getSubmissions(submissionId) {
    if (!submissionId) return;
    await axios(
        makeConfig(
          'get',
          `/practice/${practiceId}/submissions/${submissionId}`,
          accessToken
        )).then((response) => setSubmission(response.data))
        .catch((e) => {
          console.log(e)
        })
  }

  useEffect(() => {
    getSubmissions(submissionId);
  }, [submissionId]);

  return (
    <>
    {submission ? <>
        <div className="row">
        <div className="col-md-6"><b>Submission ID</b></div>
              <div className="col-md-6">{submission.id}</div>
        </div>
        <div className="row">
        <div className="col-md-6"><b>Record ID</b></div>
              <div className="col-md-6">{submission.recordId}</div>
        </div>
        <div className="row">
        <div className="col-md-6"><b>Patient Name</b></div>
              <div className="col-md-6">{submission.patientName}</div>
        </div>
        <hr />
    </> : null}
      {submission ? (
        Object.entries(submission.submissionJson).map(([key, value]) => {
          return (
            <div key={key} className="row">
              <div className="col-md-6"><b>{key}</b></div>
              <div className="col-md-6">{JSON.stringify(value)}</div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
