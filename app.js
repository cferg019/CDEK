

// $.ajax({
//     method:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//              },
//     error: function(xhr, status, err) {
//                 // This time, we do not end up here!
//              }
//   });




{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> */}


function openbrewerydb(state) {

var brewryURL = "https://api.openbrewerydb.org/breweries?by_name=cooper&by_state=" + state; 
    $.ajax({
        url: brewryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

    var stateCity = $("").text(response.city);
    var stateName = $("").text(response.name);
    var stateAddress = $("").text(response.Stree + ", " + State + ", " + Postal_Code);
    var stateWebsite = $("").text(response.website.url)

    $("").empty();
    $("").append(stateCity, stateName, stateAddress, stateWebsite);

    });
}

function ticketmaster(event) {
    var eventURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=lGxG3vAdLmUCh0Ip0y4Rx2KfHRHxfG5r"
    $.ajax({
        url: eventURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}

