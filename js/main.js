
let moment = require('moment');

let symptomList;
let date;

// The following code is not to be executed before the document has loaded the full html dom.
document.addEventListener("DOMContentLoaded",function(){

  date = moment();
  getSymptomList(date);

});


function getSymptomList(date){

  let url = new URL('http://localhost:8080/symptomRegistration'); // Make URL obj. Give url String as parameter to constructor

  let params = { requestDate: date.format('YYYY-MM-DD') } // Make an object with attribute called requestDate set to var date (global) converted to string.

  url.search = new URLSearchParams(params).toString(); // This makes sure that the url is url-safe, by url-encoding (making sure that the url does not contain chars that are illegal in browser-url's


  // const paramUrl = 'http://localhost:8080/symptomRegistration?requestDate=' + date.toISOString();

  const fetchOptions = {
    method: 'get', // This one is not strictly necessary because get is default. But for learning purposes it is included af an example for now.
    credentials: 'include', //We shall include cookies in any requests and if there are a cookie in a responses, it should be set in the browser.
  };

  fetch(url, fetchOptions)
    .then(response => { response.json() }) // get response body aka Json.
    .then(responseBody => { symptomList = responseBody })
}




