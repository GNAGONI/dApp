module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define(
    'projects',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'projects',
    },
  );

  return Projects;
};
