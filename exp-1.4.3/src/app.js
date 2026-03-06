import express from "express";
import cors from "cors";
import bookingRoutes from "./modules/booking/booking.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', bookingRoutes);

export default app;