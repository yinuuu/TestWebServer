const dayjs = require("dayjs")
module.exports = (sequelize, DataTypes) => sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        nick_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },

        real_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
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
                return dayjs(this.getDataValue('create_time')).format('YYYY-MM-DD hh:mm:ss');
            }
        },
        update_time: {
            type: DataTypes.DATE,
            get() {
                return dayjs(this.getDataValue('update_time')).format('YYYY-MM-DD hh:mm:ss');
            }
        }
    },
    {
        tableName: 'user',
        timestamps: true,
        paranoid: true,
        deletedAt: 'delete_time',
        createdAt: 'create_time',
        updatedAt: 'update_time'
    }
)
