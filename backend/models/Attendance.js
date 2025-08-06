import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent','leave',], required: true },
});

export default mongoose.model('Attendance', AttendanceSchema); 