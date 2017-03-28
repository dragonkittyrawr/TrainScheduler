// Initialize Firebase
var config = {
    apiKey: "AIzaSyCXHIOSXpBAo4XGw-md_dy5ibUgjztl8po",
    authDomain: "trainscheduler-ec804.firebaseapp.com",
    databaseURL: "https://trainscheduler-ec804.firebaseio.com",
    storageBucket: "trainscheduler-ec804.appspot.com",
    messagingSenderId: "673061351665"
};
firebase.initializeApp(config);

// Database variable.
var database = firebase.database();

// Initial Values

var trainName;

var destination;

var time;

var frequency;

// Capture Button Click
$("#add-train").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $("#name-input").val().trim();

    destination = $("#destination-input").val().trim();

    time = $("#time-input").val().trim();

    frequency = $("#frequency-input").val().trim();

    database.ref().set({
        name: trainName,
        dest: destination,
        time: time,
        freq: frequency
    });

});


// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freq);

    // Change the HTML to reflect
    $("#recentTrain").html(snapshot.val().name + " | " + snapshot.val().dest + " | " + snapshot.val().time + " | " + snapshot.val().freq);
   

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
