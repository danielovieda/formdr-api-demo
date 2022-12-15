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

function App() {
  return (
    <>
      <Navigation />
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <Routes>
              <Route path="/" element={<Login />} />
                <Route path="records" exact element={<Records />} />
                <Route path="patient/:firstName/:lastName" element={<Patient />} />
                <Route path="forms" element={<Forms />} />
                <Route path="submissions" element={<Submissions />} />
                <Route path="submission/:submissionId" element={<Submission />} />
                <Route path="create-submission" element={<CreateSubmission />} />
                <Route path="update-submission/:id" element={<UpdateSubmission />} />
                <Route path="settings" element={<Settings />} />
                <Route path="sign/:submissionId" element={<Sign />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
