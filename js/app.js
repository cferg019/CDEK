$(document).ready(function () {

  // Declaring variables to be used in API search
  var activityChoice;
  var placeChoice;
  var dateChoice;
  var artistChoice;
  var teamChoice;
  var diningChoice;


  //Initializing drop down menu
  $('select').formSelect();

  // Initializing calendar
  $('.datepicker').datepicker({ autoClose: true });

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
    $("#next-button").show();
  });

  // When next button is selected, the place chosen is stored, this div is hidden, and the div with the next question is shown.
  $("#next-button").on("click", function () {
    placeChoice = $("#email").val().trim();
    console.log(placeChoice);
    $("#where").hide();
    $("#next-button").hide();
    $("#when").show();
    $("#submit-button").show();
  });

  // When submit button is selected, the date is selected, the next relevant question div is shown based on activity.
  $("#submit-button").on("click", function () {
    dateChoice = $(".datepicker").val().trim();
    console.log(dateChoice);
    $("#when").hide();
    $("#submit-button").hide();
    $("#results-button").show();

    console.log(activityChoice)

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
      console.log(artistChoice);
    } else if (activityChoice === "Go to a Game") {
      teamChoice = $("#sportsTeam").val().trim();
      console.log(teamChoice);
    } else if (activityChoice === "Eat Out") {
      diningChoice = $("#foodType").val().trim()
      console.log(diningChoice);
    }

    // API Code Here

    function openBrewery(state) {

      var brewryURL = "https://api.openbrewerydb.org/breweries?by_name=cooper&by_state=" + state;
      $.ajax({
        url: brewryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        var stateType = $("").text(response.brewery_type);
        var stateCity = $("").text(response.city);
        var stateName = $("").text(response.name);
        var stateAddress = $("").text(response.Stree + ", " + State + ", " + Postal_Code);
        var stateWebsite = $("").text(response.website.url)
    
        $("").empty();
        $("").append(stateType, stateCity, stateName, stateAddress, stateWebsite);
    
      });
    }

    function ticketMaster(event) {
      var eventURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r"
      $.ajax({
        url: eventURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
      });
    }

// search function:

openBrewery(inputState);
ticketMaster(inputEvent);


  });



});






