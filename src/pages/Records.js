import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import * as dayjs from "dayjs";
import axios from "axios";
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import InfoIcon from "@mui/icons-material/Info";
import TourMessage from "../components/tour-message";

export default function Records() {
  const [records, setRecords] = useState(null);
  const [open, setOpen] = useState(false);
  const {accessToken, practiceId} = useContext(TokenContext);

  useEffect(() => {
    async function getData() {
      await axios(makeConfig("get", `/practice/${practiceId}/records`, accessToken))
    .then((response) => {
      setRecords(response.data)
    })
    .catch((e) => {
      console.log(e);
    });
    }

    getData();
  }, []);

  function lower(string) {
    if (string) {
      return string.toLowerCase();
    } else {
      return null
    }
  }

  var message = `<p><b>GET</b> /api/v1/practice/:practiceId/records<br /><br />
  Returns an array of records available to the practice.
  </p>`;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <TourMessage
        message={message}
        open={open}
        close={handleClose}
      />
      <div className="card mb-3">
        <h5 className="card-title text-center p-2 pt-3">
          Get Records
          <InfoIcon onClick={handleOpen} />
        </h5>
      </div>
      {records ? (
        <h4>Total records found: {records.totalRecords}</h4>
      ) : null}
      {records ? (
        records.records.map((record, index) => {
          return (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <Link
                  to={`../patient/${lower(record.firstName)}/${lower(record.lastName)}`}
                >
                  {startCase(record.firstName)}
                  {record.lastName ? ` ${startCase(record.lastName)}` : null}
                </Link>
                <span>
                  <small>{' '}
                    {record.birthday ? `DOB: ${dayjs(record.birthday).format("MM/DD/YYYY")} `: null}
                    {`[${record.recordId}]`}
                  </small>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      {records ? (
        <h4>Page {records.page} of {Math.ceil(records.totalRecords / 20)}</h4>
      ) : null}
    </>
  );
}
