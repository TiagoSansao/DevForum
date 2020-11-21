import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import '../styles/pages/login.css';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const history = useHistory();
  async function handleSubmission(event) {
    event.preventDefault();
    const response = await api.post('/login', { user, password });
    if (response.status === 250) return setFormError(response.data.status);
    if (response.status === 200) {
      await localStorage.setItem('auth-token', response.data);
      await history.push('/');
    }
  }

  return (
    <main className='fullscreen'>
      <Header where='login' />{' '}
      <form method='post' className='login' onSubmit={handleSubmission}>
        <h2>Login</h2>
        <div className='inputDiv'>
          <label for='nickname'>Nickname: </label>
          <input
            id='nickname'
            onChange={(e) => setUser(e.target.value)}
            type='text'
            minLength={3}
            maxLength={14}
          />
        </div>
        <div className='inputDiv'>
          <label for='password'>Password: </label>
          <input
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            minLength={5}
            maxLength={256}
          />
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>
        <input id='submit' type='submit' />
        <p
          onClick={() => {
            window.alert(
              'Send an email to tiagossansao@gmail.com explaining your situation.'
            );
          }}
          className='alreadyHaveAccount'
        >
          Did you forget your password?
        </p>
      </form>
      <Footer />
    </main>
  );
};

export default Login;
