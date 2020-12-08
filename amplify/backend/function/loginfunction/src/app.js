/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var mysql = require('mysql');
var pbkdf2 = require('pbkdf2')

const SaltByteSize = 16;
const HashByteSize = 20; // to match the size of the PBKDF2-HMAC-SHA-1 hash (bigger won't be better)
const Pbkdf2Iterations = 10000;

const VersionIndex = 0;
const IterationIndex = 1;
const SaltIndex = 2;
const Pbkdf2Index = 3;
const delimiter = ';';


var db = mysql.createConnection({
  host: 'blcloud001.cvz4tk8yder9.us-east-1.rds.amazonaws.com',
  // host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'bl$oftDB2174',
  database: 'chameleon'
});

db.connect((err)=>{
  if (err) {
    throw err;
  }
  console.log('connected to database')
})



// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/login', function(req, res) {

  res.json({message: 'add username/password paramaters'})
});

app.get('/login/:username/:password', function(req, res) {
  // Add your code here
  let username = req.params.username;
  let password = req.params.password;
  // console.log(req.params)
  if (username === "test" && password === "test") {
    res.json({success: 'get dbdata', validUser: false, validPassword: false})
  }

  var isValid = false
  var isUser = true
  db.query(
    `SELECT usr_password FROM sr_users
    WHERE usr_username = "${username}"; `, function(error, results, fields) {
      if (error || results.length === 0) {
        console.log('error', error)
        res.json({success: 'get dbdata', validUser: false, validPassword: isValid})
      } else {
        let correctHash = results[0].usr_password
        var split = correctHash.split(delimiter);
        var version = parseInt(split[VersionIndex].substring(1))
        var iterations = parseInt(split[IterationIndex]);
        var salt = Buffer.from(split[SaltIndex], 'base64');
        var hash = Buffer.from(split[Pbkdf2Index], 'base64')
        if (version == 1) {
          var testHash = pbkdf2.pbkdf2Sync(password, salt, iterations, hash.length)
          isValid = Buffer.compare(hash, testHash) === 0
        }
        res.json({success: 'get dbdata', validUser: true, validPassword: isValid})
      }
    }
  )
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
