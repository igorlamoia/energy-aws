import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  route:  { type: String, index: true },
  request_type: String,
  request_body: String,
  response_body: String,
  request_timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Log", LogSchema);
