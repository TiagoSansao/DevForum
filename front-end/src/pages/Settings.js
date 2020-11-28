import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import api from '../services/api';
import default_user_image from '../assets/default-user-image.png';
import '../styles/pages/settings.css';

const Settings = () => {
  const [userData, setUserData] = useState();
  const [desc, setDesc] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('');
  const [descResponse, setDescResponse] = useState('');
  const [photoResponse, setPhotoResponse] = useState('');
  const [uploadedFile, setUploadedFile] = useState();
  const [previewFile, setPreviewFile] = useState();

  console.log(uploadedFile);

  const header = {
    headers: { 'auth-token': localStorage.getItem('auth-token') },
  };

  function changeDescription(e) {
    e.preventDefault();
    const data = { _id: userData._id, desc: desc };
    api.put('/setDescription', data, header).then((response) => {
      if (response.status === 200)
        return setDescResponse('Description successfully updated!');
      if (response.status === 250) return setDescResponse(response.data);
    });
  }

  function changePassword(e) {
    e.preventDefault();
    if (newPassword !== newPassword2)
      return setPasswordResponse('Passwords do not match');
    const data = { _id: userData._id, newPassword, currentPassword };
    api.put('setPassword', data, header).then((response) => {
      setPasswordResponse(response.data);
    });
  }

  function selectImage(e) {
    const photo = e.target.files[0];
    if (
      photo.type === 'image/jpeg' ||
      photo.type === 'image/png' ||
      photo.type === 'image/jpeg'
    ) {
      setUploadedFile(photo);
      setPreviewFile(URL.createObjectURL(photo));
      return;
    }
    setPreviewFile('');
    setPhotoResponse('Only JPG, JPEG and PNG files are accepted.');
  }

  async function changePhoto(e) {
    e.preventDefault();
    if (!uploadedFile) return setPhotoResponse('You need to add a photo!');
    const data = new FormData();
    data.append('file', uploadedFile);
    data.append('_id', userData._id);
    try {
      const response = await api.put('setPhoto', data, header);
      return setPhotoResponse(response.data);
    } catch (err) {
      return setPhotoResponse('Only JPG, JPEG and PNG files are accepted.');
    }
  }

  async function deleteCurrentPhoto(e) {
    e.preventDefault();
    const response = await api.put(
      'deletePhoto',
      { _id: userData._id },
      header
    );
    setPreviewFile('');
    setUploadedFile('');
    setPhotoResponse(response.data);
  }

  function getData(data) {
    console.log(data);
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
          <form method='post' onSubmit={changeDescription}>
            <h4>Change description</h4>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={256}
              placeholder='Write your description here, remember to be nice and follow the rules :D'
            ></textarea>
            {descResponse}
            <br />
            <input type='submit' value='Save description' /> <br />
            <br />
          </form>
          <form method='post' onSubmit={changePassword}>
            <h4>Change password</h4>
            <input
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              maxLength={256}
              placeholder='Current password'
            />{' '}
            <br />
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              maxLength={256}
              placeholder='New password'
            />{' '}
            <br />
            <input
              type='password'
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              maxLength={256}
              placeholder='Repeat new password'
            />
            {passwordResponse} <br />
            <input type='submit' value='Save new password' />
          </form>
        </main>
        <aside className='right'>
          <h4>User photo</h4>
          <img
            src={
              previewFile
                ? previewFile
                : userData.imgKey
                ? `http://localhost:3500/uploads/${userData.imgKey}`
                : default_user_image
            }
            alt='User'
          />
          {<span style={{ marginTop: 5 }}>{photoResponse}</span>}
          <form
            type='post'
            encType='multipart/form-data'
            onSubmit={changePhoto}
          >
            <input type='file' onChange={selectImage} />
            <input type='submit' value='Save photo' />
          </form>
          <input
            type='submit'
            style={{ backgroundColor: '#a20a0a' }}
            onClick={deleteCurrentPhoto}
            value='Delete current photo'
          />
        </aside>
      </section>
      <Footer />
    </main>
  );
};

export default Settings;
