import * as dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../App";
import makeConfig from "../util/make-config";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import TourMessage from "../components/tour-message";

export default function Forms() {
  const [forms, setForms] = useState(new Array(0));
  const {accessToken, practiceId} = useContext(TokenContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      await axios(makeConfig("get", `/practice/${practiceId}/forms`, accessToken))
    .then((response) => {
      setForms(response.data)
    })
    .catch((e) => {
      console.log(e);
    });
    
  }

    getData();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  var message = `<p><b>GET</b> /api/v1/practice/:practiceId/forms<br /><br />
  Returns an array of forms for the practice.
  </p>`;

  return (
    <>
    <TourMessage
        message={message}
        open={open}
        close={handleClose}
      />
      <div className="card mb-3">
        <h5 className="card-title text-center p-2 pt-3">
          Get Forms
          <InfoIcon onClick={handleOpen} />
        </h5>
      </div>
      {forms.length ? (
        forms.map((form, index) => {
          return (
            <div className="card mb-3 p-3" key={index}>
              <a href={form.standardizedUrl}>{form.formName}</a> <small>Created on: {dayjs(form.createdAt).format("MM/DD/YY hh:mma")}</small>
        
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
