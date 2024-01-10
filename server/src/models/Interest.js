const Sequelize = require("sequelize");

class Interest extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        interest: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Interest",
        tableName: "Interests",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Interest.belongsToMany(db.User, {
      through: "UserInterest",
    });
  }
}

module.exports = Interest;
