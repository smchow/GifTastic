 // Initial array of movies
      var animals = ["Cat", "Dog", "Rabbit", "Giraffe","Ferret", "goldfish" ,"turtle", "skunk", "hamster", "chicken"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        //var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        var apiKey   = "dc6zaTOxFJmzC";
        var giffyURL = "https://api.giphy.com/v1/gifs/search?q=" + movie +"&api_key=dc6zaTOxFJmzC&limit=10";
        
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: giffyURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          // Creates a div to hold the movie
           // $("#movies-details-title").html("Title: " + response.Title);
            // Retrieves the Rating Data
          // Creates an element to have the rating displayed
           //
           console.log(response);
           $("#img-view").empty();
           for(var i =0; i < response.data.length ; i++){
              var newDiv = $("<div class='col-md-4'>");
              var p = $("<p>");
              p.html("Rating: " + response.data[i].rating);
              var img = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("data-still",response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
                //image_original_url)
              newDiv.append(p);
              newDiv.append(img);
              
              $("#img-view").append(newDiv);
           }
           
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        //event.preventDefault();
        // Loops through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generates buttons for each animals in the array
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass(" btn btn-primary myAnim");
          // Added a data-attribute
          a.attr("data-name", animals[i]);
          a.text(animals[i]);
          
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
      
        }
      }

      // This function handles events where the add animal button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var animal = $("#movie-input").val().trim();
        animals.push(animal);
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "myAnim"
      $(document).on("click", ".myAnim", displayMovieInfo);

      //Toggle urls when an image is clicked
      $(document).on("click", ".gif", function() {
  
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
          } else {
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
          }
      });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();