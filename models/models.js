const { DataTypes } = require('sequelize')
const sequelize = require('../database')
const SequelizeFile = require('sequelize-file')
const { v1: uuidv1 } = require('uuid');

function guid() {
    return uuidv1().replaceAll('-','')
}

const Dataset = sequelize.define('dataset', {
    guid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastModified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    lastEditorName: { type: DataTypes.STRING, defaultValue:""},
    
},{timestamps: false})

module.exports = {
    Dataset,
}
