module.exports = (sequelize, DataTypes) => {
  const OrgSettings = sequelize.define(
    "org_domain",
    {
      orgId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
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
