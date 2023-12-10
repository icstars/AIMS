const express = require("express");
const { DataTypes, Sequelize } = require("sequelize");
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const server = express();
const port = 3100;
const cors = require('cors');

server.use(cors());

server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static("crud-app"));
/*sending info to client same thing as saying getToolList(): Observable<any> {
    return this._http.get('http://localhost:3000/tools');
  }*/

server.get('/tools',(req,res)=> {
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    const tools = async ()=>{
      let tools = await readTools();
      res.send(tools);
    } 
    tools();
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
    res.send(400);
  });
})

server.get('/', (req, res) => {
  res.send('Welcome to my server!');
});
// res.send a page / data - would i need to have my database showed here?
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
  }, {
    timestamps: false // Disable timestamps
  });
  
//sync model with database to create table
Tool.sync();
//async func: how u tell javascript to do something in the background- run code from top to bottom when its started
async function readTools(){
try {
    const tools = await Tool.findAll();
    let toolsJSON = tools.map(tool => tool.toJSON());
    console.log('All Tools', toolsJSON );
    return toolsJSON;
  } catch (error) {
    console.error('Error reading tools:', error);
  } 
}



server.post("/tool/add", async (req, res) => {
  try {
    const {id, graphiteblock_id, tool_quality, tool_size, location, last_sharpened } = req.body;
    console.log(req.body);
    // Insert into the 'Tool' table
    const tool = await Tool.create({
      id,
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