const db = require("../models");

const Movie = db.movies;

exports.create = function (req, res) {
    if(!req.body.name) {
        res.status(400).send({ message: "Content can not be empty !"});
        return;
    }

    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        annee: req.body.annee
    });

    movie
        .save(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the movie",
            });
        });
};

exports.findAll = function (req, res) {
    const name = req.query.name;
    let condition = name ? {name: {$regex: new RegExp(name), $options: "1"}} : {};

    Movie.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving movies",
            });
        });
};

exports.findOne = function (req, res) {
    const id = req.params.id;
    Movie.findById(id)
        .then(data => {
            if(!data) res.status(404).send({message: "Not found movie with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: "Error while retrieving movie with id " + id
                });
        });
};

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty",
        });
    }
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body, {useFindAnModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Cannot update movie",
                });
            }
            else res.send({ message: "movie was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating movie",
            });
        });
};

exports.delete = function (req, res) {
    const id = req.params.id;
    Movie.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Cannot delete movie",
                });
            } else {
                res.send({
                    message: "movie was deleted",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete movie",
            });
        });
};

exports.deleteAll = function (req, res) {
    Movie.deleteMany({})
        .then(data => {
            res.send({
                message: "Movies were deleted successfully",
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error was occurred while removing all movies",
            });
        });
};
