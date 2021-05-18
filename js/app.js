
// The following code is not to be executed before the document has loaded the full html dom.
document.addEventListener("DOMContentLoaded",function(){

// Intercept form post and instead make the post with JS fetch.
// This is because we want to handle the redirect with JS.
// To be able to make this work we must set the session cookie using JS.
  var formElement = document.getElementById("loginForm");

  formElement.onsubmit = submitForm;

  // We have access to the formElement because of enclosure. Could use Event as parameter instead, but Event.target is finicky and not preferred.
  function submitForm(){

    // FormData can work together with Fetch. It can be given as body to the post-request we will be making.
    // FormData is an Object used primarily to structure the form body from an element so that it can be used in a post-request.
      var formData = new FormData(formElement);

      var postOptions = {
        method: 'post',
        body: formData
      };

      fetch(formElement.action, postOptions)
        .then(response =>{console.log(response)});

      // Dette returneres til metoden browseren kører når bugeren klikker. False signalerer at der ikke skal ske noget.
      // Vi har valgt at returne false fordi vi har valgt ikke at tage et Event som parameter til metoden. Havde vi taget Event, så kunne vi have kørt preventDefault() på evenyentet i stedet.
      return false;

  }


});









