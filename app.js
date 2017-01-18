var express = require('express');
var google = require('googleapis');
var app = express();


app.use(express.static('static'));
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});

var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
    "287446524568-i87qtiqmfv2o9nqsppkhnoh36ev70qer.apps.googleusercontent.com",
    "tS60r1xim3ZBbfg4Nmn8lAZv",
    "http://localhost:4000/oauthcallback"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
    "https://www.googleapis.com/auth/gmail.modify"
];

var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as string
    scope: scopes
});
app.get('/url', function (request, res) {
    res.send(url);
})

app.get('/tokens', function (request, response) {
    var code = request.query.code;
    console.log(code);
    oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
            console.log(err);
            response.send(err);
            return;         
        }

        console.log(err);
        console.log(tokens);
        oauth2Client.setCredentials(tokens);
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        response.send("check node console for access tokens");
    });
})