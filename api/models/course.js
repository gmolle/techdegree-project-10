'use strict';
module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		'Course',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter a title'
					}
				}
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter a description'
					}
				}
			},
			estimatedTime: DataTypes.STRING,
			materialsNeeded: DataTypes.STRING
		},
		{}
	);
	Course.associate = (models) => {
		// define association between tables
		// a "course" belongs to a single "user"
		Course.belongsTo(models.User, {
			as: 'user',
			foreignKey: {
				fieldName: 'userId',
				allowNull: false
			}
		});
	};

	return Course;
};