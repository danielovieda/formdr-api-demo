import { useParams } from "react-router-dom";
import { startCase } from "lodash";
import { useEffect, useState, useContext } from "react";
import InfoIcon from "@mui/icons-material/Info";
import TourMessage from "../components/tour-message";
import EmrModal from '../components/emrModal';
import downloadPdf from '../util/download-pdf';
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import axios from "axios";

export default function Patient() {
  const { firstName, lastName } = useParams();
  const [submissions, setSubmissions] = useState(new Array(0));
  const [open, setOpen] = useState(false);
  const {accessToken, practiceId} = useContext(TokenContext);

  var message = `<p><b>GET</b> /api/v1/practice/123?firstName=${firstName}&lastName=${lastName}<br /><br />
  Returns an array of submissions with various data.
  </p>`;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getPatient() {
      await axios(
        makeConfig(
          "get",
          `/practice/${practiceId}?firstName=${firstName}&lastName=${lastName}`,
          accessToken
        )
      )
        .then((response) => {
          setSubmissions(response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getPatient();
  }, []);

  return (
    <>
    <EmrModal />
      <TourMessage
        message={message}
        open={open}
        close={handleClose}
      />
      <div className="card mb-3">
        <h5 className="card-title text-center p-2 pt-3">
          {startCase(firstName)} {startCase(lastName)}{" "}
          <InfoIcon onClick={handleOpen} />
        </h5>
      </div>

      <div className="card mb-3">
        <h5 className="card-title text-center p-2 pt-3">Submissions</h5>
        <div className="card-body">
          <div className="accordion" id="patientSubmissions">
            {submissions.length ? (
              submissions.map((submission, index) => {
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`submission${index}`}>
                      <button
                        className={`accordion-button ${
                          index === 0 ? null : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}
                      >
                        Submission #{index + 1}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordian-collapse collapse ${
                        index === 0 ? "show" : null
                      }`}
                      aria-labelledby={`submission${index}`}
                      data-bs-parent="#patientSubmissions"
                    >
                      <div className="accordion-body">
                        <div className="row mb-3">
                          <div className="col justify-content-end d-flex me-0">
                            <ul className="list-group list-group-horizontal pe-0">
                              <li className="list-group-item border-0">
                                <button
                                  className="btn btn-primary p-1"
                                  onClick={() => {
                                    downloadPdf(
                                      submission.submissionId,
                                      `${startCase(firstName)}_${startCase(
                                        lastName
                                      )}_${submission.submissionId}.pdf`, practiceId, accessToken
                                    );
                                  }}
                                >
                                  Download PDF
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="row border border-1">
                          <div className="col border border-1 fw-bold">
                            First Name
                          </div>
                          <div className="col border border-1">
                            {startCase(firstName)}
                          </div>
                        </div>
                        <div className="row border border-1">
                          <div className="col border border-1 fw-bold">
                            Last Name
                          </div>
                          <div className="col border border-1">
                            {startCase(lastName)}
                          </div>
                        </div>
                        <div className="row border border-1">
                          <div className="col border border-1 fw-bold">
                            Field Name
                          </div>
                          <div className="col border border-1">
                            {JSON.stringify(submission)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}
