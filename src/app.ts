import express from "express";
const expressLayouts = require("express-ejs-layouts");
const app = express();

const path = require("node:path");




app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.set("layout", "layouts/mainLayout");




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening for PORT number", PORT);
});