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

    function openBrewery(state) {

      var brewryURL = "https://api.openbrewerydb.org/breweries?by_name=cooper&by_state=" + state;
      $.ajax({
        url: brewryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        var stateType = $("<h1>").text(response.brewery_type);
        var stateCity = $("<h2>").text(response.city);
        var stateName = $("<h2>").text(response.name);
        var stateAddress = $("<h2>").text(response.Stree + ", " + State + ", " + Postal_Code);
        var stateWebsite = $("<h2>").attr("src", response.website_url);
    
        $("").empty();
        $("#result").append(stateType, stateCity, stateName, stateAddress, stateWebsite);
    
      });
    }

    function ticketMaster(event) {
      var eventURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + search + "&source=universe&countryCode=US&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r";
      $.ajax({
        url: eventURL,
        method: "GET"
      }).then(function (response) {

        var eventName = $("h1").text(response.name);
        var eventDescription = $("h2").text(response.description);
        var eventWebstite = $("h2").attr("src", response.url);


        console.log(response);
      });
    }

// search function:

openBrewery(inputState);
ticketMaster(inputEvent);


  });



});






