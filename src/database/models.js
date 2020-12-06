const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});


const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

const Note = sequelize.define('Note', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
}, {});

(async () => {
  try 
  {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection with psql has been established successfully.');
  
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
