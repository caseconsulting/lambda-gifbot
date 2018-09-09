"use strict";

const _ = require("lodash");
const axios = require("axios");

exports.handler = function(event, context, callback) {
  let body = JSON.parse(event.body);
  const searchTerm = JSON.stringify(body.command);
  const companyId = body.creator.company.id;
  const apiKey = `${process.env.GifbotAPIDevKey}`;
  const limit = "50";
  const rating = "pg";
  const searchEndPoint = "https://api.giphy.com/v1/gifs/translate";
  const hokieGifs = [
    "https://media.giphy.com/media/600ZssZNotyYcZ4GQa/giphy.gif",
    "https://media.giphy.com/media/3KZuZEDsLvESk/giphy.gif",
    "https://media.giphy.com/media/dJuF2C7Qzy3LO/giphy.gif",
    "https://media.giphy.com/media/spxRY1rX9vXzy/giphy.gif",
    "https://media.giphy.com/media/kUASrqrlOAgvu/giphy.gif",
    "https://media.giphy.com/media/12UO7RnO4kJe3gYMeN/giphy.gif",
    "https://media.giphy.com/media/xT9IgB58Rp6Ox6v9gQ/giphy.gif",
    "https://media.giphy.com/media/3o6EQ9DBqziuzOK5gY/giphy.gif",
    "https://media.giphy.com/media/xT4Ap4GdBbmW2jlrs4/giphy.gif",
    "https://media.giphy.com/media/3o6EQeKgRtR1cgHiEw/giphy.gif",
    "https://media.giphy.com/media/xT9IgNc3EuRkpLsxRS/giphy.gif",
    "https://media.giphy.com/media/8JZbyfg84WL44uurWe/giphy.gif",
    "https://media.giphy.com/media/5kFoUwkUgD1XojD5Y0/giphy.gif",
    "https://media.giphy.com/media/4Zf5n7bMtZx0VgWRhb/giphy.gif",
    "https://media.giphy.com/media/xT4ApdXQQAaq16ABwc/giphy.gif",
    "https://media.giphy.com/media/3o7aD5YXIP7l80xpIY/giphy.gif",
    "https://media.giphy.com/media/3ov9k6aOnpey71MlqM/giphy.gif",
    "https://media.giphy.com/media/69wajQvHtLQcNIlt0r/giphy.gif",
    "https://media.giphy.com/media/gZMsB7SRNrQeQ/giphy.gif",
    "https://media.giphy.com/media/eGzeoHZUin2V2/giphy.gif",
    "https://media.giphy.com/media/5xtDaru8E0COdyJFPDW/giphy.gif",
    "https://media.giphy.com/media/9xyWzB0xFpWNhcDMIa/giphy.gif",
    "https://media.giphy.com/media/3gIMlUk8HqWxpyPNNI/giphy.gif",
    "https://media.giphy.com/media/s3cBS8G3RgKhW/giphy.gif",
    "https://media.giphy.com/media/uawaocN5We6JO/giphy.gif",
    "https://media.giphy.com/media/KPKrYlBCx12Rq/giphy.gif"
  ];

  let url = `${searchEndPoint}?api_key=${apiKey}&s=${searchTerm}&limit=${limit}&rating=${rating}`;

  let response;

  if (companyId == process.env.companyId) {
    let gif;

    if (
      _.includes(
        ["hokie", "Hokie", "hokies", "Hokies", "virginia tech", "vt"],
        searchTerm.replace(/['"]+/g, "")
      )
    ) {
      gif = hokieGifs[Math.floor(Math.random() * hokieGifs.length)];
      response = {
        statusCode: 200,
        headers: {
          "x-custom-header": "my custom header value"
        },
        body: gif
      };
      console.log("sending this gif", gif);
      callback(null, response);
    } else {
      axios
        .get(url)
        .then(response => {
          gif = response.data.data.images.original.url;
          response = {
            statusCode: 200,
            headers: {
              "x-custom-header": "my custom header value"
            },
            body: gif
          };
          console.log("sending this gif", gif);
          callback(null, response);
        })
        .catch(error => {
          response = {
            statusCode: 200,
            headers: {
              "x-custom-header": "my custom header value"
            },
            body:
              "Something went wrong :( https://media.giphy.com/media/l41JNsXAvFvoHvWJW/giphy.gif"
          };
          console.log("something went wrong", error);
          callback(null, response);
        });
    }
  } else {
    response = {
      statusCode: 403,
      headers: {
        "x-custom-header": "my custom header value"
      },
      body: "Access Denied"
    };
    console.log("access denied");
    callback(null, response);
  }
};
