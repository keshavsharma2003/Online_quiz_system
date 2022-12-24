//Oauth contains the logic to connect firebase oauth
//Destructure
//Async call
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
//{loginwithgmail}
//expots wrap the things in objact
export function loginwithGmail(){
      //step-1 specify the google provider
const provider = new GoogleAuthProvider();
const auth = getAuth();
return signInWithPopup(auth, provider);
}