import mongoose from "mongoose";

const HardwareSchema = new mongoose.Schema({
  id: String,
  firmware_version: String,
  hardware_version: String,
  nickname: String
}, { _id: false });

const StateSchema = new mongoose.Schema({
  id: Number,
  name: String,
  abbreviation: String
}, { _id: false });

const ResidenceSchema = new mongoose.Schema({
  id: String,
  nickname: String,
  street: String,
  number: Number,
  complement: String,
  neighborhood: String,
  city: String,
  postal_code: String,
  id_state: Number,
  state: StateSchema,
  id_utility_company: Number,
  hardware: [HardwareSchema]
}, { _id: false });


const CustomerSchema = new mongoose.Schema({
  cpf_cnpj: { type: String, unique: true, index: true },
  name: String,
  email: { type: String, unique: true, sparse: true, index: true },
  mobile_phone: String,
  is_active: { type: Boolean, default: true },
  residences: [ResidenceSchema]
}, { timestamps: true });

export default mongoose.model("Customer", CustomerSchema);