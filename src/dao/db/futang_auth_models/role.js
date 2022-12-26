const moment = require("moment")
module.exports = (sequelize, DataTypes) => sequelize.define(
    'role',
    {
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        auth: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        creator: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        create_time: {
            type: DataTypes.DATE,
            //note here this is the guy that you are looking for
            get() {
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD hh:mm:ss');
            }
        },
        update_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('update_time')).format('YYYY-MM-DD hh:mm:ss');
            }
        }
    },
    {
        tableName: 'role',
        timestamps: true,
        paranoid: true,
        deletedAt: 'delete_time',
        createdAt: 'create_time',
        updatedAt: 'update_time'
    }
)
