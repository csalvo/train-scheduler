
 //Firebase config 
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


//on button click
  $("#add-train-btn").on("click", function(){
	event.preventDefault();
	//grab values from text fields
	  var trainName = $("#train-name-input").val();
	  var trainDestination = $("#destination-input").val();
	  var firstTrainTime = $("#first-train-input").val();
	  var trainFrequency = $("#frequency-input").val(); 
	  //set up object to be pushed to the DB
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDestination,
	  	firstTrain: firstTrainTime,
	  	frequency: trainFrequency
  }
 // push object to DB
	database.ref().push(newTrain);


//clear text fields for next input 
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val(""); 


 	
  });


  firebase.database().ref().on("child_added", function(snapshot){

  	var trainStart = snapshot.val().firstTrain;
  	var interval = snapshot.val().frequency;

	var timeToStart = moment().diff(moment(trainStart,"hh:mm A"),'m');
    var timeToNext = timeToStart % interval;
    var timeMinsAway = interval - timeToNext;
    var timeNext = moment().add(timeMinsAway,'m').toDate();

    console.log(timeToNext, timeToStart, timeMinsAway, moment(timeNext).format("hh:mm A"));



    var row = '<tr><td>' + snapshot.val().name + '</td><td>' + snapshot.val().destination +
              '</td><td>'+ snapshot.val().frequency + '</td><td>' + moment(timeNext).format("hh:mm A") + '</td><td>' + timeMinsAway + '</td></tr><hr>';

 $("#train-table tbody").append(row);
});