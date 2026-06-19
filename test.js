import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

mongoose
  .connect(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/hr-management-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  )
  .then(() => {
    console.log("✅ Connected");
  })
  .catch((err) => {
    console.error(err);
  });