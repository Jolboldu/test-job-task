const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

(async () => {
    try 
  {
    await sequelize.sync();

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } 
  catch (error) {
    console.log(error)
  }
}
)();

module.exports = {
  User
};
