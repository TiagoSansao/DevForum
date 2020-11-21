import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/createTopic.css';
import api from '../services/api';

const CreateTopic = () => {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('C++/C/C#');

  useEffect(() => {
    api
      .get('/isLogged', {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      })
      .then((response) => {
        if (response.data === 'not logged') return history.push('/login');
      });
  }, []);

  function submitTopic(e) {
    e.preventDefault();
    if (content.length === 0 || title.length === 0 || category.length === 0)
      return window.alert('Fill every field before submitting.');
    api
      .post(
        '/topic',
        { content, title, category },
        { headers: { 'auth-token': localStorage.getItem('auth-token') } }
      )
      .then((response) => {
        if (response.status === 200)
          return history.push(`/topics/${response.data}`);
      });
  }

  return (
    <main className='fullscreen'>
      <Header />
      <form method='post' className='createTopic' onSubmit={submitTopic}>
        <fieldset className='topicFieldset'>
          <legend className='legend'>Create a topic</legend>
          <header>
            <div>
              <label for='title'>Title: </label>
              <input
                id='title'
                type='text'
                maxLength='40'
                minLength='5'
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
            <div>
              <label for='category'>Category: </label>
              <select
                id='category'
                onChange={(e) => setCategory(e.currentTarget.value)}
              >
                <option value='C++/C/C#'>C++/C/C#</option>
                <option value='HTML/CSS'>HTML/CSS</option>
                <option value='Java'>Java</option>
                <option value='JavaScript'>JavaScript</option>
                <option value='Python'>Python</option>
                <option value='PHP'>PHP</option>
                <option value='Ruby'>Ruby</option>
              </select>
            </div>
          </header>
          <label for='content'>Content:</label>
          <textarea
            id='content'
            maxLength='2048'
            minLength='5'
            placeholder='You can write here, remember to respect and follow the rules while writing :D '
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
          <br />
          <input type='submit' />
        </fieldset>
      </form>
      <Footer />
    </main>
  );
};

export default CreateTopic;
