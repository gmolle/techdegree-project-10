'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a first name'
				},
			},
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a last name'
				},
			},
		},
		emailAddress: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter an email address'
				},
				isEmail: {
					msg: 'Please enter a valid email address'
				}
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a password'
				},
			},
		}
	}, {});
	User.associate = (models) => {
		// define association between tables
		// a "user" has many "courses"
		User.hasMany(models.Course, {
			as: 'user',
			foreignKey: {
				fieldName: 'userId', 
				allowNull: false,
			},
		});
	};

	return User;
};