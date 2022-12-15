import { useEffect, useState } from "react";
import { startCase } from "lodash";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import downloadPdf from "../util/download-pdf";
import { useParams } from "react-router-dom";

export default function Submission() {
  const [submission, setSubmission] = useState(null);
  const { submissionId } = useParams();

  async function getSubmissions(submissionId) {
    if (!submissionId) return;
    await fetch(
      `${process.env.REACT_APP_API_URL}/get-submission?submissionId=${submissionId}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => setSubmission(data))
      .catch((e) => {
        console.log(e);
      });
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
            console.log('key', key)
            console.log('value', value)
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
