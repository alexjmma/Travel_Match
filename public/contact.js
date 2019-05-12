const db = firebase.firestore();

function submit() {
    db.collection("Feedback").add({
        Name: document.getElementById("name").value,
        Email: document.getElementById("email").value,
        Subject: document.getElementById("subject").value,
        Issue: document.getElementById("issue").value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    window.location.replace("MainPage.html");
}
