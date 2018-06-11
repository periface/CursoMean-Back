import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// ClientSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
