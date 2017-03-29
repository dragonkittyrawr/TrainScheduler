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

var trainTotal;

var train;

var destination;

var time;

var frequency;

var trainTotal = 0;

var d;

var hour;

var minutes;

var currentTime;

var intervalId;

// var startingTotal = 1;

function changeTime() {
    // Establish one second interval for timer.

    intervalId = setInterval(clock, 1000);
}

function clock() {

    hour = moment().hours();

    minutes = moment().minutes();

    if (minutes < 10) {
        minutes = "0" + moment().minutes();
    } else {
        minutes = moment().minutes();
    }

    currentTime = hour + ":" + minutes;
    $("#clockFace").html(currentTime);
    
}


// Capture Button Click
$("#add-train").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    trainTotal++;

    train = $("#name-input").val().trim();

    destination = $("#destination-input").val().trim();

    startTime = $("#start-time-input").val().trim();

    endTime = $("#end-time-input").val().trim();

    frequency = $("#frequency-input").val().trim();

    // trainTotal++;

    // var name = "name" + trainTotal;
    // var dest = "dest" + trainTotal;
    // var time = "time" + trainTotal;
    // var freq = "freq" + trainTotal;

    database.ref().push({
        count: trainTotal,
        name: train,
        dest: destination,
        start: startTime,
        end: endTime,
        freq: frequency
    });



});




// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(snapshot) {

        var newTrain = snapshot.val();

        console.log(newTrain);

        $("#recentTrain").html("<h2>Most Recently Added Train: " + newTrain.name + " | " + newTrain.dest + " | " + newTrain.time + " | " + newTrain.freq + "</h2>");

        // startingTotal = (snapshot.val().count);

        // console.log(startingTotal);

        // if (startingTotal !== 0) {

        // trainTotal = 1;

        // Log everything that's coming out of snapshot
        // console.log(snapshot.val());
        // console.log(snapshot.val()["name" + trainTotal]);
        // console.log(snapshot.val()["dest" + trainTotal]);
        // console.log(snapshot.val()["time" + trainTotal]);
        // console.log(snapshot.val()["freq" + trainTotal]);


        // return (trainTotal);

        // function putOnPage() {
        // Change the HTML to reflect

        // for (var i = 0; i < startingTotal; i++) {

        var trainLine = $("<tr id=\"train" + newTrain.count + "\">");

        var trainName = $("<td id=\"tName" + newTrain.count + "\">");

        var trainDest = $("<td id=\"tDest" + newTrain.count + "\">");

        var trainFreq = $("<td id=\"tFreq" + newTrain.count + "\">");

        var trainNxtArrival = $("<td id=\"tNxtArr" + newTrain.count + "\">");

        var trainMinutes = $("<td id=\"tMins" + newTrain.count + "\">");

        trainLine.append(trainName);

        trainLine.append(trainDest);

        trainLine.append(trainFreq);

        trainLine.append(trainNxtArrival);

        trainLine.append(trainMinutes);



        $("#deezTrains").append(trainLine);

        $("#tName" + newTrain.count).html(newTrain.name);

        $("#tDest" + newTrain.count).html(newTrain.dest);

        $("#tFreq" + newTrain.count).html(newTrain.freq);

        $("#tNxtArr" + newTrain.count).html(newTrain.time);

        $("#tMins" + newTrain.count).html(newTrain.time);

        // trainTotal++;

        // };


    },
    // Handle the errors

    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



// if (trainTotal !== 0) {

clock();
changeTime();

// }
