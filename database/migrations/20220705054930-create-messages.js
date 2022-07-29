'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {STRING,INTEGER,DATE,TEXT} = Sequelize;
    await queryInterface.createTable('messages', {
      id: {
        type: INTEGER.UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true
      },
      name: {
        type: STRING(30),
        allowNull: false,
        comment: '留言者姓名',
      },
      email: {
        type: STRING(128),
        allowNull: false,
        comment: '留言者信箱',
      },
      message: {
        type: TEXT,
        allowNull: true,
        comment: '留言者內容',
      },
      created: {
        type: DATE,
        comment: '新增留言時間',
      },
      updated: {
        type: DATE,
        comment: '更新留言時間',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('messages');
  }
};
