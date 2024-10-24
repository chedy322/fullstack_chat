import React from 'react';
import './UserInfo.css';

const UserInfo = ({
dateOfBirth,
  gender,
  bio,
  hobbies,
  favoriteBooks,
  favoriteMovies,
  languagesSpoken,
  country,
  state,
  city,
  contactNumber
}


) => {
    console.log(hobbies, favoriteBooks, favoriteMovies,languagesSpoken)
  return (
    <div className="user-profile">
      <div className="profile-header">
        {/* <img src={profilePicture} alt="Profile" className="profile-picture" /> */}
        <div className="basic-info">
          <h2>{`${gender}, ${new Date(dateOfBirth).toLocaleDateString()}`}</h2>
          <p className="bio">{bio}</p>
        </div>
      </div>
      <div className="additional-info">
        <div className="info-section">
          <h3>Hobbies</h3>
          <ul>
            {hobbies.map((hobby, index) => <li key={index}>{hobby}</li>)}
          </ul>
        </div>
        <div className="info-section">
          <h3>Favorite Books</h3>
          <ul>
            {favoriteBooks.map((book, index) => <li key={index}>{book}</li>)}
          </ul>
        </div>
        <div className="info-section">
          <h3>Favorite Movies</h3>
          <ul>
            {favoriteMovies.map((movie, index) => <li key={index}>{movie}</li>)}
          </ul>
        </div>
        <div className="info-section">
          <h3>Languages Spoken</h3>
          <ul>
            {languagesSpoken.map((language, index) => <li key={index}>{language}</li>)}
          </ul>
        </div>
        <div className="info-section">
          <h3>Location</h3>
          <p>{`${city}, ${state}, ${country}`}</p>
        </div>
        <div className="info-section">
          <h3>Contact</h3>
          <p>{contactNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
