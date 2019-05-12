var database = firebase.database();

var curr = 1
var destinations = [];
var activeButtons = 0;
var option_index = 0;
var orig = []


/*		Error Function for database references			*/
function err(err){
	console.log("ERROR")
	console.log(err)
}

/*		Initial reference to set first question			*/
var ref = database.ref('questions');
ref.on('value', getData, err);

/*		Stores all destinations in array destinations	*/
var dest_ref = database.ref('destinations');
dest_ref.on('value', function retrieve_keys(data){ 
		var d = data.val();
		var keys = Object.keys(d);
		destinations = keys
	}, err);
	
/*		Creates int array to store current scores		*/
var destination_values = new Array(49);
for(i = 0; i < destination_values.length; i++){
	destination_values[i] = 0;
}

/*		Creates matrix to store values for every		*
 * 		question for every destination					*/
var question_values = new Array(49);
var dest_ref = database.ref('destinations');
dest_ref.on('value', function retrieve_values(data){ 
		var d = data.val();
		var keys = Object.values(d);
		for(i = 0; i < keys.length; i++){
			var list = keys[i].split(" ");
			question_values[i] = list;
		}
	}, err);

/*		Authorization listener. Checks if user			*
 * 		randomly logs out while on page.				*/
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var uid = user.uid;
    var providerData = user.providerData;
  } else {
	  console.log("User not logged in.")
  }
});

/*		Comparison function for array of ints.			*/
function numComp(a, b){
	return b - a;
}

/*		Finds the top 3 destinations based on values	*
 * 		inside the primary array. If user is logged		*
 * 		in, it stores top 3 destinations in the			*
 * 		database for future use.						*/
function finalize(){
	orig = destination_values.slice();
	destination_values.sort(numComp);
	var i = 0
	var j = 0
	var k = 0
	var first = 0
	var second = 0
	var third = 0
	for(i; i < destination_values.length; i++){
		if (destination_values[0] == orig[i]){
			first = destinations[i]
			break
		}
	}
	for(j; j < destination_values.length; j++){
		if (j == i){
			continue
		}
		if (destination_values[1] == orig[j]){
			second = destinations[j]
			break
		}
	}
	for(k; k < destination_values.length; k++){
		if (j == k || k == i){
			continue
		}
		if (destination_values[2] == orig[k]){
			third = destinations[k]
			break
		}
	}
	var user = firebase.auth().currentUser;
	if (user){
		var hash = {};
		hash["first"] = first;
		hash["second"] = second;
		hash["third"] = third;
		var e_ref = database.ref('users/' + user.uid);
		e_ref.set(hash)
		
	}
	// console.log(first + " " + second + " " + third)
	// console.log(orig[i] + " " + orig[j] + " " + orig[k])
    window.location.replace("MainPage.html");
}

/*		Based on selection, calculates the increase for     *
 * 		every destination in their value arrays.			*/
function submit(id){
	var option = parseInt(id.substr(6), 10) - 1;
	for(i=0; i < destinations.length; i++){
		destination_values[i] = destination_values[i] + parseInt(question_values[i][option_index + option], 10);
		// console.log(destinations[i] + " " + question_values[i][option_index + option] + " " + destination_values[i]);
	}
	option_index = option_index + activeButtons;
	if(curr < 11){
		ref.on('value', getData, err);
	}
	else{
		for(i = 1; i < 6; i++){
			document.getElementById("Option" + i).disabled = false;
			document.getElementById("Option" + i).style.display = "none";
		}
		document.getElementById("Question").innerHTML = "Click submit to learn your top destinations!"
		document.getElementById("Submit").disabled = false;
		document.getElementById("Submit").style.display = "block";	
	}
}

/*		Grabs the next question and selections sequence		*/
function getData(data){
	var d = data.val();
	var values = Object.values(d[curr])
	var length = values.length
	document.getElementById("Question").innerHTML = values[length - 1];
	var index = 0;
	for(index; index < length - 1; index++){
		var option = index + 1
		document.getElementById("Option" + option).innerHTML = values[index];
	}
	activeButtons = index;
	//console.log(activeButtons);
	index = index + 1;
	for(i = 1; i < index; i++){
		document.getElementById("Option" + i).disabled = false;
		document.getElementById("Option" + i).style.display = "block";
	}
	for(index; index < 6; index++){
		document.getElementById("Option" + index).disabled = true;
		document.getElementById("Option" + index).style.display = "none";
	}
	curr += 1
}

function logOut() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
		window.alert(error.message);
	});
}
