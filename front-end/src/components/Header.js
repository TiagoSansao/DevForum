import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/components/header.css';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Header = (props) => {
  const history = useHistory();
  const [isLogged, setLogged] = useState(false);

  function signOut() {
    localStorage.setItem('auth-token', null);
    setLogged(false);
    history.push('/login');
  }

  useEffect(() => {
    api
      .get('/isLogged', {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      })
      .then((response) => {
        if (response.data === 'not logged') {
          if (props.getData) return history.push('/login');
          return setLogged(false);
        }
        setLogged(response.data);
        if (props.getData) props.getData(response.data);
      });
  }, []);

  if (!isLogged) {
    return (
      <header id='topHeader'>
        <main className='top'>
          <div className='topLeft'>
            <Link to='/'>
              <h1>DevForum</h1>
              <h2>The forum made for developers!</h2>
            </Link>
          </div>
        </main>
        <section className='down'>
          <form method='POST' className='downLeft'>
            <input placeholder='Type something' type='text' />
            <input type='submit' value='Search' />
          </form>
          <section className='downRight'>
            <Link
              to='/login'
              style={
                props.where === 'login' ? { backgroundColor: '#020258' } : {}
              }
            >
              Sign in
            </Link>
            <Link
              to='/register'
              style={
                props.where === 'register'
                  ? { backgroundColor: ' #020258' }
                  : {}
              }
            >
              Sign up
            </Link>
          </section>
        </section>
      </header>
    );
  }

  return (
    <header id='topHeader'>
      <main className='top'>
        <div className='topLeft'>
          <Link to='/'>
            <h1>DevForum</h1>
            <h2>The forum made for developers!</h2>
          </Link>
        </div>
      </main>
      <section className='down'>
        <form method='POST' className='downLeft'>
          <input placeholder='Type something' type='text' />
          <input type='submit' value='Search' />
        </form>
        <section className='downRight'>
          <div className={`dropdown`}>
            User: {isLogged.username} &nbsp;
            <i class='fa fa-caret-down' aria-hidden='true'></i>
            <div className={`content`}>
              <Link className='item' to={`/user/${isLogged.username}`}>
                Profile
              </Link>
              <Link className='item' to={'/settings'}>
                Settings
              </Link>
              <span className='item' onClick={signOut}>
                Logout
              </span>
            </div>
          </div>
        </section>
      </section>
    </header>
  );
};

export default Header;
