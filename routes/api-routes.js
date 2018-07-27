var db = require("../models");

module.exports = function(app){

app.get("/", function(req, res){
    db.movies.findAll({}).then(function(res){
        res.json(res);
    });
});

app.post("/api/list/", function(req, res){
    db.movies.create({
        name: req.body.name
    }).then(function(res){
        res.end()
    });
});

app.delete("/api/delete/:id", function(req, res){
    db.movies.destroy({
        where: {id: req.params.id}
    }).then(function(res){
        res.end();
    });
});

app.put("/api/updatename/", function(req, res){
    db.movies.update({
        name: req.body.name
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(res){
        res.json(res);
    });
});

app.put("/api/watched/", function(req, res){
    db.movies.update({
        watched: req.body.watched
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(res){
        res.json(res);
    });
});

app.get("/api/search/:movie", function(req, res){
    var searchMovie = req.params.movie;
    var jsonData;
    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=trilogy";

    requestAnimationFrame(queryUrl, function(err, res, body){
        jsonData = JSON.parse(body);
        res.send(jsonData);
    });
});

app.post("/api/search/add", function(req, res){
    db.movies.create({
        name: req.body.name
    }).then(function(res){
        res.end();
    });
});
}