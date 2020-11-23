import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import api from '../services/api';
import default_user_image from '../assets/default-user-image.png';
import '../styles/pages/settings.css';

const Settings = () => {
  const history = useHistory();
  const [userData, setUserData] = useState();

  console.log(userData);

  function getData(data) {
    setUserData(data);
  }

  if (!userData)
    return (
      <main className='fullscreen'>
        <Header getData={getData} />
        <Footer />
      </main>
    );

  return (
    <main className='fullscreen'>
      <Header />
      <section className='settings'>
        <h2>User settings</h2>
        <main className='left'>
          <h4>User data</h4>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Birthday: {new Date(userData.birthday).toLocaleDateString()}</p>
          <p>
            Register date:{' '}
            {new Date(userData.registerDate).toLocaleDateString()}
          </p>
          <p>
            Description:{' '}
            {userData.description
              ? userData.description
              : 'you do not have a description.'}
          </p>{' '}
          <br />
          <form method='post'>
            <h4>Change description</h4>
            <textarea placeholder='Write your description here, remember to be nice and follow the rules :D'></textarea>{' '}
            <br />
            <input type='submit' value='Save description' /> <br />
            <br />
          </form>
          <form type='post'>
            <h4>Change password</h4>
            <input type='password' placeholder='Current password' /> <br />
            <input type='password' placeholder='New password' /> <br />
            <input type='password' placeholder='Repeat new password' />
            <input type='submit' value='Save new password' />
          </form>
        </main>
        <aside className='right'>
          <h4>User photo</h4>
          <img src={default_user_image} alt='User' />
          <form type='post' encType='multipart/form-data'>
            <input type='file' />
            <input type='submit' value='Save photo' />
          </form>
        </aside>
      </section>
      <Footer />
    </main>
  );
};

export default Settings;
