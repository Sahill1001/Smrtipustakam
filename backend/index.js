const connectToMongodb = require("./db");
const express = require("express");
connectToMongodb();

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`);
});
