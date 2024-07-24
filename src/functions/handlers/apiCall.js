const apiURL = "https://hp-api.onrender.com/api/characters";
const request = require("sync-request");
const apiCall = function (client, mainPath) {
  client.getChars = () => {
    const res = request("GET", apiURL);
    const bodyString = res.getBody(/*'utf8'*/);
    client.objectArray = JSON.parse(bodyString);
    for (const char of client.objectArray) {
      client.charsArray.push(char.name);
    }
  };
};

module.exports = apiCall;
