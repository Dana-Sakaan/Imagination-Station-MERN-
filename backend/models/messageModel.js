const mongoose = require('mongoose')
const Schema = mongoose.Schema


const messageSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
   },
   email: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   status:{
      type:String,
      enum: ['Answered', 'Not Answered'],
      default:'Not Answered'
   }
},{timestamps: true})

const Message = mongoose.model('Message',messageSchema)
module.exports = Message