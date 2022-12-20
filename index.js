/* eslint-disable no-undef */

import express from 'express'
import path from 'path'

// require("dotenv").config({ path: "../.env" });
// const path = '';
const app = express();

const port =  3000;

app.use(express.static(path.join(__dirname, "/dist/")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
