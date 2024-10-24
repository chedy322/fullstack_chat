const mongoose=require('mongoose')

const educationSchema = new mongoose.Schema({
    school: { type: String, required: true },
    grade: { type: String },
    subjectsOfInterest: { type: [String] }
});

module.exports = mongoose.model('Education', educationSchema);