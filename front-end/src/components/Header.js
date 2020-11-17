import React from 'react';
import '../styles/components/header.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
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
              props.where === 'register' ? { backgroundColor: ' #020258' } : {}
            }
          >
            Sign up
          </Link>
        </section>
      </section>
    </header>
  );
};

export default Header;
