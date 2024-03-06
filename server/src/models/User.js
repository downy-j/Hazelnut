const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        socketId: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });

    db.User.hasMany(db.Post);

    db.User.hasOne(db.UserInfo);

    db.User.belongsToMany(db.Interest, { through: "UserInterest" });

    db.User.hasMany(db.Note, {
      foreignKey: "receiverId",
      as: "ReceivedNotes",
    });
    db.User.hasMany(db.Note, {
      foreignKey: "senderId",
      as: "SentNotes",
    });

    db.User.belongsToMany(db.Chat, { through: "UserChat" });

    db.User.belongsToMany(db.Message, { through: "UserMessage" });

    db.User.hasOne(db.RefreshToken);
  }
}

module.exports = User;
