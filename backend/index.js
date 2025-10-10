import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cristian344",
  database: "multideportivo"
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=> res.json("Hello this is the backend"));

app.get("/rol", (req,res)=>{
  const q = "SELECT * FROM roles";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({error: err.message});
    return res.json(data);
  });
});

app.post("/rol", (req,res)=>{
  const q = "INSERT INTO roles(`descripcion`) VALUES (?)";
  const values = [req.body.descripcion
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({error: err.message});
    return res.json("Rol creado correctamente");
  });
});

app.listen(8800, ()=> console.log("Backend server is running!"));
