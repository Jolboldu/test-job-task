const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
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

const Note = sequelize.define('Note', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
}, {
  // Other model options go here
});

(async () => {
  try 
  {
    await sequelize.sync();
  } 
  catch (error) {
    console.log(error)
  }
}
)();

module.exports = {
  User,
  Note
};
