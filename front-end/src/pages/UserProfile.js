import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';
import '../styles/pages/userProfile.css';
import img from '../assets/default-user-image.png';

const UserProfile = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    api.get(`/user/${user}`).then((response) => {
      setUserData(response.data);
      console.log(response.data);
    });
  }, [user]);

  return (
    <main>
      <Header />
      <section id='userProfile'>
        <div className='dataContainer'>
          <img className='profileImage' src={img} alt=''></img>
          <div className='userContainer'>
            <h2>{userData.username}</h2>
            <hr /> <br />
            <time dateTime={userData.birthday}>
              Birthday: {new Date(userData.birthday).toLocaleDateString()}
            </time>{' '}
            <br />
            <time dateTime={userData.registerDate}>
              Register date:{' '}
              {new Date(userData.registerDate).toLocaleDateString()}
            </time>
          </div>
        </div>
        {/*Tópicos do usuário*/}
      </section>
    </main>
  );
};

export default UserProfile;
