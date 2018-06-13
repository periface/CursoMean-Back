import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcryptjs from 'bcryptjs';

const { Schema } = mongoose;
const UserSchema = new Schema({
  local: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  google: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
  twitter: {
    username: String,
    id: String,
    displayName: String,
    token: String,
    email: String,
  },
});
// UserSchema.pre('save', async function() {
//   if (this.isModified('password') || this.isNew) {
//     const salt = await bcryptjs.genSalt();
//     const hash = await bcryptjs.hash(this.password, salt);
//     this.password = hash;
//   }
// });
// ClientSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
