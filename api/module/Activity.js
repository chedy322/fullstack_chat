const mongoose=require('mongoose')

const socialLinksSchema = new mongoose.Schema({
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String }
});

module.exports = mongoose.model('SocialLinks', socialLinksSchema);