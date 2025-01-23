const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const modelProperties = {
  name: Sequelize.DataTypes.STRING,
};

class Role extends Model {
  static associate(models) {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
      foreignKeyConstraint: 'NO ACTION',
    })

    Role.belongsToMany(models.Permission, {
      through: 'role_permissions'
    })
  }

  static async createWithPerms(roleData, permsData) {
    return await this.create(
      { ...roleData, Permissions: permsData },
      { include: 'Permissions' },
    );
  }

  async getAllPerms(isJson = true) {
    const perms = await this.getPermissions({ joinTableAttributes: [] });
    return isJson ? perms.map(perm => perm.action) : perms;
  }

  async addPerms(perms) {
    return await this.addPermissions(perms);
  }
}

const createModel = (sequelize) => {
  const sequelizeOpts = {
    sequelize,
    underscored: true,
    modelName: 'Role',
    tableName: 'roles',
  };

  Role.init(modelProperties, sequelizeOpts);

  return Role;
};

module.exports = createModel;
