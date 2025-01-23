const db = require('../models/index');

const { Role, Permission, User } = db;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminRole = await Role.createWithPerms(
      { name: "ADMIN" },
      [{ action: 'edit:all' }, { action: 'view:all' }],
    );

    const userRole = await Role.createWithPerms(
      { name: "USER" },
      [{ action: 'edit:own' }, { action: 'view:own' }]
    );

    const admin = await User.createOne('Gandalf', 'Grayhame', adminRole.id);
    const user = await User.createOne('Frodo', 'Baggins', userRole.id);

    console.log('admin:', await admin.formattedJson());
    console.log('user:', await user.formattedJson());
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};
