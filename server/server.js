require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("qs");

const app = express();
const port = 1337;
const user = process.env.REACT_APP_FORMDR_USERNAME;
const pass = process.env.REACT_APP_FORMDR_PASSWORD;
const client = process.env.REACT_APP_FORMDR_CLIENT_ID;
const secret = process.env.REACT_APP_FORMDR_SECRET_ID;
const practiceId = process.env.REACT_APP_PRACTICE_ID;
var accessToken;
var apiUrl = "https://api.formdr.com/api/v1";

function makeConfig(method, endpoint, token) {
  return {
    method: method,
    url: `${apiUrl}${endpoint}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

function log(string) {
  console.log("\x1b[36m%s\x1b[0m", string);
}

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

async function getToken() {
  await axios
    .post(
      "https://api.formdr.com/api/oauth/token",
      qs.stringify(tokenPayload),
      getTokenOptions
    )
    .then((res) => {
      accessToken = res.data.accessToken;
      log("successfully retrieved tokens ...");
    })
    .catch((e) => console.log(e));
}

getToken();

app.use(cors());

app.get("/token", async (req, res) => {
  log("refreshing token...");
  await getToken();
  if (accessToken) {
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(400).send({ message: "Unable to get token." });
  }
  return accessToken;
});

app.get("/forms", async (req, res) => {
  log("===== /forms was called =====");
  await axios(makeConfig("get", `/practice/${practiceId}/forms`, accessToken))
    .then((response) => {
      log("successfully sent data!");
      res.json(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/patient-submissions", async (req, res) => {
  log("===== /patient-submissions was called =====");
  await axios(
    makeConfig(
      "get",
      `/practice/${practiceId}?firstName=${req.query.firstName}&lastName=${req.query.lastName}`,
      accessToken
    )
  )
    .then((response) => {
      log("successfully sent data!");
      res.json(response.data);
    })
    .catch((e) => {
      switch (e?.response?.data) {
        case "Error: Wrong Credentials":
          res
            .status(400)
            .send({ message: "Please check your credentials and/or token." });
          return;
        default:
          res.status(404).send({ message: "Patient not found." });
          return;
      }
    });
});

app.get("/get-records", async (req, res) => {
  log("===== /get-records called ====");
  await axios(
    makeConfig(
      "get",
      `/practice/${practiceId}/records${
        req.query.page ? `?page=${req.query.page}` : ""
      }`,
      accessToken
    )
  )
    .then((response) => {
      log("successfully sent data!");
      res.json(response.data);
    })
    .catch((e) => {
      switch (e?.response?.data) {
        case "Error: Wrong Credentials":
          res
            .status(400)
            .send({ message: "Please check your credentials and/or token." });
          return;
          case "Invalid token: access token has expired":
            getToken();
            res.status(500).send({message: 'Please try again.'})
            return;
        default:
          res.status(404).send({ message: "Patient not found." });
          return;
      }
    });
});

app.get("/get-submission", async (req, res) => {
  log("===== /get-submission called =====");
  log(req.query)
  await axios(
    makeConfig(
      'get',
      `/practice/${practiceId}/submissions/${req.query.submissionId}`,
      accessToken
    )).then((response) => res.json(response.data))
    .catch((e) => {
      console.log(e)
    })
});

app.get("/get-submissions", async (req,res) => {
  log("===== /get-submissions called =====");
  log(req.query)
  await axios(
    makeConfig(
      'get',
      `/practice/${practiceId}/submissions?page=${req.query.page}`,
      accessToken
    )).then((response) => res.json(response.data))
    .catch((e) => {
      console.log(e)
    })
})

app.get("/download-pdf", async (req, res) => {
  log("===== downloading pdf ====");
  console.log('hello', req.query);
  await axios(makeConfig(
    'get',
    `/practice/${practiceId}/submissions/${req.query.submissionId}/pdf`,
    accessToken
  ), {responseType: 'arraybuffer'}).then((response) => { res.json(response.data)})
})

app.post("/token", (req, res) => {
  res.send("Hello World!");
});

app.get("/patients", (req, res) => {});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
