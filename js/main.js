
let moment = require('moment');

// Global variables are by default declared to be attributes on JS class window
let symptomList;
let date;

// The following code is not to be executed before the document has loaded the full html dom.
document.addEventListener("DOMContentLoaded",function(){

  window.date = moment();
  getSymptomList();

});



function getSymptomList(){

  let url = new URL('http://localhost:8080/symptomRegistration'); // Make URL obj. Give url String as parameter to constructor

  let params = { requestDate: window.date.format('YYYY-MM-DD') } // Make an object with attribute called requestDate set to var date (global) converted to string.

  url.search = new URLSearchParams(params).toString(); // This makes sure that the url is url-safe, by url-encoding (making sure that the url does not contain chars that are illegal in browser-url's


  // const paramUrl = 'http://localhost:8080/symptomRegistration?requestDate=' + date.toISOString();

  const fetchOptions = {
    method: 'get', // This one is not strictly necessary because get is default. But for learning purposes it is included af an example for now.
    credentials: 'include', //We shall include cookies in any requests and if there are a cookie in a responses, it should be set in the browser.
  };

  fetch(url, fetchOptions)
    .then(response => { return response.json() }) // get response body aka Json.
    .then(responseBody => {
      window.symptomList = responseBody;
      insertRegistrations();
    })

}


function insertRegistrations(){

  for(symptomVTO of window.symptomList){

    let container = document.getElementById('symptomRegistrationContainer');

    let divRow = document.createElement("div");
    divRow.className = 'row tempBorderBlue';
    container.appendChild(divRow);

    let divCol1 = document.createElement("div");
    divCol1.className = 'col-3 tempBorderOrange';
    divRow.appendChild(divCol1);

    let divSymptomName = document.createElement('div');
    divSymptomName.className = 'tempBorderPink';

    let symptomName = document.createTextNode(symptomVTO.symptom.name);
    divSymptomName.appendChild(symptomName);
    divCol1.appendChild(divSymptomName);

    for(let j = 0; j < symptomVTO.intensityArray.length; j++) {

      let divCol = document.createElement("div");
      divCol.className = 'col-3 tempBorderOrange';
      divRow.appendChild(divCol);

      let divIntensitySquareRow = document.createElement('div');
      divIntensitySquareRow.className = 'row intensitySquareRow tempBorderLBlue';
      divCol.appendChild(divIntensitySquareRow);

      for (let k = 1; k <= 7; k++) {

        let divIntensitySquare = document.createElement('div');
        divIntensitySquare.className = 'intensitySquare';

        if (k > symptomVTO.intensityArray[j]) {
          divIntensitySquare.classList.add('hidden');
        }

        // Add eventListener to every divIntensitySquare element.
        // Method for click calls function sendRegistrationPostRequest which takes symptomId, regNum, intensity as parameters.
        // NB closure is used to make sure the parameter values for sendRegistrationPostRequest does not change while waiting for event.
        let symptomId = symptomVTO.symptom.id;

        divIntensitySquare.addEventListener("click",() => {
          sendRegistrationPostRequest(symptomId, j+1, k)
        });


        divIntensitySquareRow.appendChild(divIntensitySquare);

      }
    }
  }
}


function sendRegistrationPostRequest(symptomId, regNum, intensity){

  let symptomComponentRegistration = {'symptomId': symptomId, 'regNum': regNum, 'intensity': intensity, 'date': window.date.format('YYYY-MM-DD')};

  let fetchOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(symptomComponentRegistration),
    credentials: 'include'
  };

  fetch('http://localhost:8080/symptomRegistration', fetchOptions)
    .then(response => {
      console.log('responseRecieved');
    })


}

