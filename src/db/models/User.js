const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const modelProperties = {
  firstName: Sequelize.DataTypes.STRING,
  lastName: Sequelize.DataTypes.STRING,
};

class User extends Model {
  // this method avoids circular dependencies
  static associate(models) {
    User.belongsTo(models.Role, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
  }

  static async createOne(firstName, lastName, role_id) {
    return await this.create({ firstName, lastName, role_id });
  }

  async getRoleAndPerms() {
    const role = await this.getRole()
    const perms = await role.getAllPerms(true);
    return { role: role.name, perms }
  }

  async formattedJson() {
    const { id, firstName, lastName } = this;
    const { role, perms } = await this.getRoleAndPerms();
    return { id, firstName, lastName, role, perms };
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
