module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        genre: String,
        annee: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Movie = mongoose.model("movie", schema);
    return Movie;
  };
  