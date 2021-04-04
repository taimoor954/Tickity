import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email : {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type:String,
    required: true
  }
})

const User = mongoose.model("User", userSchema)



export {User}