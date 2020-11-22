import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import api from '../services/api';

const Settings = () => {
  const [userData, setUserData] = useState();

  console.log(userData);

  function getData(data) {
    setUserData(data);
  }

  return (
    <main className='fullscreen'>
      <Header getData={getData} />
      <section className='settings'>
        <h2>User settings</h2>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Birthday: {new Date(userData.birthday).toLocaleDateString()}</p>
        <p>
          Register date: {new Date(userData.registerDate).toLocaleDateString()}
        </p>
        <p>
          Description:{' '}
          {userData.description
            ? userData.description
            : 'you do not have a description.'}
        </p>
        <form method='post'>
          <textarea placeholder='Write your description here, remember to be nice and follow the rules :D'></textarea>
          <input type='submit' value='Save description' />
        </form>
        <form type='post' encType='multipart/form-data'>
          <input type='file' />
          <input type='submit' value='Save photo' />
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default Settings;
