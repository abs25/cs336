//getPerson for homework 2
$(document).ready(function() {
  $("form").after("<div id='getPersonResults'></div>"); //for displaying results

  $("form").submit(function(event) {
    event.preventDefault();
    console.log('AJAX request issued...');
    var form = $(this);
    $.ajax({
      url: "/fetchPerson",
      type: "GET",
      data: form.serialize(),
      dataType: "json"
    })
    .done(function(result){
      console.log('AJAX request succeeded...');

      $("#getPersonResults").empty(); //clear any old results
      //add the new result
      $("#getPersonResults").append("<p> User ID: " + result.id + "</p>"
                      + "<p> First Name: " + result.firstName + "</p>"
                      + "<p> Last Name: " + result.lastName + "</p>"
                      + "<p> Years: " + result.years + "</p>"
                    );
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX request failed...');
    });
  });
});
