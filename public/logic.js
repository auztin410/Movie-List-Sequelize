var movie;


    $("#searchmovie").on("submit", function (event) {
        event.preventDefault();

        var searchMovie = $("#searchmovie [name=movie]").val().trim();


        $.ajax("/search/" + searchMovie, {
            type: "GET"
        }).then(
            function (result) {
                console.log("Searching for: " + searchMovie);
                console.log(result);

                var movieinfo = $("<div>");
                movieinfo.addClass("movieinfo");

                movieinfo.append("<br>");
                movieinfo.append("<img src='" + result.Poster + "'>");
                movieinfo.append("<p><span>Title: </span>" + result.Title + "</p>");
                movieinfo.append("<p><span>Date of Release: </span>" + result.Released + "</p>");
                movieinfo.append("<p><span>Rated: </span>" + result.Rated + "</p>");
                movieinfo.append("<p><span>Runtime: </span>" + result.Runtime + "</p>");
                movieinfo.append("<p><span>Directed by: </span>" + result.Director + "</p>");
                movieinfo.append("<p><span>Actors: </span>" + result.Actors + "</p>");
                movieinfo.append("<p><span>Plot: </span>" + result.Plot + "</p>");
                movieinfo.append("<p><span>Awards: </span>" + result.Awards + "</p>");
                movieinfo.append("<p><span>MetaScore: </span>" + result.Metascore + "</p>");
                movieinfo.append("<p><span>Imdb Rating: </span>" + result.imdbRating + "</p>");
                movieinfo.append("<button type='submit' id='add'>Add to list</button>");
                movieinfo.append("<br>");
                movieinfo.append("<br>");


                $(".movieinfo").html(movieinfo);

                $("#add").on("click", function (event) {
        

                    movie = result.Title;
                    console.log(movie);

                    var newMovie = {
                        name: movie
                    };

                    $.ajax("/add/", {
                        type: "POST", 
                        data: newMovie
                        
                    }).then(
                        function () {
                            console.log("You add " + movie + " to your list to see.");

                            location.reload();
                        }
                    );
                });
            }
        );
    });



    $(".removename").on("click", function (event) {
        var id = $(this).data("nameid");

        $.ajax("/tosee/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted id ", id);

                location.reload();
            }
        );
    });

    $(".watchmovie").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("watchid");

        var watchedMovie = {
            watched: true
        };

        $.ajax("/watched/" + id, {
            type: "PUT",
            data: watchedMovie
        }).then(
            function () {
                console.log("you watched this movie id ".id);

                location.reload();
            }
        );
    });

    $("#addmovie").on("submit", function (event) {
        event.preventDefault();

        var newMovie = {
            name: $("#addmovie [name=name]").val().trim()
        };

        $.ajax("/tosee", {
            type: "POST",
            data: newMovie
        }).then(
            function () {
                console.log("added new movie.");

                location.reload();
            }
        );
    });

    $("#updatemovie").on("submit", function (event) {
        event.preventDefault();

        var id = $("[name=id").val().trim();


        var updatedMovie = {
            name: $("#updatemovie [name=name").val().trim()
        };

        $.ajax("/tosee/" + id, {
            type: "PUT",
            data: updatedMovie
        }).then(
            function () {


                location.reload();
            }
        );
    });