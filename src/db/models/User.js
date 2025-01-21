const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const modelProperties = {
  firstName: Sequelize.DataTypes.STRING,
  lastName: Sequelize.DataTypes.STRING,
};

class User extends Model {
  static associate(models) {
    // define association here
  }

  test() {
    this.firstName = 'ok wow'
    this.save();
  }
}

const createModel = (sequelize) => {
  const sequelizeOpts = {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'users',
  };

  User.init(modelProperties, sequelizeOpts);

  return User;
};

module.exports = createModel;
