
// The following code is not to be executed before the document has loaded the full html dom.
document.addEventListener("DOMContentLoaded",function(){


// Intercept form post from login-form, and instead make the post with JS fetch.
// This is because we want to handle the redirect with JS.
// To be able to make this work we must set the session cookie using JS.
  var formElement = document.getElementById("loginForm");

  if(formElement) formElement.onsubmit = submitFormLogin;

  // We have access to the formElement because of enclosure. Could use Event as parameter instead, but Event.target is finicky and not preferred.
  function submitFormLogin(){

    // FormData can work together with Fetch. It can be given as body to the post-request we will be making.
    // FormData is an Object used primarily to structure the form body from an element so that it can be used in a post-request.
      var formData = new FormData(formElement);

      var fetchOptions = {
        method: 'post',
        body: formData,
        credentials: 'include' //We shall include cookies in any requests and if there are a cookie in a responses, it should be set in the browser.
      };

      fetch(formElement.action, fetchOptions)
        .then(response => {

          var status = response.status

          if(status === 204){

            document.location.href = 'mainPage.html';

          }

          else if(status == 401){
            document.getElementById('noAccessAlert').classList.add('hidden');
            document.getElementById('logInFailedAlert').classList.remove('hidden');

          }

          else{
            document.getElementById('logInFailedAlert').classList.add('hidden');
            document.getElementById('noAccessAlert').classList.remove('hidden');
          }

        });

      // Dette returneres til metoden browseren kører når bugeren klikker. False signalerer at der ikke skal ske noget.
      // Vi har valgt at returne false fordi vi har valgt ikke at tage et Event som parameter til metoden. Havde vi taget Event, så kunne vi have kørt preventDefault() på evenyentet i stedet.
      return false;

  }


// Intercept form post from createAccount-form, and instead make the post with JS fetch.
  var formElementCreateAccount = document.getElementById("CreateAccountForm");
  if(formElementCreateAccount) formElementCreateAccount.onsubmit = submitFormCreateAccount;

  function submitFormCreateAccount(){

    var formData = new FormData(formElementCreateAccount);

    var postOptions = {
      method: 'post',
      body: formData,
      credentials: 'include'
    };

    fetch(formElementCreateAccount.action, postOptions)
      .then(response => {

        var status = response.status;

        if(status === 400){
          document.getElementById('EmailAvailabilityError').classList.add('hidden');
          document.getElementById('passwordConformationError').classList.remove('hidden');

        }

        else if(status === 201){

          document.location.href = 'login.html';

        }

        else if (status === 403){
          document.getElementById('passwordConformationError').classList.add('hidden');
          document.getElementById('EmailAvailabilityError').classList.remove('hidden');
        }

        else{

        }

      });

    return false;
  }


});









