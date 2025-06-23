import mongoose from "mongoose";

const ReadingSchema = new mongoose.Schema({
  hardware_id: { type: String, index: true },
  residence_id: { type: String, index: true },
  customer_id: { type: String, index: true },
  energy_consumed: Number,
  current_value: Number,
  voltage_value: Number,
  start_time: { type: Date, index: true },
  end_time: { type: Date, index: true }
});

export default mongoose.model("Reading", ReadingSchema);