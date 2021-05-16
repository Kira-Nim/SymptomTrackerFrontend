
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

      fetch(){

    }



  }





});
