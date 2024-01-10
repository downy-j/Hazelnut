const Sequelize = require("sequelize");

class Chat extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Chat",
        tableName: "chats",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Chat.belongsToMany(db.User, { through: "UserChat" });

    db.Chat.hasMany(db.Message);
  }
}

module.exports = Chat;
