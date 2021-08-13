const sequelize = require("../dbconfig");
const DataTypes = require('sequelize');
const Joi = require("joi");
const { User} = require('./users');

const Client = sequelize.sequelize.define(
  'clients',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    citizenship: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restored_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleted_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    restored_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clients',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "client_profiles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }
);

function validateClient(client) {
  const schema = Joi.object({
      username: Joi.string()
          .min(3)
          .max(191)
          .required(),
      gender: Joi.string()
          .required(),
      dob: Joi.date()
          .required(),
      citizenship: Joi.string()
          .required(),
      address: Joi.string()
          .required(),
      user_id: Joi.number()
          .required()
  }).unknown(true);

  return schema.validate(client);
}

Client.belongsTo(User, {foreignKey : 'user_id'});

exports.Client = Client;
exports.validateClient = validateClient;



