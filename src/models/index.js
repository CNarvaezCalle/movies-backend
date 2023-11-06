const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");

Movies.belongsToMany(Actors, { through: "MoviesActors" });
Actors.belongsToMany(Movies, { through: "MoviesActors" });

Movies.belongsToMany(Directors, { through: "MoviesDirectors" });
Directors.belongsToMany(Movies, { through: "MoviesDirectors" });

Movies.belongsToMany(Genres, { through: "MoviesGenres" });
Genres.belongsToMany(Movies, { through: "MoviesGenres" });