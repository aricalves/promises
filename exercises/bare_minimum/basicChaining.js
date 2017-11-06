/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

const fs = require('fs');
const Promise = require('bluebird');
const gh = require('./promisification.js').getGitHubProfileAsync;

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath)
    .then(file => 
      file.toString().split('\n')[0]
    )
    .then(user => 
      gh(user)
    )
    .then(profile => {
      profile = (JSON.stringify(profile))
      return fs.writeFileAsync(writeFilePath, profile)
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};