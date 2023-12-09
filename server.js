const express = require("express");
const { DataTypes, Sequelize } = require("sequelize");
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const server = express();
const port = 3100;

server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static("crud-app"));
/*sending info to client same thing as saying getToolList(): Observable<any> {
    return this._http.get('http://localhost:3000/tools');
  }*/
server.get('/', (req, res) => {
  res.send('Welcome to my server!');
});
<<<<<<< HEAD
// telling it how to connect to database
=======
// res.send a page / data - would i need to have my database showed here?
>>>>>>> e352c1077b2cad8b28f847721e4b86a586809df3
const sequelize = new Sequelize('dummydata', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});


//doing connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

  //create a route for a client to give data to client- get


const Tool = sequelize.define('Tool', {
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
    type: DataTypes.INTEGER
  },
  location: {
    type: DataTypes.STRING
  },
  last_sharpened: {
    type: DataTypes.DATEONLY
  }
});

server.post("/api/tool/add", async (req, res) => {
  try {
    const { graphiteblock_id, tool_quality, tool_size, location, last_sharpened } = req.body;
    
    // Insert into the 'Tool' table
    const tool = await Tool.create({
      graphiteblock_id,
      tool_quality,
      tool_size,
      location,
      last_sharpened
    });

    res.send({ status: true, message: "Tool created successfully", data: tool });
  } catch (error) {
    console.error('Error creating tool:', error);
    res.send({ status: false, message: "Tool creation failed" });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});