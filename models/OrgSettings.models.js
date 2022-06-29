module.exports = (sequelize, DataTypes) => {
  const OrgSettings = sequelize.define(
    "org_settings",
    {
      orgDB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orgName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return OrgSettings;
};
