require('dotenv').config();
const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
 


app.use('/api/v1', rootRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Express.js API!' });
});

app.listen(PORT, () => {
    console.log(`App is listening at PORT ${PORT}`);
});
