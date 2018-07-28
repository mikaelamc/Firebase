
var config = {
    apiKey: "AIzaSyD7WIhr2DZFtGyaGpGYcVSwKDume757QQs",
    authDomain: "smu-firebase-assignment.firebaseapp.com",
    databaseURL: "https://smu-firebase-assignment.firebaseio.com",
    projectId: "smu-firebase-assignment",
    storageBucket: "smu-firebase-assignment.appspot.com",
    messagingSenderId: "185147362801"
  };
  firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();     


  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(name);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);


 
  // Append the new row to the table
 



    // Assumptions
   var tFrequency = 3;

   // Time is 3:30 AM
   var firstTime = "03:30";

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % tFrequency;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = tFrequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
   

   // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainTime),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain)
  
  );

  $("#table tbody").append(newRow);

 });