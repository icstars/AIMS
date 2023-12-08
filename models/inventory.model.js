const {Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(
    'dummydata',
    'root',
    'password',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
   sequelize.authenticate().then(() => {
       console.log('Connection has been established successfully.');
    }).catch((error) => {
       console.error('Unable to connect to the database: ', error);
    });
    const inventory = sequelize.define("inventory", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        graphiteblock_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tool_quality: {
          type: DataTypes.STRING,
          allowNull: false
        },
        tool_size: {
          type: DataTypes.INTEGER,
        },
        location: {
          type: DataTypes.STRING,
        },
        last_sharpened: {
            type: DataTypes.DATEONLY,
          },
        
     });
     sequelize.sync().then(() => {
        console.log('Inventory table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     
     return inventory;
     });