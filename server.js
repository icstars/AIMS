const express = require("express");
const { DataTypes, Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const server = express();
const port = 3100;
const cors = require("cors");

server.use(cors());

server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static("crud-app"));
/*sending info to client same thing as saying getToolList(): Observable<any> {
    return this._http.get('http://localhost:3000/tools');
  }*/

//deleting a tool-needs work

server.post("/tools/delete", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    // Find the tool by ID
    const tool = await Tool.findByPk(id);

    if (!tool) {
      return res.status(404).json({ error: "Tool not found" });
    }
    // Delete the tool
    await tool.destroy();

    return res.status(200).json({ message: "Tool deleted successfully" });
  } catch (error) {
    console.error("Error deleting tool:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/tools", (req, res) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      const tools = async () => {
        let tools = await readTools();
        res.send(tools);
      };
      tools();
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
      res.send(400);
    });
});

server.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
// res.send a page / data - would i need to have my database showed here?
const sequelize = new Sequelize("dummydata", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

//doing connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//create a route for a client to give data to client- get

const Tool = sequelize.define(
  "Tool",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    graphiteblock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tool_quality: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    timestamps: false, // Disable timestamps
  }
);

//sync model with database to create table
Tool.sync();
//async func: how u tell javascript to do something in the background- run code from top to bottom when its started
async function readTools() {
  try {
    const tools = await Tool.findAll();
    let toolsJSON = tools.map((tool) => tool.toJSON());
    console.log("All Tools", toolsJSON);
    return toolsJSON;
  } catch (error) {
    console.error("Error reading tools:", error);
  }
}
//put for updating tool //do i need to emit?
server.put("/tool/edit", async (req, res) => {
  const id = req.body.id; // Extracting 'id' from request body
  const newData = req.body; // Using entire request body as 'newData'
  console.log(newData);

  try {
    console.log("Received request for tool update. ID:", id);
    const tool = await Tool.findByPk(id);

    if (tool) {
      // Update the tool with new data using Sequelize's 'update' method
      await tool.update(newData);
      console.log(true);
      res.send({ success: true, message: "Tool has been updated" });
    } else {
      res.send({ success: false, message: "Tool not found" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/tool/add", async (req, res) => {
  try {
    const {
      id,
      graphiteblock_id,
      tool_quality,
      tool_size,
      location,
      last_sharpened,
    } = req.body;
    console.log(req.body);
    // Insert into the 'Tool' table
    const tool = await Tool.create({
      id,
      graphiteblock_id,
      tool_quality,
      tool_size,
      location,
      last_sharpened,
    });

    res.send({
      status: true,
      message: "Tool created successfully",
      data: tool,
    });
  } catch (error) {
    console.error("Error creating tool:", error);
    res.send({ status: false, message: "Tool creation failed" });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
