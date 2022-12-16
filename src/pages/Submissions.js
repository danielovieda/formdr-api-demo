import { useEffect, useState, useContext } from "react";
import { startCase } from "lodash";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import downloadPdf from "../util/download-pdf";
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import TourMessage from "../components/tour-message";

export default function Submissions() {
  const [submissions, setSubmissions] = useState(null);
  const [page, setPage] = useState(1);
  const {accessToken, practiceId} = useContext(TokenContext);
  const [open, setOpen] = useState(false);

  async function getSubmissions(page) {
    if (!page) page = 1;
    await axios(makeConfig("get", `/practice/${practiceId}/submissions?page=${page}`, accessToken))
    .then((response) => {
      setSubmissions(response.data)
    })
    .catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    getSubmissions(page);
  }, [page]);

  var message = `<p><b>GET</b> /api/v1/practice/:practiceId/submissions?page=1<br /><br />
  Returns an array of submissions available to the practice.
  </p>`;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>  <TourMessage
    message={message}
    open={open}
    close={handleClose}
  />
  <div className="card mb-3">
    <h5 className="card-title text-center p-2 pt-3">
      Get Submissions
      <InfoIcon onClick={handleOpen} />
    </h5>
  </div>
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
                  <span className="link-primary text-decoration-underline" style={{cursor: 'pointer'}} onClick={() => {
                    downloadPdf(submission.submissionId, `${submission.submissionId}.pdf`, practiceId, accessToken)
                  }}>Download</span> Updated
                  at: {dayjs(submission.updatedAt).format("MM/DD/YYYY hh:mm a")}
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
