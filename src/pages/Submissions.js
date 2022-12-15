import { useEffect, useState } from "react";
import { startCase } from "lodash";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import downloadPdf from "../util/download-pdf";

export default function Submissions() {
  const [submissions, setSubmissions] = useState(null);
  const [page, setPage] = useState(1);

  async function getSubmissions(page) {
    if (!page) page = 1;
    await fetch(`${process.env.REACT_APP_API_URL}/get-submissions?page=${page}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setSubmissions(data))
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getSubmissions(page);
  }, [page]);
  return (
    <>
      {submissions ? (
        <div>
          <div className="mb-3">
            <h4>Total submission found: {submissions.totalSubmissions}</h4>
          </div>
          {submissions.submissions.map((submission, index) => {
            return (
              <div className="card mb-3" key={index}>
                <div className="card-header">
                  Submission ID: {submission.submissionId}
                </div>
                <div className="card-body">
                  {submission.patientName
                    ? startCase(submission.patientName)
                    : startCase(submission.name)}
                </div>
                <div className="card-footer">
                <Link to={`/submission/${submission.submissionId}`}>View</Link> {" "}
                  <Link to={`/sign/${submission.submissionId}`}>Sign</Link> <span className="link-primary text-decoration-underline" onClick={() => {
                    downloadPdf(submission.submissionId, `${submission.submissionId}.pdf`)
                  }}>Download</span> Updated
                  at: {dayjs(submission.datetime).format("MM/DD/YYYY hh:mm a")}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {submissions ? (
        <div className="text-center">
          <h4>
            <span
              className="link-primary text-decoration-underline"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Back
            </span>
            {" "}Page {submissions.page} of {Math.ceil(submissions.totalSubmissions / 20)}{" "}
            <span
              className="link-primary text-decoration-underline"
              onClick={() => {
                if (page < submissions.totalSubmissions / 20) {
                  setPage(page + 1);
                }
              }}
            >
              Next
            </span>
          </h4>
        </div>
      ) : null}
    </>
  );
}
