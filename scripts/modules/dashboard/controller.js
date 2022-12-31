// Check Logged In or Not
window.addEventListener('load', checkLogggedIn);
function checkLogggedIn(){
    if(sessionStorage.userName){
        document.querySelector('#user-name').innerText = sessionStorage.userName;
    }
    else{
        //alert("Do First Login...");
        location.href = 'index.html';
    }
}