const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Genres = sequelize.define('genre', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Genres;