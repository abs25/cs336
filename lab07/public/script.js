//lab07 script
$(document).ready(function() {
  $("a").click(function(event) {
    alert("Thanks for visiting!");
    event.preventDefault();
    $(this).hide("slow");
  });

  $("a").addClass("test");
  $("a").removeClass("test");

  $("button").after('<div id="data"><em>No data yet...<em></data>'); //put a new p element at the bottom of the body

  $(function() {
    $("button").click(function(event){
      $.ajax({
        //The url for the request
        url: "/fetch",
        //It's a GET request
        type: "GET",
        //The data to send
        data: {
          name: "Here is your data!"
        }
      })
      .done(function(result){
        console.log("Ajax request succeeded...");
        $("#data").empty();

        $("#data").append(result.content);
      })
      .fail(function(xhr, status, errorThrown){
        console.log('Ajax request failed...');
      });
    });
  });

});
