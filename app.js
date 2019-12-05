var queryURL = "https://www.eventbriteapi.com/v3/users/me/?token=5PNZQK7RF6ZAWUJTMBTL"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response);



}