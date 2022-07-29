'use strict';

module.exports = (app) => {
    const {STRING,DATE,INTEGER,TEXT} = app.Sequelize;
    const Message = app.model.define('message', {
        id: {
            type: INTEGER.UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: STRING(30), 
            allowNull: false
        },
        email: {
            type: STRING(128), 
            allowNull: false
        },
        message: {
            type: TEXT, 
            allowNull: true
        },
        created: {
            type: DATE
        },
        updated: {
            type: DATE
        },
    });
    return Message;
};