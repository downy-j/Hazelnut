const Sequelize = require("sequelize");

class UserInfo extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        imgURL: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        today: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        total: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        textBox: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: "대화명을 입력하세요",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserInfo",
        tableName: "userInfos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserInfo.belongsTo(db.User);
  }
}

module.exports = UserInfo;
