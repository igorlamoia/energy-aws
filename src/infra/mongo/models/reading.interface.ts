export interface ReadingDocument extends Document {
  hardware_id: string;
  residence_id: string;
  customer_id: string;
  energy_consumed: number;
  current_value: number;
  voltage_value: number;
  start_time: Date;
  end_time: Date;
}
