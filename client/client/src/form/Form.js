import React, { useState } from 'react';
import './Form.css'
const StudentForm = () => {
    const [formData, setFormData] = useState({
        education: {
            school: '',
            grade: '',
            subjectsOfInterest: []
        },
        profile: {
            dateOfBirth: '',
            gender: '',
            profilePicture: null,
            bio: '',
            hobbies: [],
            favoriteBooks: [],
            favoriteMovies: [],
            languagesSpoken: [],
            country: '',
            state: '',
            city: '',
            contactNumber: ''
        },
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
        }
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const [section, field] = name.split('.');

        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: files[0]
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value
                }
            }));
        }
    };

    const handleArrayChange = (e, section, field, index) => {
        const { value } = e.target;
        const updatedArray = [...formData[section][field]];
        updatedArray[index] = value;

        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: updatedArray
            }
        }));
    };

    const handleArrayAdd = (section, field) => {
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: [...prevState[section][field], '']
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you can handle the form submission, e.g., send data to your backend
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <h2>Education Information</h2>
            <div className="form-group">
                <label>School</label>
                <input type="text" name="education.school" value={formData.education.school} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Grade</label>
                <input type="text" name="education.grade" value={formData.education.grade} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Subjects of Interest</label>
                {formData.education.subjectsOfInterest.map((subject, index) => (
                    <input key={index} type="text" value={subject} onChange={(e) => handleArrayChange(e, 'education', 'subjectsOfInterest', index)} required />
                ))}
                <button type="button" onClick={() => handleArrayAdd('education', 'subjectsOfInterest')}>Add Subject</button>
            </div>

            <h2>Profile Information</h2>
            <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="profile.dateOfBirth" value={formData.profile.dateOfBirth} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <select name="profile.gender" value={formData.profile.gender} onChange={handleChange} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" name="profile.profilePicture" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea name="profile.bio" value={formData.profile.bio} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Hobbies</label>
                {formData.profile.hobbies.map((hobby, index) => (
                    <input key={index} type="text" value={hobby} onChange={(e) => handleArrayChange(e, 'profile', 'hobbies', index)} required />
                ))}
                <button type="button" onClick={() => handleArrayAdd('profile', 'hobbies')}>Add Hobby</button>
            </div>
            <div className="form-group">
                <label>Favorite Books</label>
                {formData.profile.favoriteBooks.map((book, index) => (
                    <input key={index} type="text" value={book} onChange={(e) => handleArrayChange(e, 'profile', 'favoriteBooks', index)} required />
                ))}
                <button type="button" onClick={() => handleArrayAdd('profile', 'favoriteBooks')}>Add Book</button>
            </div>
            <div className="form-group">
                <label>Favorite Movies</label>
                {formData.profile.favoriteMovies.map((movie, index) => (
                    <input key={index} type="text" value={movie} onChange={(e) => handleArrayChange(e, 'profile', 'favoriteMovies', index)} required />
                ))}
                <button type="button" onClick={() => handleArrayAdd('profile', 'favoriteMovies')}>Add Movie</button>
            </div>
            <div className="form-group">
                <label>Languages Spoken</label>
                {formData.profile.languagesSpoken.map((language, index) => (
                    <input key={index} type="text" value={language} onChange={(e) => handleArrayChange(e, 'profile', 'languagesSpoken', index)} required />
                ))}
                <button type="button" onClick={() => handleArrayAdd('profile', 'languagesSpoken')}>Add Language</button>
            </div>
            <div className="form-group">
                <label>Country</label>
                <input type="text" name="profile.country" value={formData.profile.country} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>State</label>
                <input type="text" name="profile.state" value={formData.profile.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" name="profile.city" value={formData.profile.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" name="profile.contactNumber" value={formData.profile.contactNumber} onChange={handleChange} required />
            </div>

            <h2>Social Links</h2>
            <div className="form-group">
                <label>Facebook</label>
                <input type="url" name="socialLinks.facebook" value={formData.socialLinks.facebook} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Twitter</label>
                <input type="url" name="socialLinks.twitter" value={formData.socialLinks.twitter} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Instagram</label>
                <input type="url" name="socialLinks.instagram" value={formData.socialLinks.instagram} onChange={handleChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default StudentForm;
