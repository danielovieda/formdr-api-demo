import {
  Link
} from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="card">
      <div className="card-body">
      <h5 className="card-title">Login to</h5>
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormEmail2" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleDropdownFormEmail2"
            placeholder="email@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormPassword2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleDropdownFormPassword2"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="dropdownCheck2"
            />
            <label className="form-check-label" htmlFor="dropdownCheck2">
              Remember me
            </label>
          </div>
        </div>
        <Link to="/forms">
        <button className="btn btn-primary">
          Sign in
        </button>
          </Link>
        </div>
      </div>
    </>
  );
}
