$(document).ready(function() {

var topics = ["shoebill" , "volcano" , "eclipse"]
console.log("hello")



//Makes buttons from topics array
function makeButtons() {

       
        $("#buttonField").empty();

        
        for (var i = 0; i < topics.length; i++) {

        
          var newButton = $("<button>");
          
          newButton.addClass("topicButton");
          
          newButton.attr("data-name", topics[i]);
          
          newButton.text(topics[i]);
          
          $("#buttonField").append(newButton);
        }
      }

makeButtons()





        //Adds a button
      $(document).on("click" , "#addButton" , function(event) {
        event.preventDefault();

        
        var topic = $("#addInput").val().trim();

        
        topics.push(topic);

        $("#addInput").empty();

        
        makeButtons();

      });


      //Calls the gif
      $(document).on("click", ".topicButton" , function(event) {
       event.preventDefault();

        var topicUrl = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicUrl + "&api_key=jJhXjIruQRUjwtKKCvYrkXotrqxnccuL&limit=10";

        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response)
         // console.log(response.data[0].rating)
         // console.log(response.data[0].url)


          for (var i = 0; i < response.data.length; i++) {
          	console.log(response.data[i].rating)
          	console.log(response.data[i].url)
          //For the Gif

          var spanTag = $("<span>")

          var imageTag = $("<img>")

          imageTag.attr("src" , response.data[i].images.original_still.url);

          imageTag.attr("data-state" , "animate");

          imageTag.attr("data-still" , response.data[i].images.original_still.url);

          imageTag.attr("data-animate" , response.data[i].images.original.url);
          

          $(imageTag).addClass("gifPic")

          $("#gifField").prepend(imageTag)
          	//For the rating


         


          var ratingGet = response.data[i].rating

          $(ratingGet).addClass("gifRating")

          $("#gifField").prepend(ratingGet)
          	


          }

        });
        

      });



      //Animates the gif on click. Might take a few moments to work
    $(document).on("click" , ".gifPic" , function() {
       


        var state = $(this).attr("data-state")
        
        if (state == 'still') {
            var url = $(this).attr("data-animate")
            $(this).attr("src", url)
            $(this).attr("data-state", 'animate')
        }

        
         if (state == 'animate') {
          var urlStill = $(this).attr("data-still")
          $(this).attr("src", urlStill)
          $(this).attr("data-state", 'still')

        }

        
    });

})


 