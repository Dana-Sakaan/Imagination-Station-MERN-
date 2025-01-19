const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsletterSchema = new Schema({
   email: {
      type: String,
      required: true
   }
},{timestamps: true})

const Newsletter = mongoose.model("Newsletter", NewsletterSchema)
module.exports = Newsletter