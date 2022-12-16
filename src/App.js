import Navigation from "./pages/Navigation";
import Login from "./pages/Login";
import Records from "./pages/Records";
import Patient from "./pages/Patient";
import Forms from "./pages/Forms.js";
import NotFound from "./pages/404";
import Submission from "./pages/Submission";
import Submissions from "./pages/Submissions";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";
import CreateSubmission from "./pages/CreateSubmission";
import UpdateSubmission from "./pages/UpdateSubmission";
import Sign from "./pages/Sign";
import { useEffect, createContext, useState } from "react";
import axios from "axios";
import qs from "qs";

export const TokenContext = createContext(null);

const user = process.env.REACT_APP_FORMDR_USERNAME;
const pass = process.env.REACT_APP_FORMDR_PASSWORD;
const client = process.env.REACT_APP_FORMDR_CLIENT_ID;
const secret = process.env.REACT_APP_FORMDR_SECRET_ID;
const practiceId = process.env.REACT_APP_PRACTICE_ID;

const tokenPayload = {
  grant_type: "password",
  username: user,
  password: pass,
  client_id: client,
  client_secret: secret,
  scope: "read,write,edit",
};

const getTokenOptions = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log(user, pass, client, secret);
    async function getToken() {
      await axios
        .post(
          "https://api.formdr.com/api/oauth/token",
          qs.stringify(tokenPayload),
          getTokenOptions
        )
        .then((res) => {
          setAccessToken(res.data.accessToken);
          console.log("successfully retrieved tokens ...");
        })
        .catch((e) => console.log(e));
    }

    getToken();
  }, []);

  const context = {
    accessToken: accessToken,
    practiceId: practiceId
  }

  return (
    <>
      <TokenContext.Provider value={context}>
        <Navigation />
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-6 offset-md-3">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="records" exact element={<Records />} />
                <Route
                  path="patient/:firstName/:lastName"
                  element={<Patient />}
                />
                <Route path="forms" element={<Forms />} />
                <Route path="submissions" element={<Submissions />} />
                <Route
                  path="submission/:submissionId"
                  element={<Submission />}
                />
                <Route
                  path="create-submission"
                  element={<CreateSubmission />}
                />
                <Route
                  path="update-submission/:id"
                  element={<UpdateSubmission />}
                />
                <Route path="settings" element={<Settings />} />
                <Route path="sign/:submissionId" element={<Sign />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </TokenContext.Provider>
    </>
  );
}

export default App;
