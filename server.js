const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
var https = require("https");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.post("/user", (req, res) => {
  const username = req.body.username;
  const first = req.body.first;
  const last = req.body.last;
  const secret = req.body.secret;

  const data = {
    username: username,
    first_name: first,
    last_name: last,
    secret: secret,
  };
  const jsonData = JSON.stringify(data);
  const url = "https://api.chatengine.io/users/";
  console.log(jsonData);
  const options = {
    method: "POST",

    headers: {
      "PRIVATE-KEY": "7a6688ab-d65b-40c6-9365-74a1317932ef",
      "Content-Type": "application/json",
    },
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 201) {
      response.on("data", function (data) {
        //console.log(JSON.parse(data));
        res.send("pass");
      });
    } else {
      res.send("fail");
    }
  });

  request.write(jsonData);

  request.end();

  console.log(data);
});

app.post("/login", (req, res) => {
  const loginUsername = req.body.loginUsername;
  const loginPassword = req.body.loginPassword;
  const data = {
    "Project-ID": "32fde4d8-043c-4ba6-9fd8-23f295031d61",
    "User-Name": loginUsername,
    "User-Secret": loginPassword,
  };

  const jsonData = JSON.stringify(data);
  const url = "https://api.chatengine.io/chats/";
  console.log(jsonData);
  const options = {
    method: "POST",
    headers: {
      "Project-ID": "32fde4d8-043c-4ba6-9fd8-23f295031d61",
      "User-Name": loginUsername,
      "User-Secret": loginPassword,
      "Content-Type": "application/json",
    },
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 201) {
      response.on("data", function (data) {
        //console.log(JSON.parse(data));
        res.send("pass");
      });
    } else {
      res.send("bad credentials");
    }
  });

  request.write(jsonData);
  request.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
