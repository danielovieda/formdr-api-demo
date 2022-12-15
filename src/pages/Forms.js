import * as dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Forms() {
  const [forms, setForms] = useState(new Array(0));
  useEffect(() => {
    async function getData() {
      await fetch(`${process.env.REACT_APP_API_URL}/forms`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setForms(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getData();
  }, []);
  return (
    <>
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
