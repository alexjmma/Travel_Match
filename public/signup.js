const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const auth = firebase.auth();
const db = firebase.firestore();

function submit() {
    const email = txtEmail.value;
    const pass = txtPassword.value;
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
        console.log(firebaseUser.uid);
        db.collection("Users").doc(firebaseUser.uid).set({
            FName: document.getElementById("FName").value,
            LName: document.getElementById("LName").value,
            Gender: document.querySelector('input[name="gender"]:checked').value,
            Email: document.getElementById("email").value,
            Address: document.getElementById("address").value,
            City: document.getElementById("city").value,
            State: document.getElementById("state").value,
            ZipCode: document.getElementById("zip").value
        })
        .then(function(docRef) {
            window.alert("Account Created");
            window.location.replace("MainPage.html");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
})
