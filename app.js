const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const client = require("@mailchimp/mailchimp_marketing");
const https = require("https");
client.setConfig({apiKey: "56a336b17e7887c80735f9af7f507dd0-us9",  server: "us9"});




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

client.setConfig({
  apiKey: "56a336b17e7887c80735f9af7f507dd0-us9",
  server: "us9",
});

app.post("/", function(req, res) {

  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  console.log(firstName, lastName, email);

  const subscribingUser = {firstName: firstName, lastName: lastName, email: email}

  const run = async () => {
  try {
    const response = await client.lists.addListMember("502b76b69e", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(response);
    res.sendFile(__dirname + "/success.html");
  } catch (err) {
    console.log(err.status);
    res.sendFile(__dirname + "/failure.html");
  }
};

    run();



});

app.post("/failure", function(req, res) {
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

// API Key
// 56a336b17e7887c80735f9af7f507dd0-us9

// list id
//502b76b69e
