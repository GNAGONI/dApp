class ProjectModel {
  constructor(sequelize, Sequelize) {
    this.modelName = 'projects';
    const Projects = sequelize.define(
      this.modelName,
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
        tableName: this.modelName,
      },
    );
    this.projects = Projects;
  }

  getProjectModel() {
    return this.projects;
  }
}

module.exports = ProjectModel;
