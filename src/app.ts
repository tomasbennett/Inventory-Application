import express from "express";
import { allItemsListPageGET, categoriesListPageGET, deleteCategory, deleteItem, homePageGET, insertCategoryPOST, insertItemsPOST, itemsListPageGETParams } from "./controllers/mainControllers";
const expressLayouts = require("express-ejs-layouts");
const app = express();

const path = require("node:path");




app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("layout", "layouts/mainLayout");




app.get("/", homePageGET);

app.get("/categories", categoriesListPageGET);
app.get("/items/:id", itemsListPageGETParams);
app.get("/all-items", allItemsListPageGET);


app.delete("/api/category/:id", deleteCategory);
app.delete("/api/item/:id", deleteItem);


app.post("/categories", insertCategoryPOST);
app.post("/items/:id", insertItemsPOST);
app.post("/all-items", insertItemsPOST);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening for PORT number", PORT);
});