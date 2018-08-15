'use strict';

let _ = require('lodash');
let axios = require('axios');

exports.handler = function(event, context, callback) {
    let body = JSON.parse(event.body);
    let searchTerm = JSON.stringify(body.command);
    let companyId = body.creator.company.id;
    const apiKey= `${process.env.GifbotAPIDevKey}`;
    const limit = '50';
    let searchEndPoint = 'https://api.giphy.com/v1/gifs/translate';

  let url = `${searchEndPoint}?api_key=${apiKey}&s=${searchTerm}&limit=${limit}&rating=pg-13`;
  if(companyId == process.env.companyId){
var response;
  axios.get(url)
    .then((response) => {
      let gif = response.data.data.images.original.url;
       response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: gif
    };
    console.log('sending this gif',gif);
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
  }else{
      response = {
       statusCode: 403,
       headers: {
           "x-custom-header" : "my custom header value"
       },
       body: "Access Denied"
   };
   console.log("access denied");
   callback(null, response);
  }
};
