const Sequelize = require("sequelize");

class Message extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Message",
        tableName: "messages",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Message.belongsTo(db.Chat);

    db.Message.belongsToMany(db.User, { through: "UserMessage" });
  }
}

module.exports = Message;
