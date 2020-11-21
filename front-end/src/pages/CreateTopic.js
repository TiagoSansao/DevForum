import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/createTopic.css';

const CreateTopic = () => {
  return (
    <main className='fullscreen'>
      <Header />
      <form method='post' className='createTopic'>
        <input type='text' maxLength='20' minLength='5' />
        <select>
          <option>C++/C/C#</option>
          <option>HTML/CSS</option>
          <option>Java</option>
          <option>JavaScript</option>
          <option>Python</option>
          <option>PHP</option>
          <option>Ruby</option>
        </select>
        <textarea></textarea>
      </form>
      <Footer />
    </main>
  );
};

export default CreateTopic;
