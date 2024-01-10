const Sequelize = require("sequelize");

class Note extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        senderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        receiverId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Note",
        tableName: "notes",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Note.belongsTo(db.User, {
      foreignKey: "senderId",
      as: "Sender",
    });

    db.Note.belongsTo(db.User, {
      foreignKey: "receiverId",
      as: "Receiver",
    });
  }
}

module.exports = Note;
