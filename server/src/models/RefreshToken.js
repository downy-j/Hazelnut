const Sequelize = require("sequelize");

class RefreshToken extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        token: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.RefreshToken.belongsTo(db.User);
  }
}

module.exports = RefreshToken;
