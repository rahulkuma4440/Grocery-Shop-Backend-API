const express=require("express");
const db=require("./db");
const itemRoutes=require("./routes/itemRoutes");
const orderRoutes=require("./routes/orderRoutes");

const app = express();
const PORT=process.env.PORT || 5000;

db.connect();

app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
