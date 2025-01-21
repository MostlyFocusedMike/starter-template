const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const modelProperties = {
  prop: Sequelize.DataTypes.STRING,
};

class User extends Model {
  static associate(models) {
  }
}

const createModel = (sequelize) => {
  const sequelizeOpts = {
    sequelize,
    underscored: true,
    modelName: '',
    tableName: '',
  };

  User.init(modelProperties, sequelizeOpts);

  return User;
};

module.exports = createModel;
