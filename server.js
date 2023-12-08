const express = require("express");
const { DataTypes, Sequelize } = require("sequelize");
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const server = express();
const port = 3100;

server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static("crud-app"));

server.get('/', (req, res) => {
  res.send('Welcome to my server!');
});
// res.send a page / data - would i need to have my database showed here?
const sequelize = new Sequelize('dummydata', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

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