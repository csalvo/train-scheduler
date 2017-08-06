/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

 var config = {
    apiKey: "AIzaSyAe6e-UdD31LbgEmUHQyeE6UmGmdr7zz28",
    authDomain: "timesheet-50c97.firebaseapp.com",
    databaseURL: "https://timesheet-50c97.firebaseio.com",
    projectId: "timesheet-50c97",
    storageBucket: "timesheet-50c97.appspot.com",
    messagingSenderId: "810886393786"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



  $("#add-train-btn").on("click", function(){
	event.preventDefault();
	  var trainName = $("#train-name-input").val();
	  var trainDestination = $("#destination-input").val();
	  var firstTrainTime = $("#first-train-input").val();
	  var trainFrequency = $("#frequency-input").val(); 

	  var newTrain = {
	  	name: trainName,
	  	destination: trainDestination,
	  	firstTrain: firstTrainTime,
	  	frequency: trainFrequency
  }
	database.ref().push(newTrain);

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val(""); 

	var formattedMonth = moment(empStart).format("DD/MM/YY")
	var monthsWorked = moment().format("DD/MM/YY").diff(formattedMonths ,"months");

  	console.log(monthsWorked);
  });



  firebase.database().ref().on("child_added", function(snapshot){
    var row = '<tr><td>' + snapshot.val().name + '</td><td>' + snapshot.val().destination +
                        '</td><td>'+ snapshot.val().frequency + '</td><td></td><td></td></tr><hr>';
 $("#train-table tbody").append(row);
});