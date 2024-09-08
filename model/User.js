import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {type: String, required: true}, // String is shorthand for {type: String}
  password: {type: String, required: false},
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
