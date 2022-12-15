import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import * as dayjs from "dayjs";

export default function Records() {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    async function getRecords() {
      await fetch(`${process.env.REACT_APP_API_URL}/get-records`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setRecords(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getRecords();
  }, []);

  function lower(string) {
    if (string) {
      return string.toLowerCase();
    } else {
      return null
    }
  }

  return (
    <>
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
