var database = firebase.database();


/*		Error Function for database references			*/
function err(err){
	console.log("ERROR")
	console.log(err)
}

function outsource(id) {
	var str2="https://www.google.com/flights?channel=fs&lite=0#flt=LAX.";
	var destID2 ="";
	var startID2 =document.getElementById("takeOff2").value;
	var endD2   =document.getElementById("beBack2").value;
	var user = firebase.auth().currentUser;
	if (user){
		var dest = document.getElementById(id).innerHTML.split(" ")
		var destination = dest[2]
		for(i = 3; i < dest.length; i++){
			destination = destination + " " + dest[i]
		}
		// console.log(destination)

		var ref = database.ref('codes');	
		ref.on('value', function retrieve_values(data){ 
			var d = data.val();
			var keys = Object.keys(d)
			for(i = 0; i < keys.length; i++){
				if(keys[i] == destination){
					destID2 = Object.values(d)[i]
					var result2=str2.concat(destID2,".",startID2,"*",destID2,".LAX.",endD2,";c:USD;e:1;sd:1;t:f");
					location=result2;
					// console.log(destID2)
				}
			}
		}, err);
	}
}

/*		Authorization listener. Checks if user			*
 * 		randomly logs out while on page.				*/
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var uid = user.uid;
    var providerData = user.providerData;
	
	var ref = database.ref('users/' + uid);
	ref.on('value', function retrieve_values(data){ 
		var d = data.val();
		var keys = Object.values(d);
		console.log(keys)
		document.getElementById("first_image").src = "dest_images/" + keys[0] + ".jpg"
		document.getElementById("second_image").src = "dest_images/" + keys[1] + ".jpg"
		document.getElementById("third_image").src = "dest_images/" + keys[2] + ".jpg"
		document.getElementById("first_match").innerHTML = "First Match: " + keys[0]
		document.getElementById("second_match").innerHTML = "First Match: " + keys[1]
		document.getElementById("third_match").innerHTML = "First Match: " + keys[2]
	}, err);
  } else {
	  console.log("User not logged in.")
	  window.location.replace("index.html")
  }
});

function logOut() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
		window.alert(error.message);
	});
}
