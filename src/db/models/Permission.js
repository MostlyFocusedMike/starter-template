const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const modelProperties = {
  action: Sequelize.DataTypes.STRING,
};

class Permission extends Model {
  static associate(models) {
    Permission.belongsToMany(models.Role, {
      through: 'role_permissions'
    })
  }
}

const createModel = (sequelize) => {
  const sequelizeOpts = {
    sequelize,
    underscored: true,
    modelName: 'Permission',
    tableName: 'permissions',
  };

  Permission.init(modelProperties, sequelizeOpts);

  return Permission;
};

module.exports = createModel;
