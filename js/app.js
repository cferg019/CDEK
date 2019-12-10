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
  var resultDiv = $("#result");

  //Initializing drop down menu
  $('select').formSelect();

  // hiding question divs other than "what are you in the mood for"
  $("#when").hide();
  $("#where").hide();
  // $("#submit-button").hide();
  // $("#next-button").hide();
  // $("#artist").hide();
  // $("#team").hide();
  $("#dining").hide();
  $("#results-button").hide();

  // when choice selected from drop down, the activity chosen in stored, this div is hidden, and the div with the next question is shown.
  $('select[name="dropdown"]').change(function () {
    activityChoice = $(this).val().trim();
    console.log(activityChoice);
    // Clear the results when they choose a new option from the dropdown
    $("#result").empty()
    // Hide all of the activity specific inputs first
    // $("#artist").hide();
    // $("#team").hide();
    $("#dining").hide();
    // They all have a where, so always show the where
    $("#where").show();
    // Show the results button since an activity choice has now been made
    $("#results-button").show();

    if (activityChoice === "Eat Out") {
      $("#dining").show();
    }
  });

  // We can now get rid of this whole function, since we only have a single
  // Results button, we no longer need to deal with navigation

  // When next button is selected, the place chosen is stored, this div is hidden, and the div with the next question is shown.
  // $("#submit-button").on("click", function () {
  //   placeChoice = $("#location").val().trim();
  //   console.log(placeChoice);
  //   $("#where").hide();
  //   $("#next-button").hide();
  //   $("#results-button").show();
  //   $("#submit-button").hide();

  //   if (activityChoice === "See a Concert") {
  //     $("#artist").show();
  //   } else if (activityChoice === "Go to a Game") {
  //     $("#team").show();
  //   } else if (activityChoice === "Eat Out") {
  //     $("#dining").show();
  //   }
  // });

  // Final information is stored.  Begin API query.
  $("#results-button").on("click", function () {
    $("#result").empty()
    if (activityChoice === "See a Concert") {
      // artistChoice = $("#concertArtist").val().trim();
      placeChoice = $("#location").val().trim();
      $("#location").val("");
      // $("#concertArtist").val("");
      ticketMaster(placeChoice, 'music')
      console.log(artistChoice, placeChoice);
    } else if (activityChoice === "Go to a Game") {
      // teamChoice = $("#sportsTeam").val().trim();
      placeChoice = $("#location").val().trim();
      $("#location").val("");
      // $("#sportsTeam").val("");
      console.log(teamChoice);
      ticketMaster(placeChoice, 'sports')
    } else if (activityChoice === "Eat Out") {
      diningChoice = $("#foodType").val().trim();
      placeChoice = $("#location").val().trim();
      $("#foodType").val("");
      $("#location").val("");
      console.log(diningChoice);
      fourSquare(placeChoice, diningChoice);
    } else if (activityChoice === "Have a Drink") {
      placeChoice = $("#location").val().trim();
      $("#location").val("");
      console.log(placeChoice);
      openBrewery(placeChoice);
    }

    // [
    //   {
    //     title: 'string',
    //     location: 'string',
    //     url: 'string',
    //     desc: ''
    //   }, {
    //       ...
    //   }
    // ]
    // This function will now be used as the one point in the code
    // where we show the results on the screen
    function showResults(results) {
      console.log('showing results', results)
      for (var i = 0; i < results.length; i++) {
        $('#result').append("<tr><td>" + results[i].title + "</td></tr>");
        $('#result').append("<tr><td>" + results[i].location + "</td></tr>");
        // Url is optional
        if (results.url) {
          $('#result').append("<tr><td>" + results[i].url + "</td></tr>");
        }
        // Desctiption is optional, only append if we have one
        if (results.desc) {
          $('#result').append("<tr><td>" + results[i].desc + "</td></tr>");
        }
        $('#result').append("<hr/>");
      }
    }

    // API Code Here

    function openBrewery(placeChoice) {
      var brewryURL = "https://api.openbrewerydb.org/breweries?&by_state=" + placeChoice;
      $.ajax({
        url: brewryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var results = [];

        // We'll make a standard object to store results so we can call "showResults" in each API function
        for (var i = 0; i < response.length; i++) {
          results.push({
            title: response[i].name,
            location: response[i].street + ", " + response[i].city,
            url: response[i].website_url
          })
        }

        // Show the results on the screen
        showResults(results)

        // for (var i = 0; i < results.length; i++) {
        //   $('#result').append("<tr><td>" + results[i].name + "</td></tr>");
        //   $('#result').append("<tr><td>" + results[i].street + ", " + results[i].city + "</td></tr>");
        //   $('#result').append("<tr><td>" + results[i].website_url + "</td></tr>");
        // }
      });
    }

    function ticketMaster(placeChoice, event) {
      var eventURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + event + "&locale=en-us&city=" + placeChoice + "&radius=50&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r";
      $.ajax({
        url: eventURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var results = [];
        var events = response._embedded.events
        // We'll make a standard object to store results so we can call "showResults" in each API function
        for (var i = 0; i < events.length; i++) {
          var result = {
            title: events[i].name,
            location: events[i]._embedded.venues[0].name,
            url: events[i].url,
          }
          if (events[i].priceRanges) {
            result.desc = 'Tickets will run you anywhere from $' + events[i].priceRanges[0].min + ' to $' + events[i].priceRanges[0].max
          }
          results.push(result)
        }

        // Show the results on the screen
        showResults(results)

        // var placeChoiceName = $("<p>").append(response.embedded.events.name);
        // var placeChoiceVenues = $("<p>").append(response.embedded.events.venues.name)
        // var placeChoiceUrl = $("<p>").attr("src", response.embedded.events.url);
        // var placeChoiceDate = $("<p>").append(response.embedded.events.date);
        // var placeChoicePrice = $("<p>").append(response.embedded.events.priceRanges.min + response.embedded.events.priceRanges.max)

        // $("#result").append(placeChoiceName, placeChoiceVenues, placeChoiceUrl, placeChoiceDate, placeChoicePrice);
        // console.log(placeChoiceName, placeChoiceVenues, placeChoiceUrl, placeChoiceDate, placeChoicePrice);
        // console.log(response);
      });
    }

    function fourSquare(placeChoice, diningChoice) {
      var restaurantURL = "https://api.foursquare.com/v2/venues/explore?&client_id=SYQX3THMILTSYZ3ZIR3SFF5DIADM4GOPYGL0UJU1R1JKC2S0&client_secret=DZRJD3TWWGNM3UBTNCMHVANCRDUUXO5WXWEQU2SYLD231F4Z&query=" + diningChoice + "&limit=10&v=20191209&near=" + placeChoice
      console.log(restaurantURL)
      $.ajax({
        url: restaurantURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var results = [];
        var items = response.response.groups[0].items
        // We'll make a standard object to store results so we can call "showResults" in each API function
        for (var i = 0; i < items.length; i++) {
          var result = {
            title: items[i].venue.name,
            location: items[i].venue.location.formattedAddress.join(', ')
          }
          results.push(result)
        }

        // Show the results on the screen
        showResults(results)
        // for (var i = 0; i < results.length; i++) {
        //   $('#result').append("<tr><td>" + results[i].response.groups.items.venue[i] + "</td></tr>");

        // }
      })
    }
    // call functions:
    // openBrewery(placeChoice);
    // ticketMaster(artistChoice);
    // fourSquare(diningChoice)
  });



});






