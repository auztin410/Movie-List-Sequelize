module.exports = function(sequelize, DataTypes){
var movies = sequelize.define("movies", {
    name: {
        type: DataTypes.STRING,
        validate: {
            allowNull: false,
        }
    },
    watched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
return movies;
}