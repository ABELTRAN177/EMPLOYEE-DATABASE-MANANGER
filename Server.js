const express = require("express");
const app = express();


const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.listen(PORT, () => {console.log(`API server now on port http://localhost:PORT`);});