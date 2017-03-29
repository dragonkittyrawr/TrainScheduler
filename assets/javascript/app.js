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

var trainTotal;

var d;

var hour;

var minutes;

var currentTime;

var intervalId;

function changeTime() {
    // Establish one second interval for timer.

    intervalId = setInterval(clock, 1000);
}

function clock() {
    d = new Date();

    hour = d.getHours();

    minutes = d.getMinutes();

    currentTime = hour + ":" + minutes;
    $("#clockFace").html(currentTime);
}


// Capture Button Click
$("#add-train").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    // trainTotal = 0;

    train = $("#name-input").val().trim();

    destination = $("#destination-input").val().trim();

    time = $("#time-input").val().trim();

    frequency = $("#frequency-input").val().trim();

    trainTotal++;

    // var name = "name" + trainTotal;
    // var dest = "dest" + trainTotal;
    // var time = "time" + trainTotal;
    // var freq = "freq" + trainTotal;

    database.ref().set({
        count: trainTotal,
        ["name" + trainTotal]: train,
        ["dest" + trainTotal]: destination,
        ["time" + trainTotal]: time,
        ["freq" + trainTotal]: frequency
    });

    $("#recentTrain").html("<h2>Most Recently Added Train: " + snapshot.val()["name" + trainTotal] + " | " + snapshot.val()["dest" + trainTotal] + " | " + snapshot.val()["time" + trainTotal] + " | " + snapshot.val()["freq" + trainTotal] + "</h2>");

});




// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

        startingTotal = (snapshot.val().count);

        console.log(startingTotal);

        if (startingTotal !== 0) {

            trainTotal = 1;

            // Log everything that's coming out of snapshot
            // console.log(snapshot.val());
            // console.log(snapshot.val()["name" + trainTotal]);
            // console.log(snapshot.val()["dest" + trainTotal]);
            // console.log(snapshot.val()["time" + trainTotal]);
            // console.log(snapshot.val()["freq" + trainTotal]);


            // return (trainTotal);

            // function putOnPage() {
            // Change the HTML to reflect

            for (var i = 0; i < startingTotal; i++) {

                var trainLine = $("<tr id=\"train" + trainTotal + "\">");

                var trainName = $("<td id=\"tName" + trainTotal + "\">");

                var trainDest = $("<td id=\"tDest" + trainTotal + "\">");

                var trainFreq = $("<td id=\"tFreq" + trainTotal + "\">");

                var trainNxtArrival = $("<td id=\"tNxtArr" + trainTotal + "\">");

                var trainMinutes = $("<td id=\"tMins" + trainTotal + "\">");

                trainLine.append(trainName);

                trainLine.append(trainDest);

                trainLine.append(trainFreq);

                trainLine.append(trainNxtArrival);

                trainLine.append(trainMinutes);



                $("#deezTrains").append(trainLine);

                $("#tName" + trainTotal).html(snapshot.val()["name" + trainTotal]);

                $("#tDest" + trainTotal).html(snapshot.val()["dest" + trainTotal]);

                $("#tFreq" + trainTotal).html(snapshot.val()["freq" + trainTotal]);

                $("#tNxtArr" + trainTotal).html(snapshot.val()["time" + trainTotal]);

                $("#tMins" + trainTotal).html(snapshot.val()["time" + trainTotal]);

                trainTotal++;

            };

        }
        // Handle the errors
    },
    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



// if (trainTotal !== 0) {

clock();
changeTime();

// }
