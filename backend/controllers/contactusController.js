const ContactUs = require('../models/ContactUs')

exports.postContactUs = async(req,res) =>{
    try {
        const {contactName,contactEmail,contactContent} = req.body;
        if(!contactName || !contactEmail || !contactContent){
            return res.status(400).json({error: "Please fill all the fields."})
        }

        const newContactUs = new ContactUs({
            contactName,
            contactEmail,
            contactContent
        })

        const savedContactUs = await newContactUs.save()
        res.status(201).json(savedContactUs)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

exports.getContactUs = async(req,res) => {
    try {
        const contactUs = await ContactUs.find()
        res.status(200).json(contactUs)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

exports.getOneContactUs = async(req,res) => {
    try {
        const {id} = req.params;
        const contactUs = await ContactUs.findById(id)
        res.status(200).json(contactUs)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}