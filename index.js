'use strict';

let _ = require('lodash');
let axios = require('axios');

exports.handler = function(event, context, callback) {
    let body = JSON.parse(event.body);
    let searchTerm = JSON.stringify(body.command);

    const apiKey= `${process.env.GifbotAPIDevKey}`;
    let searchEndPoint = 'https://api.giphy.com/v1/gifs/translate';

  let url = `${searchEndPoint}?api_key=${apiKey}&q=${searchTerm}&limit=500&rating=pg-13`;
var response;
  axios.get(url)
    .then((response) => {
      let searchReturn = [];
      let i;
      for(i = 0; i < 20; i++)
      {
        let random = Math.floor((Math.random() * (response.data.data.length-0) + 0));
        searchReturn.push(response.data.data[random].images.original.url);
      }
      let randomGifUrl = searchReturn[Math.floor((Math.random() * (searchReturn.length-0) + 0))];
       response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: randomGifUrl
    };
    console.log('sending this gif',randomGifUrl);
    callback(null, response);
    })
   .catch((error) => {
      response = {
       statusCode: 200,
       headers: {
           "x-custom-header" : "my custom header value"
       },
       body: "Something went wrong :( https://media.giphy.com/media/l41JNsXAvFvoHvWJW/giphy.gif"
   };
   console.log("something went wrong", error);
   callback(null, response);
    });
};
