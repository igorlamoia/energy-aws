import mongoose from "mongoose";

const UtilityCompanySchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true },
  name: { type: String, required: true },
  standard_rate: { type: Number, required: true },
  off_peak_rate: { type: Number },
  peak_rate: { type: Number },
  intermediate_rate: { type: Number },
  start_peak_time: { type: Number },
  end_peak_time: { type: Number },
  start_first_intermediate_time: { type: Number },
  end_first_intermediate_time: { type: Number },
  start_second_intermediate_time: { type: Number },
  end_second_intermediate_time: { type: Number }
}, { timestamps: true });

export default mongoose.model("UtilityCompany", UtilityCompanySchema);
