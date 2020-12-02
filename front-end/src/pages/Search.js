import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { getTimeAgo } from '../utils/getTimeAgo.js';
import { Link, useHistory } from 'react-router-dom';
import '../styles/pages/search.css';

const Search = () => {
  const [topics, setTopics] = useState([]);
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const category = urlParams.get('category');
  const page = urlParams.get('page');

  useEffect(() => {
    console.log('oi');
    api.post('search', { title, category, page }).then((response) => {
      if (response.status === 250)
        return window.alert('No topics were found, try again :p');
      setTopics(response.data);
    });
  }, [title, category, page]);

  function handleCategory(e) {
    urlParams.set('category', e.currentTarget.value);
    return history.push(`/search/?${urlParams}`);
  }

  return (
    <main className='fullscreen'>
      <Header />
      <section className='topics'>
        <section className='topDiv'>
          <h2>
            Search results
            {topics.length === 0 && (
              <h3
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                No topics were found.
              </h3>
            )}
          </h2>

          <form className='filter'>
            <label for='category'>Filter by category</label> <br />
            <select id='category' onChange={handleCategory}>
              <option value='all'>Choose an option</option>
              <option value='C++/C/C#'>C++/C/C#</option>
              <option value='HTML/CSS'>HTML/CSS</option>
              <option value='Java'>Java</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Python'>Python</option>
              <option value='PHP'>PHP</option>
              <option value='Ruby'>Ruby</option>
            </select>
          </form>
        </section>
        {topics.map((topic) => {
          return (
            <div key={topic._id} className='topic'>
              <Link className='topicTitle' to={`/topics/${topic._id}`}>
                <h3>{topic.title}</h3>
              </Link>
              <span className='topicInfo'>
                <Link
                  className='authorName'
                  to={`user/${topic.author.username}`}
                >
                  {topic.author.username}
                </Link>
                {topic.category}
                <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
              </span>
            </div>
          );
        })}
      </section>
      <Link to={'/create'} className='newTopic'>
        <p>Create a topic</p>
      </Link>
      <Footer />
    </main>
  );
};

export default Search;
