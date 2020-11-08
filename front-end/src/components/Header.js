import React from 'react';
import '../styles/components/header.css';

const Header = () => {
  return (
    <header>
      <main className='top'>
        <div className='topLeft'>
          <h1>DevForum</h1>
          <h2>The forum made for developers!</h2>
        </div>
      </main>
      <section className='down'>
        <form method='POST' className='downLeft'>
          <input placeholder='Type something' type='text' />
          <input type='submit' value='Search' />
        </form>
        <section className='downRight'>
          <a href=''>Sign in</a>
          <a href=''>Sign up</a>
        </section>
      </section>
    </header>
  );
};

export default Header;
