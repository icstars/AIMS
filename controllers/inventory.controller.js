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
        inventory.create({
            id: "3",
            graphiteblock_id: 4567,
            tool_quality: "sharp",
            tool_size: 32,
            location: 'Kansas City',
            last_sharpened: "2023-12-15"
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
        inventory.findAll().then(res => {
          console.log(res)
      }).catch((error) => {
          console.error('Failed to retrieve data : ', error);
      });

      inventory.findOne({
        where: {
            id : ""
        }
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
    inventory.destroy({
      where: {
        id:""
      }
  }).then(() => {
      console.log("Successfully deleted record.")
  }).catch((error) => {
      console.error('Failed to delete record : ', error);
  });





     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });