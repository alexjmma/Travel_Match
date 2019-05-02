const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const auth = firebase.auth();

function submit() {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    console.log(email);
    console.log(pass);
    auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(error.message);
        // ...
    });
}

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        window.alert("Account Created");
        window.location.replace("index.html");
    }
    else {
        console.log('bad test');
    }
})