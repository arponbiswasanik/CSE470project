import Express from "express";

import userRoutes from "./createuser/createuser.js";
import checkUser from "./validateuser/logincheck.js";
import search from "./Search/search.js";
import verifyuser from "./createuser/verifyuser.js";
import filter from "./Search/filtercar.js";
import insurance from "./insurance.js";
import repairhistory from "./repairhistory.js";

import displaydata from "./displaydata.js";
import user_history from "./userhistory.js";
import rentCar from "./Rent_cars/rent.js";
import book from "./Booking_car/book_c.js";
import dri from "./Rent_cars/driverinfo.js";
import admin_booking from "./Rent_cars/bookcon.js";
import assignDriver from "./Rent_cars/driver_assin.js";
import admin_data from "./validateuser/admin_data.js";
import kyc from "./validateuser/kyc_approve.js";


const port = 8000;
const app = Express();
app.use(Express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api", userRoutes);
app.use("/api", checkUser);
app.use("/api", search);
app.use("/api", filter);
app.use("/api", displaydata);
app.use("/api", user_history);
app.use("/api", rentCar);
app.use("/api", book);
app.use("/api", dri);
app.use("/api", admin_booking);
app.use("/api", assignDriver);
app.use("/api", verifyuser);
app.use("/api", admin_data);
app.use("/api", insurance);
app.use("/api", repairhistory);
app.use('/api', kyc);



app.use((req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
