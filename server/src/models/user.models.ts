import mongoose,{Document} from "mongoose";
export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: "admin" | "sales"
}

const userSchema = new mongoose.Schema<IUser>(
    {
    name: {
      type: String,
      required: true,
      trim:true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales"
    }
  },
  {
    timestamps: true
  }
)
const User =mongoose.model<IUser>("User",userSchema)
export default User