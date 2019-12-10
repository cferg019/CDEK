// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCQ70Sp4YCE4VNGzu7sgpvhTP2-jc09810",
  authDomain: "cdek-e5b2e.firebaseapp.com",
  databaseURL: "https://cdek-e5b2e.firebaseio.com",
  projectId: "cdek-e5b2e",
  storageBucket: "cdek-e5b2e.appspot.com",
  messagingSenderId: "537136191482",
  appId: "1:537136191482:web:4de06e5866b16000cb3643"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function () {

  // Declaring variables to be used in API search
  var activityChoice;
  var placeChoice;
  var artistChoice;
  var teamChoice;
  var diningChoice;

  //Initializing drop down menu
  $('select').formSelect();

  // hiding question divs other than "what are you in the mood for"
  $("#when").hide();
  $("#where").hide();
  $("#submit-button").hide();
  $("#next-button").hide();
  $("#artist").hide();
  $("#team").hide();
  $("#dining").hide();
  $("#results-button").hide();

  // when choice selected from drop down, the activity chosen in stored, this div is hidden, and the div with the next question is shown.
  $('select[name="dropdown"]').change(function () {
    activityChoice = $(this).val().trim();
    console.log(activityChoice);
    $("#what").hide();
    $("#where").show();

    if (activityChoice === "Have a Drink")
      $("#results-button").show();
    else {
      $("#submit-button").show();
    }
  });

  // When next button is selected, the place chosen is stored, this div is hidden, and the div with the next question is shown.
  $("#submit-button").on("click", function () {
    placeChoice = $("#email").val().trim();
    console.log(placeChoice);
    $("#where").hide();
    $("#next-button").hide();
    $("#results-button").show();
    $("#submit-button").hide();

    if (activityChoice === "See a Concert") {
      $("#artist").show();
    } else if (activityChoice === "Go to a Game") {
      $("#team").show();
    } else if (activityChoice === "Eat Out") {
      $("#dining").show();
    }
  });

  // Final information is stored.  Begin API query.
  $("#results-button").on("click", function () {
    if (activityChoice === "See a Concert") {
      artistChoice = $("#concertArtist").val().trim();
      $("#concertArtist").val("");
      console.log(artistChoice);
    } else if (activityChoice === "Go to a Game") {
      teamChoice = $("#sportsTeam").val().trim();
      $("#sportsTeam").val("");
      console.log(teamChoice);
    } else if (activityChoice === "Eat Out") {
      diningChoice = $("#foodType").val().trim();
      $("#foodType").val("");
      console.log(diningChoice);
    } else if (activityChoice === "Have a Drink") {
      placeChoice = $("#email").val().trim();
      $("#email").val("");
      console.log(placeChoice);
    }

    // API Code Here
    function openBrewery(placeChoice) {
      var brewryURL = "https://api.openbrewerydb.org/breweries?&by_state=" + placeChoice;
      $.ajax({
        url: brewryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var results = response;

        for (var i = 0; i < results.length; i++) {
          $('#result').append("<tr><td>" + results[i].name + "</td></tr>");
          $('#result').append("<tr><td>" + results[i].street + ", " + results[i].city + "</td></tr>");
          $('#result').append("<tr><td>" + results[i].website_url + "</td></tr>");
        }

      });
    }

    function ticketMaster(placeChoice) {
      var eventURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=concert&locale=en-us&city=" + placeChoice + "&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r";
      $.ajax({
        url: eventURL,
        method: "GET"
      }).then(function (response) {

        var placeChoiceName = $("<p>").append(response.embedded.events.name);
        var placeChoiceVenues = $("<p>").append(response.embedded.events.venues.name)
        var placeChoiceUrl = $("<p>").attr("src", response.embedded.events.url);
        var placeChoiceDate = $("<p>").append(response.embedded.events.date);
        var placeChoicePrice = $("<p>").append(response.embedded.events.priceRanges.min + response.embedded.events.priceRanges.max)

        $("#result").append(placeChoiceName, placeChoiceVenues, placeChoiceUrl, placeChoiceDate, placeChoicePrice);
        console.log(placeChoiceName, placeChoiceVenues, placeChoiceUrl, placeChoiceDate, placeChoicePrice);
        console.log(response);
      });
    } 
    // search function:

    openBrewery(placeChoice);
    

    //Firebase code 
      event.preventDefault();
  
      var databaseActivity = activityChoice;
      var databasePlace = placeChoice;
      var databaseArtist = artistChoice;
      var databaseTeam = teamChoice;
      var databaseDining = diningChoice;
      var inputs;
      var referencePath;

      if (activityChoice === "See a Concert") {
        referencePath = "concerts";
        inputs = {
          activity: databaseActivity,
          place: databasePlace,
          artist: databaseArtist,
        };
      } else if (activityChoice === "Go to a Game") {
        referencePath = "game";
        inputs = {
          activity: databaseActivity,
          place: databasePlace,
          team: databaseTeam,
        };
      } else if (activityChoice === "Eat Out") {
        referencePath = "food";
        inputs = {
          activity: databaseActivity,
          place: databasePlace,
          dining: databaseDining,
        };
      } else if (activityChoice === "Have a Drink") {
        referencePath = "drink";
        inputs = {
          activity: databaseActivity,
          place: databasePlace,
        };
      }
  
      database.ref(referencePath).push(inputs);
  });
  
  database.ref("concerts").on("child_added", function(childSnapshot) {
  
    var databaseActivity = childSnapshot.val().activity;
    var databasePlace = childSnapshot.val().place;
    var databaseArtist = childSnapshot.val().artist;

    console.log(databaseActivity);
    console.log(databasePlace);
    console.log(databaseArtist);

    var addRow = $("<tr>").append(
          $("<td>").text(databaseActivity),
          $("<td>").text(databasePlace),
          $("<td>").text(databaseArtist),
      );

      $("#searches > table > tbody").append(addRow);
  });

  database.ref("game").on("child_added", function(childSnapshot) {
  
    var databaseActivity = childSnapshot.val().activity;
    var databasePlace = childSnapshot.val().place;
    var databaseTeam = childSnapshot.val().team;
    
    console.log(databaseActivity);
    console.log(databasePlace);
    console.log(databaseTeam);

    var addRow = $("<tr>").append(
      $("<td>").text(databaseActivity),
      $("<td>").text(databasePlace),
      $("<td>").text(databaseTeam),
    );

    $("#searches > table > tbody").append(addRow);
  });


  database.ref("food").on("child_added", function(childSnapshot) {
  
    var databaseActivity = childSnapshot.val().activity;
    var databasePlace = childSnapshot.val().place;
    var databaseDining = childSnapshot.val().dining;
    
    console.log(databaseActivity);
    console.log(databasePlace);
    console.log(databaseDining);

    
    var addRow = $("<tr>").append(
      $("<td>").text(databaseActivity),
      $("<td>").text(databasePlace),
      $("<td>").text(databaseDining),
    );
        
    $("#searches > table > tbody").append(addRow);
  });


  database.ref("drink").on("child_added", function(childSnapshot) {
  
    var databaseActivity = childSnapshot.val().activity;
    var databasePlace = childSnapshot.val().place;

    console.log(databaseActivity);
    console.log(databasePlace);

    var addRow = $("<tr>").append(
      $("<td>").text(databaseActivity),
      $("<td>").text(databasePlace),
      $("<td>").text(""),
      );

    $("#searches > table > tbody").append(addRow);
    
  });



});