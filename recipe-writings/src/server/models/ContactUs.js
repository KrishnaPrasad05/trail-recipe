const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    contactName:{ type:String, required:true},
    contactEmail:{ type:String, required:true},
    contactContent:{ type:String, required:true},
})

const ContactUs = mongoose.model('ContactUs',contactusSchema)
module.exports = ContactUs;