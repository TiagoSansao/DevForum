import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';
import '../styles/pages/register.css';

const Register = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState();
  const [formError, setFormError] = useState('');

  const history = useHistory();

  async function handleSubmission(event) {
    event.preventDefault();
    const response = await api.post('/register', {
      user,
      password,
      email,
      birthday,
    });
    if (response.status === 250) {
      setFormError(response.data.status);
    } else if (response.status === 200) history.push('/');
  }

  return (
    <main className='fullscreen'>
      <Header where='register' />{' '}
      <form method='post' className='register' onSubmit={handleSubmission}>
        <h2>Register</h2>
        <div className='inputDiv'>
          <label for='nickname'>Nickname: </label>
          <input
            id='nickname'
            onChange={(e) => setUser(e.target.value)}
            type='text'
            minLength={3}
            maxLength={20}
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
        <div className='inputDiv'>
          <label for='email'>Email: </label>
          <input
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            minLength={5}
            maxLength={256}
          />
        </div>
        <div className='inputDiv'>
          <label for='birthday'>Birthday: </label>
          <input
            id='birthday'
            onChange={(e) => setBirthday(e.target.value)}
            type='date'
          />
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>
        <input id='submit' type='submit' />
        <p className='alreadyHaveAccount'>
          Already have an account?{' '}
          <Link className='link' to={'/login'}>
            Sign in!
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
