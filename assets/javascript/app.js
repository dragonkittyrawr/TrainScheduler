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

var counts = database.ref("/counts");

var trains = database.ref("/trains");

var startingTotal;

var trainTotal;

var train;

var destination;

var time;

var frequency;

var mintutesTil;



var hour;

var minutes;

var currentTime;

var intervalId;

var newTrain;

var schedule = {};

var end;

var start;

var freq;


function changeTime() {

    // Establish one second interval for timer.
    intervalId = setInterval(clock, 1000);
}

function clock() {

    // Obtenez l'heure.
    hour = moment().hours();

    // Obtenir les minutes.
    minutes = moment().minutes();

    // Si les minutes sont moins de dix, ils n'ont pas leur zéro.
    if (minutes < 10) {

        // Voila!  Un zero!
        minutes = "0" + moment().minutes();
    } else {
        minutes = moment().minutes();
    }
    // L'heure actuelle est l'heure plus les minutes.
    currentTime = hour + ":" + minutes;

    // Ecrivez à la fenêtre.
    $("#clockFace").html(currentTime);
}

function schedBuild(start, end, freq) {

    end = parseInt(newTrain.end);

    start = parseInt(newTrain.start);

    freq = parseInt(newTrain.freq);


    trainGo = Math.floor((end - start) / freq);

    schedule["run" + 0] = start;

    for (var r = 1; r < trainGo; r++) {

        schedule["run" + r] = start + freq * r;

    }

    goTrain = trainGo - 1;

    console.log(schedule);

    console.log(trainGo);

    console.log(goTrain);

    return schedule;
}


// Capture Button Click
$("#add-train").on("click", function(event) {
    // Prevent page refresh.
    event.preventDefault();

    trainTotal = startingTotal;

    // Un nouveau train a été ajouté!
    trainTotal++;

    // Le nouveu train s'appelle name-input.
    train = $("#name-input").val().trim();

    // Où va le nouveau train?
    destination = $("#destination-input").val().trim();

    // Quand?
    startTime = $("#start-time-input").val().trim();

    // Jusqu'à quelle heur?
    endTime = $("#end-time-input").val().trim();

    // How often?
    frequency = $("#frequency-input").val().trim();

    // Push new train data to database.

    database.ref("/trains").push({
        count: trainTotal,
        name: train,
        dest: destination,
        start: startTime,
        end: endTime,
        freq: frequency
    });
    // Keeping separate total count record.
    database.ref("/counts").set({
        total: trainTotal
    })

});

// Displaying seperate total count to console.
counts.on("value", function(snap) {
    startingTotal = (snap.val().total);
    console.log(startingTotal);
})

// Pull train data.
database.ref("/trains").on("child_added", function(snapshot) {

        newTrain = snapshot.val();

        // FOR TESTING ONLY
        console.log(newTrain);


        // Display most recently added train to "Add a Train" page.
        $("#recentTrain").html("<h2>Most Recently Added Train: " + newTrain.name + " | " + newTrain.dest + " | " + newTrain.start + " | " + newTrain.end + " | " + newTrain.freq + "</h2>");


        // Create table to display train schedule.
        // ROW
        var trainLine = $("<tr id=\"train" + newTrain.count + "\">");

        // CELL - TRAIN NAME
        var trainName = $("<td id=\"tName" + newTrain.count + "\" class=\"clickName\">");

        // CELL - DESTINATION
        var trainDest = $("<td id=\"tDest" + newTrain.count + "\">");

        // CELL - FREQUENCY
        var trainFreq = $("<td id=\"tFreq" + newTrain.count + "\">");

        // CELL - TIME OF TRAIN'S NEXT ARRIVAL
        var trainNxtArrival = $("<td id=\"tNxtArr" + newTrain.count + "\">");

        // CELL - MINUTES UNTIL TRAIN'S NEXT ARRIVAL
        var trainMinutes = $("<td id=\"tMins" + newTrain.count + "\">");

        // Append cells to row.
        trainLine.append(trainName);

        trainLine.append(trainDest);

        trainLine.append(trainFreq);

        trainLine.append(trainNxtArrival);

        trainLine.append(trainMinutes);

        schedBuild();

        var wait = moment(newTrain.end, "HHmm").endOf().fromNow();

        console.log(wait);

        var dispMins = parseInt(wait) * 60;

        console.log(dispMins);

        console.log(schedule.run0);

        var now = moment().format("HHmm");

        nowNow = parseInt(now);

        console.log(nowNow);

        if (nowNow <= schedule.run0 || nowNow >= schedule["run" + goTrain]) {
            console.log("No trains now.");
        } else if (nowNow >= schedule.run0 && nowNow <= schedule["run" + goTrain]) {
            console.log("Next train " + wait);
        }

        // Append row to deezTrains div.
        $("#deezTrains").append(trainLine);

        // Write database content to cells.
        $("#tName" + newTrain.count).html(newTrain.name);

        $("#tDest" + newTrain.count).html(newTrain.dest);

        $("#tFreq" + newTrain.count).html(newTrain.freq);

        $("#tNxtArr" + newTrain.count).html("tbd");

        $("#tMins" + newTrain.count).html(dispMins);




    },
    // There may be errors, handle them.

    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

$(document).on("click", ".clickName", function() {
    var opened = window.open("");
    opened.document.write("<html><head><title>" + $(this).text() + "</title><meta charset=\"utf-8\"><link rel=\"stylesheet\" type=\"text/css\" href=\"assets/css/reset.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"assets/css/style.css\"><link href=\"https://fonts.googleapis.com/css?family=Raleway\" rel=\"stylesheet\">" + "</head><body><h1>Full Schedule for " + $(this).text() + "</h1><p>" + JSON.stringify(schedule, null, 4) + "</p></body></html>");
    console.log($(this));
})


// var iframe = document.createElement('iframe');
// var html = '<body>Foo</body>';
// document.body.appendChild(iframe);
// iframe.contentWindow.document.open();
// iframe.contentWindow.document.write(html);
// iframe.contentWindow.document.close();


// Clock function go!
clock();
changeTime();
